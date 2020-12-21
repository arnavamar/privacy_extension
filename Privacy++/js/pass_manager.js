var ud = document.querySelectorAll('.updated-details');
var sl = document.querySelectorAll('.search-label');
var d = document.querySelectorAll('.details');
var dr = document.getElementById('delete-record');
var dn = document.getElementById('details-name');
var de = document.getElementById('details-email');
var dp = document.getElementById('details-password');
var add_form = document.getElementById('add_form');
var sfr = document.getElementById('search_for_record');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'insert_success') {
        if (request.payload) {
            document.querySelectorAll('.add_rec_input').forEach(element => element.value = '');
        }
    } else if (request.message === 'get_success') {
        if (request.payload) {
            ud.forEach(element => element.style.display = 'none');
            sl.forEach(element => element.style.display = '');
            d.forEach(element => element.style.display = '');
            dr.style.display = '';
            dn.innerText = request.payload.name;
            de.innerText = request.payload.email;
            dp.innerText = request.payload.password;
        } else {
            console.log("No record found.");
        }
    } else if (request.message === 'delete_success') {
        if (request.payload) {
            sl.forEach(element => element.style.display = 'none');
            ud.forEach(element => element.style.display = 'none');
            d.forEach(element => element.style.display = 'none');
            dr.style.display = 'none';
        }
    }
});

sl.forEach(element => element.style.display = 'none');
ud.forEach(element => element.style.display = 'none');
d.forEach(element => element.style.display = 'none');
dr.style.display = 'none';

add_form.addEventListener('submit', event => {
    event.preventDefault();

    const form_data = new FormData(add_form);
    chrome.runtime.sendMessage({
        message: 'insert',
        payload: [{
            "name": form_data.get('name'),
            "email": form_data.get('email'),
            "password": form_data.get('password'),
        }]
    });
});

sfr.addEventListener('click', event => {
    event.preventDefault();

    let search_term = document.getElementById('search_term').value;

    chrome.runtime.sendMessage({
        message: 'get',
        payload: search_term
    });
});

dr.addEventListener('click', event => {
    event.preventDefault();

    chrome.runtime.sendMessage({
        message: 'delete',
        payload: dn.innerText
    });
});

logout.addEventListener("click", event => {
    event.preventDefault();
    window.history.back(-1);
});