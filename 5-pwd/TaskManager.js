/* global JAWM, window, console, document */
(function () {
    "use strict";
    JAWM.TaskManager = function (id, top, left) {
        this._id = id;
        this._top = top;
        this._left = left;
        this._loadedimages = null;
        this._name = "TaskManager";
    };
    JAWM.TaskManager.prototype = new JAWM.Window();

    JAWM.TaskManager.prototype.content = function () {
        var div = document.createElement("div");
        var windowdiv = document.createElement("div");
        var windows = JAWM.WindowHandler.getWindowObj();
        var keys = Object.keys(windows);
        var windowlist = keys.map(function(key){
            return windows[key];
        });
        console.log(windowlist);
        windowlist.forEach(function(element){
            var divi = document.createElement("div");
            divi.innerHTML = element._name;
            windowdiv.appendChild(divi);
        });
        div.appendChild(windowdiv);
        return div;
    };
}());