var loginPage = document.getElementById("login-form");
var loginButton = document.getElementById("login-form-submit");
var loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", event => {
	event.preventDefault();
	const username = loginPage.username.value;
    const password = loginPage.password.value;

    if (username === "user" && password === localStorage.pass) {
    	//alert("Success!");
		//setTimeout(goAhead,1000)
		var success = chrome.runtime.getURL("html/pass_manager.html");
		window.open(success,'_self');
    } else {
        loginErrorMsg.style.opacity = 1;
    }
});

//Lt1CwA0BTDxS