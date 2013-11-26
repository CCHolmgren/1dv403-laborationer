"use strict";

window.onload = function(){
	MessageBoard.add("Textmeddelande");
	alert(MessageBoard.messages[0].getText());

	var button = document.querySelector("#sendbutton");
	var textarea = document.querySelector("#inputarea");

	button.addEventListener("click", function(e){
		e.preventDefault();
		MessageBoard.add(textarea.value);
		textarea.value = "";
		MessageBoard.renderMessage(MessageBoard.messages[MessageBoard.messages.length-1]);
	});
	textarea.addEventListener("keydown", function(e){
		if(e.keyCode == 13 && !e.shiftKey){
			MessageBoard.add(textarea.value);
			textarea.value = "";
			MessageBoard.renderMessage(MessageBoard.messages[MessageBoard.messages.length-1]);
			e.preventDefault();
		}
	});
}