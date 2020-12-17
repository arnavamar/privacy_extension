var loginPage = document.getElementById("login-form");
var loginButton = document.getElementById("login-form-submit");
var loginErrorMsg = document.getElementById("login-error-msg");
var goback = document.getElementById("goback");
loginButton.addEventListener("click", event => {
	event.preventDefault();
	const username = loginPage.username.value;
    const password = loginPage.password.value;

    if (username === "user" && password === localStorage.pass) {
		var success = chrome.runtime.getURL("html/pass_manager.html");
		window.open(success,'_self');
    } else {
        loginErrorMsg.style.opacity = 1;
    }
});

goback.addEventListener("click", event => {
    event.preventDefault();
    window.history.back(-1);
});

//0MitFaIGCrbh