/* global window, console, document */
window.JAWM = {};
window.JAWM.Window = function Window() {
    "use strict";
    if(Window.nextID === undefined){
        Window.nextID = 0;
    }
    else {
        Window.nextID++;
    }
    if(Window.windows === undefined){
        Window.windows = {};
        Window.windows[Window.nextID] = this;
    } else {
        Window.windows[Window.nextID] = this;
    }
    var _height;
    var _width;
    this.setSize = function (height, width) {
        this._height = height;
        this._width = width;
        return this;
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
        div.style.zIndex = this.ID();
        div.style.width = this._width+"px";
        div.style.height = this._height+"px";
        div.style.backgroundColor = "#fff";
        div.setAttribute("draggable", "true");
        div.setAttribute("id", this.ID().toString());
        document.getElementById("bottombar").appendChild(div);
        return this;
    };
};