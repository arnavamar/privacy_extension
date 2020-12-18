chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        var list = 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM'
        localStorage.pass = '';
        var len = list.length;
        for (let i=0; i<12; i++) {
        	localStorage.pass += list[Math.floor(Math.random()*len)];
        }
        window.alert("Username: 'user' & Password to access the password manager: " + localStorage.pass);
        create_db()
    }
    else if(details.reason == "update"){
    	window.alert("Your password manager's password is unchanged!");
        create_db()
    }
});

chrome.runtime.onMessage.addListener((request,sender,sendResponse)=> {
    if(request.message === 'insert') {
        let insert_request = insert_records(request.payload);
        insert_request.then(res => {
            chrome.runtime.sendMessage({
                message: 'insert_success',
                payload: res
            });
        });
    } else if (request.message === 'get') {
        let get_request = get_record(request.payload);
        get_request.then(res => {
            chrome.runtime.sendMessage({
                message: 'get_success',
                payload: res
            });
        });
    } else if (request.message === 'delete') {
        let delete_request = delete_record(request.payload);
        delete_request.then(res => {
            chrome.runtime.sendMessage({
                message: 'delete_success',
                payload: res
            });
        });
    }
});

let roster = [{
    "name":"",
    "email":"",
    "password":""
}];


let db = null;
function create_db() {
    const request = window.indexedDB.open('PassDB');
    request.onerror = function (event) {
        console.log("Problem opening DB.");
    }
    request.onupgradeneeded = function (event) {
        db = event.target.result;
        let objectStore = db.createObjectStore('roster', {
            keyPath: 'email'
        });
        objectStore.transaction.oncomplete = function (event) {
            console.log("ObjectStore Created.");
        }
    }
    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("DB OPENED.");
        insert_records(roster);
    }
}

function insert_records(records) {
    if (db) {
      const insert_transaction = db.transaction("roster", 
                                   "readwrite");
      const objectStore = insert_transaction.objectStore("roster");
      return new Promise((resolve, reject) => {
         insert_transaction.oncomplete = function () {
             console.log("ALL INSERT TRANSACTIONS COMPLETE.");
             resolve(true);
         }
         insert_transaction.onerror = function () {
             console.log("PROBLEM INSERTING RECORDS.")
             resolve(false);
         }
         records.forEach(person => {
           let request = objectStore.add(person);
           request.onsuccess = function () {
             console.log("Added: ", person);
           }
         });
      });
    }
}

function get_record(name) {
  if (db) {
    const get_transaction = db.transaction("roster", "readonly");
    const objectStore = get_transaction.objectStore("roster");
    return new Promise((resolve, reject) => {
      get_transaction.oncomplete = function () {
        console.log("ALL GET TRANSACTIONS COMPLETE.");
      }
      get_transaction.onerror = function () {
        console.log("PROBLEM GETTING RECORDS.")
      }
      let request = objectStore.get(name);
      request.onsuccess = function (event) {
        resolve(event.target.result);
      }
    });
  }
}

function delete_record(name) {
  if (db) {
    const delete_transaction = db.transaction("roster", 
                                             "readwrite");
    const objectStore = delete_transaction.objectStore("roster");
    return new Promise((resolve, reject) => {
      delete_transaction.oncomplete = function () {
        console.log("ALL DELETE TRANSACTIONS COMPLETE.");
        resolve(true);
      }
      delete_transaction.onerror = function () {
        console.log("PROBLEM DELETE RECORDS.")
        resolve(false);
      }
      objectStore.delete(name);
    });
  }
}





