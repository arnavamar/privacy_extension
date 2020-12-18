chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'insert_success') {
        if (request.payload) {
            document.querySelectorAll('.add_rec_input').forEach(element => element.value = '');
        }
    } else if (request.message === 'get_success') {
        if (request.payload) {
            document.querySelectorAll('.updated-details').forEach(element => element.style.display = 'none');
            document.querySelectorAll('.search-label').forEach(element => element.style.display = '');
            document.querySelectorAll('.details').forEach(element => element.style.display = '');
            document.getElementById('delete-record').style.display = '';
            document.getElementById('details-name').innerText = request.payload.name;
            document.getElementById('details-email').innerText = request.payload.email;
            document.getElementById('details-password').innerText = request.payload.password;
        } else {
            console.log("No record found.");
        }
    } else if (request.message === 'delete_success') {
        if (request.payload) {
            document.querySelectorAll('.search-label').forEach(element => element.style.display = 'none');
            document.querySelectorAll('.updated-details').forEach(element => element.style.display = 'none');
            document.querySelectorAll('.details').forEach(element => element.style.display = 'none');
            document.getElementById('delete-record').style.display = 'none';
        }
    }
});

document.querySelectorAll('.search-label').forEach(element => element.style.display = 'none');
document.querySelectorAll('.updated-details').forEach(element => element.style.display = 'none');
document.querySelectorAll('.details').forEach(element => element.style.display = 'none');
document.getElementById('delete-record').style.display = 'none';

document.getElementById('add_form').addEventListener('submit', event => {
    event.preventDefault();

    const form_data = new FormData(document.getElementById('add_form'));
    chrome.runtime.sendMessage({
        message: 'insert',
        payload: [{
            "name": form_data.get('name'),
            "email": form_data.get('email'),
            "password": form_data.get('password'),
        }]
    });
});

document.getElementById('search_for_record').addEventListener('click', event => {
    event.preventDefault();

    let search_term = document.getElementById('search_term').value;

    chrome.runtime.sendMessage({
        message: 'get',
        payload: search_term
    });
});

document.getElementById('delete-record').addEventListener('click', event => {
    event.preventDefault();

    chrome.runtime.sendMessage({
        message: 'delete',
        payload: document.getElementById('details-email').innerText
    });
});

logout.addEventListener("click", event => {
    event.preventDefault();
    window.history.back(-1);
});