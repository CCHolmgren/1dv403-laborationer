/* global window, console, document */
window.JAWM = {};
window.JAWM.Window = function Window() {
    "use strict";
    if (Window.nextID === undefined) {
        Window.nextID = 1;
    } else {
        Window.nextID++;
    }
    var _height;
    var _width;
    this.setSize = function (height, width) {
        this._height = height;
        this._width = width;
    };
    this.ID = function () {
        return Window.nextID;
    };
    this.printSize = function () {
        console.log(this._height);
        console.log(this._width);
    };
    this.render = function () {
        var div = document.createElement("div");
        div.classList.add("icon");
        div.setAttribute("draggable", "true");
        div.setAttribute("id", this.ID().toString());
        document.getElementById("bottombar").appendChild(div);
    };
};