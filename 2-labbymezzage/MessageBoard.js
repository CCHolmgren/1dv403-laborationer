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

	renderMessages: function(){
		document.getElementById("thebestdiv").innerHTML = "";

		this.messages.forEach(function(message){
			console.log(message);
			MessageBoard.renderMessage(message.id);
		});
	},

	renderMessage: function(messageID){
		console.log(messageID);
		var index = this.messages.forEach(function(obj, index){
			if(this.messages.id == messageID)
				return index;
		});
		var messageArea = document.getElementById("thebestdiv");
		var p = document.createElement("p");

		p.setAttribute("uniqueID", this.messages[index].id);
		p.addEventListener("click", function(){
			MessageBoard.removeMessage(p.getAttribute("uniqueID"))
		});

		var text = document.createTextNode(this.messages[index].getHTMLText());

		p.appendChild(text);
		messageArea.appendChild(p);
	},

	removeMessage: function(messageID){
		this.messages.splice(this.messages.indexOf(messageID),1);
		this.renderMessages();
	}
}