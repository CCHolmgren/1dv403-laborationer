(function(){
    "use strict";
    
    function MessageBoard(div) {
        var bestdiv = document.createElement("div"),
            messages = [],
            selectedDiv = document.getElementById(div),
            that = this,
            button = document.createElement("button"),
            textarea = document.createElement("textarea"),
            counter = document.createElement("div"),
            span = document.createElement("span");
    
        textarea.cols = 30;
        textarea.rows = 6;
        textarea.addEventListener("keydown", function (e) {
            if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                that.add();
                textarea.value = "";
                that.updateCount();
            }
        });
        button.innerHTML = "Skriv";
        button.addEventListener("click", function (e) {
            e.preventDefault();
            that.add();
            textarea.value = "";
            that.updateCount();
        });
        selectedDiv.appendChild(bestdiv);
        span.appendChild(document.createTextNode("0"));
        counter.innerHTML = "Antal meddelanden: ";
        counter.appendChild(span);
    
        selectedDiv.appendChild(counter);
        selectedDiv.appendChild(textarea);
        selectedDiv.appendChild(button);
    
        this.add = function (text) {
            messages.push(new Message(textarea.value, new Date()));
            this.renderMessage(messages[messages.length - 1].id);
        };
        
        this.renderMessage = function (messageID) {
            var p = document.createElement("p"),
                dateP = document.createElement("p"),
                div = document.createElement("div"),
                time = document.createElement("time"),
                removeButton = document.createElement("button"),
                timebutton = document.createElement("button"),
                IDindex = 0,
                ids = messages.map(function (message) {
                    return message.id;
                });
    
    
            ids.forEach(function (element, index, array) {
                if (element == messageID) {
                    IDindex = index;
                }
            });
            var date = document.createTextNode(messages[IDindex].getDateText());
    
            timebutton.innerHTML = "Tid";
            timebutton.className = "right";
            timebutton.addEventListener("click", function (e) {
                alert(e.target.parentNode.dataset.time);
            });
    
            removeButton.innerHTML = "Ta bort";
            removeButton.className = "right";
            removeButton.addEventListener("click", this.removeMessageDOM);
    
            div.setAttribute("data-id", messages[IDindex].id);
            div.setAttribute("data-time", messages[IDindex].getDate());
    
            div.className = "message";
    
            time.appendChild(date);
            dateP.appendChild(time);
            dateP.className = "datetext";
    
            p.innerHTML = messages[IDindex].getHTMLText();
            div.appendChild(p);
            div.appendChild(removeButton);
            div.appendChild(timebutton);
            div.appendChild(dateP);
            bestdiv.appendChild(div);
        };
        
        this.removeMessageDOM = function (e) {
            if (window.confirm("Are you sure you want to remove this message?")) {
                console.log(e);
                e.target.parentNode.remove();
                var indexID,
                    id = e.target.dataset.id,
                    ids = messages.map(function (message) {
                        return message.id;
                    }).forEach(function (element, index, array) {
                        if (element == id) indexID = index;
                    });
                messages.splice(indexID, 1);
                that.updateCount();
            }
        };
    
        this.updateCount = function () {
            span.innerHTML = "";
            span.appendChild(document.createTextNode(this.remaining()));
        };
    
        this.remaining = function () {
            var count = 0;
            messages.map(function (message) {
                if (!message.removed) count += 1;
            });
            return count;
        };
    }
    
    Element.prototype.remove = function () {
        this.parentElement.removeChild(this);
    };
    
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    };
})();