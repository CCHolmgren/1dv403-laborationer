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
    var _height;
    var _width;
    var id;
    var div;
    this.setSize = function (height, width) {
        this._height = height;
        this._width = width;
        return this;
    };
    this.nextID = function() {
        return Window.nextID;
    };
    this.printSize = function () {
        console.log(this._height);
        console.log(this._width);
    };
    this.render = function () {
        div = document.createElement("div");
        div.classList.add("icon");
        div.style.zIndex = this.nextID();
        div.style.width = this._width+"px";
        div.style.height = this._height+"px";
        div.style.backgroundColor = "#fff";
        div.setAttribute("draggable", "true");
        div.setAttribute("id", this.nextID().toString());
        document.getElementById("bottombar").appendChild(div);
        this.id = this.nextID();
        return this;
    };
    this.remove = function() {
        var element = document.getElementById(this.id);
        element.parentNode.removeChild(element);
    };
    this.move = function(x, y){
        div.style.left = x + "px";
        div.style.top = y + "px";
        return this;
    };
};