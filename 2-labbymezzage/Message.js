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
	return this.getText().replace('\\n', "<br />");
}

Message.prototype.getDateText = function() {
	return this.getDate();
}