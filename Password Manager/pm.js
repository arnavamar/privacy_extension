var sub_btn = document.getElementById("submit");
sub_btn.addEventListener("click", function(){
	var password = document.getElementById('pwd');
	var confirm = 123;
	if (password.value == confirm){
		var redirect = chrome.runtime.getURL("pm.html");
		window.close();
		window.open(redirect);
	}
	else
	{
		console.log(2+2);
	}	
});
