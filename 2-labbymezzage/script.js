"use strict";

window.onload = function(){
	MessageBoard.init("Textmeddelande");
	alert(MessageBoard.messages[0].getText());

	var button = document.querySelector("#sendbutton");
	button.addEventListener("click", function(e){
		e.preventDefault();
		MessageBoard.init(document.querySelector("#inputarea").value);
	});
}