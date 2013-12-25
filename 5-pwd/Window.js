/* global window, console, document, JAWM */
window.JAWM = {};
JAWM.Window = function Window(id) {
    "use strict";
    this._height = 0;
    this._width = 0;
    this._id = id;
    this._window = null;
    this._zindex = 0;
    this._topbar = null;
    
    console.log("id ", id);
    console.log("_id ", this._id);
};
var Window = JAWM.Window;
Window.prototype.setSize = function (height, width) {
        this._height = height;
        this._width = width;
        return this;
    };
    Window.prototype.getWindow = function(){
        return this._window;
    };
    Window.prototype.getTopbar = function(){
        return this._topbar;
    };
    Window.prototype.getID = function() {
        return this._id;
    };
    Window.prototype.printSize = function () {
        console.log(this._height);
        console.log(this._width);
    };
    Window.prototype.render = function () {
        this._window = document.createElement("div");
        this._window.classList.add("icon");
        this.setzIndex(this.getID());
        this._window.style.width = this._width+"px";
        this._window.style.height = this._height+"px";
        this._window.style.backgroundColor = "#fff";
        //_window.setAttribute("draggable", "true");
        this._window.setAttribute("id", this.getID());
        var closebutton = document.createElement("button");
        closebutton.classList.add("closebutton");
        closebutton.appendChild(document.createTextNode("Hej"));       
        
        var topbar = document.createElement("div");
        topbar.classList.add("topbar");
        topbar.setAttribute("draggable", "true");
        topbar.appendChild(closebutton);
        this._topbar = topbar;
        this._window.appendChild(topbar);
        
        document.getElementById("desktop").appendChild(this._window);
        return this;
    };
    Window.prototype.remove = function() {
        var element = document.getElementById(this.getID());
        element.parentNode.removeChild(element);
    };
    Window.prototype.move = function(x, y){
        this._window.style.left = x + "px";
        this._window.style.top = y + "px";
        console.log("hello from move, ",this._window);
        return this;
    };
    Window.prototype.setzIndex = function(zindex){
        this._window.style.zIndex = zindex;
        this._zindex = zindex;
        return this;
    };
    Window.prototype.getzIndex = function(){
        return this._zindex;
    };