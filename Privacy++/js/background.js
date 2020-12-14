chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        var list = 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM'
        localStorage.pass = '';
        var len = list.length;
        for (let i=0; i<12; i++) {
        	localStorage.pass += list[Math.floor(Math.random()*len)];
        }
        window.alert("Username: 'user' & Password to access the password manager: " + localStorage.pass);
    }
    else if(details.reason == "update"){
    	window.alert("Your password managers password is unchanged!");
    }
});