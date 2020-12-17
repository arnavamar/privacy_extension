var pm = document.getElementById('pm');
pm.addEventListener('click', function(){
	window.open('/html/pm.html', "_blank");
});

var options = document.getElementById('options');
var help = document.getElementById('help');
options.addEventListener('click', function(){
    window.open('/html/options.html', "_blank");
})
help.addEventListener('click', function(){
    window.open('/html/help.html', "_blank");
})
/*chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        var list = 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM'
        let pass = '';
        var len = len.length;
        for (let i=0; i<12; i++) {
        	pass += list[Math.floor(Math.random()*len)];
        }
        window.alert("Your Password to access the stored passwords is: ", pass);
    }
    else if(details.reason == "update"){
    	window.alert("Your password managers password is unchanged!");
    }
});*/