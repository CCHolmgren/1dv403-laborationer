/* global JAWM, window, console, document */
(function () {
    "use strict";
    JAWM.TaskManager = function (id, top, left, width, height) {
        JAWM.Window.call(this, id, top, left, width, height);
        //this._id = id;
        //this._top = top;
        //this._left = left;
        //this._loadedimages = null;
        this._name = "TaskManager";
        //this._intervalid = setInterval(this.updatecontent(), 1000);
    };
    JAWM.TaskManager.prototype = new JAWM.Window();

    JAWM.TaskManager.prototype.content = function (bottombar) {
        var div = document.createElement("div");
        var windowdiv = document.createElement("div");
        var windows = JAWM.WindowHandler.getWindowObj();
        var keys = Object.keys(windows);
        var windowlist = keys.map(function(key){
            return windows[key];
        });
        //console.log("windowlist", windowlist);
        windowlist.forEach(function(element){
            var elementdiv = document.createElement("div"),
                elementname = document.createTextNode(element._name),
                namespan = document.createElement("span"),
                removebutton = document.createElement("button");
            removebutton.setAttribute("data-windowid", element._id);
            removebutton.addEventListener("click", function(e){
                console.log(e.target);
                JAWM.WindowHandler.destroyWindow(e.target.dataset.windowid);
            });
            removebutton.appendChild(document.createTextNode("x"));
            
            namespan.appendChild(elementname);
            elementdiv.appendChild(namespan);
            elementdiv.appendChild(removebutton);
            //divi.innerHTML = element._name;
            windowdiv.appendChild(elementdiv);
        });
        div.appendChild(windowdiv);
        div.id = "content" + this._id;
        //setTimeout(JAWM.WindowHandler.getWindow(this._id)[1].updatecontent.bind(this), 2000);
        console.log(div);
        return div;
    };
    JAWM.TaskManager.prototype.updatecontent = function() {
        var contentdiv = document.getElementById("content"+this._id);
        //console.log(this);
        //console.log(this._id);
        var thiswindow = JAWM.WindowHandler.getWindow(this._id)[1];
        //console.log(thiswindow);
        //console.log(contentdiv);
        //console.log("thiswindow.content()", thiswindow.content());
        contentdiv.innerHTML = thiswindow.content().innerHTML;
        //console.log(contentdiv);
    };
}());