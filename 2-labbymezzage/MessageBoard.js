var MessageBoard = {
	messages: [],

	init:function(e)
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
	}
}