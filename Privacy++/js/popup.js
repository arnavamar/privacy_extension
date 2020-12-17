var pm = document.getElementById('pm');
pm.addEventListener('click', function(){
	window.open('/html/pm.html', "_self");
});

var options = document.getElementById('options');
var help = document.getElementById('help');
options.addEventListener('click', function(){
    window.open('/html/options.html', "_blank");
})
help.addEventListener('click', function(){
    window.open('/html/help.html', "_blank");
})
