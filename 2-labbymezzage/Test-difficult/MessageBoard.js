"use strict";

function MessageBoard(div) {
    this.messages = [];
    this.selectedDiv = document.getElementById(div);
    console.log(this.selectedDiv);
    return this;
}

MessageBoard.prototype.add = function(text){
        this.messages.push(new Message(text, new Date()));
        console.log(text);
        console.log(this.messages);
    }
// var MessageBoard = {
//     messages: [],

//     add: function (e) {
//         var mess = new Message(e, new Date());
//         this.messages.push(mess);
//     },
//     remaining:function(){
//     	var count = 0;
//     	this.messages.map(function(message){
//     		if(!message.removed) count += 1;
//     	});
//     	return count;
//     },
//     updateCount:function(){
//     	var div = document.getElementById("counter");
//     	div.innerHTML = "";
//     	div.appendChild(document.createTextNode(this.remaining()));
//     },
//     // renderMessages: function () {
//     //     throw new Error("This function is not working as it should, so you should not be using it at all.");
//     //     document.getElementById("thebestdiv").innerHTML = "";

//     //     MessageBoard.messages.forEach(function (message) {
//     //         console.log(message.getText());
//     //         MessageBoard.renderMessage(message.id);
//     //     });
//     // },

//     renderMessage: function (messageID) {
//         var messageArea = document.getElementById("thebestdiv"),
//         	p = document.createElement("p"),
//         	dateP = document.createElement("p"),
//         	div = document.createElement("div"),
//         	time = document.createElement("time"),
//         	removeButton = document.createElement("button"),
//         	timebutton = document.createElement("button"),
//         	that = this,
//         	IDindex = 0,
//         	ids = this.messages.map(function (message) {
//             	return message.id;
//         	});
//         	//text = document.createTextNode(this.messages[IDindex].getHTMLText());


//         ids.forEach(function (element, index, array) {
//                 if (element == messageID) {
//                     IDindex = index;
//                 }
//             });
        
//         var date = document.createTextNode(this.messages[IDindex].getDateText());

//         timebutton.innerHTML = "Tid";
//         timebutton.className = "right";

//         timebutton.addEventListener("click", function(e){
//             alert(e.target.parentNode.dataset.time);
//         });

//         removeButton.innerHTML = "Ta bort";
//         removeButton.className = "right";
//         removeButton.addEventListener("click", this.removeMessageDOM);

//         div.setAttribute("data-id", this.messages[IDindex].id);
//         div.setAttribute("data-time",this.messages[IDindex].getDate());

// 		div.className = "message";

// 		time.appendChild(date);
//         dateP.appendChild(time);
//         dateP.className = "datetext";

//         p.innerHTML = this.messages[IDindex].getHTMLText();
//         div.appendChild(p);
//         div.appendChild(removeButton);
//         div.appendChild(timebutton);
//         div.appendChild(dateP);
//         messageArea.appendChild(div);
//         MessageBoard.updateCount();
//     },

//     removeMessageDOM: function (e) {
//     	if(window.confirm("Are you sure you want to remove this message?")){
// 	    	console.log(e)
// 	    	e.target.parentNode.remove();
// 	    	var indexID,
//                 id = e.target.dataset.id,
//                 ids = MessageBoard.messages.map(function(message){
//                     return message.id;
//                 }).forEach(function(element,index,array){
//                     if(element == id) indexID = index;
//                 });

// 	    	MessageBoard.messages.splice(indexID,1);
// 	    	MessageBoard.updateCount();
// 		}
//     },

//     removeMessage: function(){
//      //    document.querySelector('p[data-id="'+messageID+'"]').remove();
//      //    document.querySelector('p[data-id="'+IDindex+'"]').remove();

//         // var IDindex = 0;
//         // var ids = MessageBoard.messages.map(function (message) {
//         //     return message.id;
//         // });
//         // ids.forEach(function (element, index, array) {
//         //     if (element == messageID) {
//         //         IDindex = index;
//         //     }
//         // });
// 		this.messages[IDindex].removed=true;
//         this.messages.splice(IDindex,1);
//         this.updateCount();
//     },
// }

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