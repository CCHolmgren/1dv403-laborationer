/* global JAWM, window, console, document */
(function () {
    "use strict";
    JAWM.TaskManager = function (id, top, left) {
        this._id = id;
        this._top = top;
        this._left = left;
        this._loadedimages = null;
    };
    JAWM.TaskManager.prototype = new JAWM.Window();

    JAWM.TaskManager.prototype.content = function () {
        return document.createElement("div");
    };
}());