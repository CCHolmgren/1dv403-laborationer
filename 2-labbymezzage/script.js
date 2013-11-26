"use strict";

window.onload = function(){
	var mess = new Message("Textmeddelande", new Date());
	alert(mess);
	alert(mess.getText());
	mess.setText("En annan text");
	alert(mess);
}