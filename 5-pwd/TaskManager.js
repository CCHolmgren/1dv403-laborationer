/* global JAWM, window, console, document */
/*  Represents a window where you can close all other windows
    Unfinished
    Should maybe change to a static object instead
*/
(function () {
    "use strict";
    JAWM.TaskManager = function (id, top, left, width, height) {
        //DRY
        JAWM.Window.call(this, id, top, left, width, height);
        this._name = "TaskManager";
    };
    JAWM.TaskManager.prototype = new JAWM.Window();

    JAWM.TaskManager.prototype.content = function (bottombar) {
        var div = document.createElement("div"),
            windowdiv = document.createElement("div"),
            windows = JAWM.WindowHandler.getWindowObj(),
            keys = Object.keys(windows),
            windowlist = keys.map(function(key){
            return windows[key];
        });
        
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
        //Timeouts just breaks stuff really bad, so we do not use it right now
        //setTimeout(JAWM.WindowHandler.getWindow(this._id)[1].updatecontent.bind(this), 2000);
        return div;
    };
    //This function breaks stuff really bad, so we do not use it until its fixed
    JAWM.TaskManager.prototype.updatecontent = function() {
        var contentdiv = document.getElementById("content"+this._id),
            thiswindow = JAWM.WindowHandler.getWindow(this._id)[1];
        contentdiv.innerHTML = thiswindow.content().innerHTML;
    };
}());