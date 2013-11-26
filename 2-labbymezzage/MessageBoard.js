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
		var IDindex = 0;
		var ids = this.messages.map(function(message){
			return message.id;
		});
		ids.forEach(function(element,index,array){
			if(element.id == messageID)
				IDindex = index;
		});
		var messageArea = document.getElementById("thebestdiv");
		var p = document.createElement("p");

		p.setAttribute("uniqueID", this.messages[IDindex].id);
		p.addEventListener("click", function(){
			MessageBoard.removeMessage(p.getAttribute("uniqueID"))
		});

		var text = document.createTextNode(this.messages[IDindex].getHTMLText());

		p.appendChild(text);
		messageArea.appendChild(p);
	},

	removeMessage: function(messageID){
		this.messages.splice(this.messages.indexOf(messageID),1);
		this.renderMessages();
	}
}