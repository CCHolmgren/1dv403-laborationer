/* global JAWM, window, console, document */
(function () {
    "use strict";
    JAWM.TaskManager = function (id, top, left) {
        this._id = id;
        this._top = top;
        this._left = left;
        this._loadedimages = null;
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
        console.log("windowlist", windowlist);
        windowlist.forEach(function(element){
            var divi = document.createElement("div");
            divi.innerHTML = element._name;
            windowdiv.appendChild(divi);
        });
        div.appendChild(windowdiv);
        div.id = "content";
        //setTimeout(JAWM.WindowHandler.getWindow(this._id)[1].updatecontent, 500);
        console.log(div);
        return div;
    };
    JAWM.TaskManager.prototype.updatecontent = function() {
        var contentdiv = document.getElementById("content");
        var thiswindow = JAWM.WindowHandler.getWindow(this._id)[1];
        console.log(contentdiv);
        console.log("thiswindow.content()", thiswindow.content());
        contentdiv.innerHTML = thiswindow.content()+"";
        console.log(contentdiv);
    };
}());