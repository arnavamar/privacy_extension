var sub_btn = document.getElementById("submit");
sub_btn.addEventListener("click", function(){
	var password = document.getElementById('pwd');
	var confirm = 123;
	if (password.value == confirm){
		var redirect = chrome.runtime.getURL("pm.html");
		window.close();
		window.open(redirect);
	}
	else if (password.value == '') {
                    alert ("Please enter Password"); 
                }
     else if (password.value != confirm) { 
                    alert ("\nPassword did not match: Please try again...") 
                    return false; 
                } 
  
	else
	{
		console.log(2+2);
	}	
});
