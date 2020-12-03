var safety_btn = document.getElementById("back_to_safety");
safety_btn.addEventListener("click", function(){
	setTimeout(goBack,1000)
});
function goBack(){
	window.history.go(-2);
}