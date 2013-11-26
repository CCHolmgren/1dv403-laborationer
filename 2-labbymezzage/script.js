"use strict";

window.onload = function(){
	MessageBoard.init("Textmeddelande");
	alert(MessageBoard.messages[0].getText());
}