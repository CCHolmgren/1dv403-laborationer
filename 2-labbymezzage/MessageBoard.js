var MessageBoard = {
    messages: [],

    add: function (e) {
        var mess = new Message(e, new Date());
        this.messages.push(mess);
    },
    remaining:function(){
    	var count = 0;
    	this.messages.map(function(message){
    		if(!message.removed) count += 1;
    	});
    	return count;
    },
    updateCount:function(){
    	var div = document.getElementById("counter");
    	div.innerHTML = "";
    	div.appendChild(document.createTextNode(this.remaining()));
    },

    renderMessages: function () {
        document.getElementById("thebestdiv").innerHTML = "";

        this.messages.forEach(function (message) {
            console.log(message);
            MessageBoard.renderMessage(message.id);
        });
    },

    renderMessage: function (messageID) {
        var messageArea = document.getElementById("thebestdiv");
        var p = document.createElement("p");
        var IDindex = 0;
        var ids = this.messages.map(function (message) {
            return message.id;
        });
        ids.forEach(function (element, index, array) {
            if (element == messageID) {
                IDindex = index;
            }
        });

        p.setAttribute("data-id", this.messages[IDindex].id);
        //p.addEventListener("click", function () {
        //	MessageBoard.removeMessage(IDindex);
        //});
		p.addEventListener("click",this.removeMessageDOM);

        var text = document.createTextNode(this.messages[IDindex].getHTMLText());

        p.appendChild(text);
        messageArea.appendChild(p);
        MessageBoard.updateCount();
    },

    removeMessageDOM: function (e) {
    	console.log(e)
    	e.target.remove();
    	var indexID;
    	var id = e.target.dataset.id;
    	var ids = MessageBoard.messages.map(function(message){
    		return message.id;
    	}).forEach(function(element,index,array){
    		if(element == id) indexID = index;
    	});
    	console.log("Messages " +MessageBoard.messages);
    	console.log("Indexid " + indexID);
    	MessageBoard.messages.splice(indexID,1);
    	MessageBoard.updateCount();

    },

    removeMessage: function(){
     //    document.querySelector('p[data-id="'+messageID+'"]').remove();
     //    document.querySelector('p[data-id="'+IDindex+'"]').remove();

        // var IDindex = 0;
        // var ids = MessageBoard.messages.map(function (message) {
        //     return message.id;
        // });
        // ids.forEach(function (element, index, array) {
        //     if (element == messageID) {
        //         IDindex = index;
        //     }
        // });
		this.messages[IDindex].removed=true;
        this.messages.splice(IDindex,1);
        this.updateCount();
    }
}
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}