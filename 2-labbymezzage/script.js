"use strict";

window.onload = function(){
	MessageBoard.init("Textmeddelande");
	alert(MessageBoard.messages[0].getText());

	var button = document.querySelector("#sendbutton");
	var textarea = document.querySelector("#inputarea");

	button.addEventListener("click", function(e){
		e.preventDefault();
		MessageBoard.init(textarea.value);
		textarea.value = "";
	});
	textarea.addEventListener("keydown", function(e){
		if(e.keyCode == 13 && !e.shiftKey){
			MessageBoard.init(textarea.value);
			textarea.value = "";
			e.preventDefault();
		}
	});
}