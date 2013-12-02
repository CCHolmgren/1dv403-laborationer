"use strict";

function Message(message, date){
	var message;
	var date;
	this.id = Math.floor(Math.random() * Math.pow(2, 64));

	this.getText = function(){
		return message;
	}

	this.setText = function(_text){
		message = _text;
	}

	this.getDate = function() {
		return date;
	}

	this.setDate = function(_date) {
		date = _date;
	}

	this.setText(message);
	this.setDate(date);
}

Message.prototype.toString = function() {
	return this.getText() + " (" + this.getDate()+")";
}

Message.prototype.getHTMLText = function () {
	return this.getText().replace(/[\n\r]/g, "<br />");
}

Message.prototype.getDateText = function() {
	var date = this.getDate();
	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();
	min = min + "";

	if (min.length == 1){
	   min = "0" + min;
	}
	if(sec.length == 1){
		sec = "0"+sec;
	}

	return hour + ":" + min + ":" + sec;
}