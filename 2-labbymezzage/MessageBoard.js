var MessageBoard = {
	messages: [],

	init:function(e)
	{
		var mess = new Message(e, new Date());
		this.messages.push(mess);
	},
	archive:function(messageObject){
	}
}