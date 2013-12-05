"use strict";

window.onload = function(){
	var button = document.querySelector("#sendbutton");
	var textarea = document.querySelector("#inputarea");

	button.addEventListener("click", function(e){
		e.preventDefault();
		addMessage();
	});

	textarea.addEventListener("keydown", function(e){
		if(e.keyCode == 13 && !e.shiftKey){
			e.preventDefault();
			addMessage();
		}
	});
}

function addMessage(){
	var textarea = document.querySelector("#inputarea");
	MessageBoard.add(textarea.value);
	textarea.value = "";
	MessageBoard.renderMessage(MessageBoard.messages[MessageBoard.messages.length-1].id);
}