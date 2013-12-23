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
    var _height,
        _width,
        id,
        window,
        zindex;
    
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
        window = document.createElement("div");
        window.classList.add("icon");
        this.setzIndex(this.nextID());
        window.style.width = this._width+"px";
        window.style.height = this._height+"px";
        window.style.backgroundColor = "#fff";
        window.setAttribute("draggable", "true");
        window.setAttribute("id", this.nextID().toString());
        document.getElementById("bottombar").appendChild(window);
        this.id = this.nextID();
        return this;
    };
    this.remove = function() {
        var element = document.getElementById(this.id);
        element.parentNode.removeChild(element);
    };
    this.move = function(x, y){
        window.style.left = x + "px";
        window.style.top = y + "px";
        return this;
    };
    this.setzIndex = function(zindex){
        window.style.zIndex = zindex;
        this.zindex = zindex;
        return this;
    };
    this.getzIndex = function(){
        return this.zindex;
    };
};