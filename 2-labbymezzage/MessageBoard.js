var MessageBoard = {
	messages: [],

	add:function(e)
	{
		var mess = new Message(e, new Date());
		this.messages.push(mess);
	},
	archive:function(messageObject){
	},
	remaining: function(){
		var count = 0;
		this.messages.forEach(function(message){
			count += 1;
		});
		return count;
	},
	renderMessage: function(messageID){
		var messageArea = document.getElementById("thebestdiv");
		var p = document.createElement("p");
		var text = document.createTextNode(messageID.getHTMLText());
		p.appendChild(text);
		messageArea.appendChild(p);

	}
}