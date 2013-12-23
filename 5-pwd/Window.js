/* global window, console, document, JAWM */
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
        _id,
        _window,
        _zindex;
    
    this.setSize = function (height, width) {
        _height = height;
        _width = width;
        return this;
    };
    this.getWindow = function(){
        return _window;
    };
    this.nextID = function() {
        return Window.nextID;
    };
    this.printSize = function () {
        console.log(_height);
        console.log(_width);
    };
    this.render = function () {
        _window = document.createElement("div");
        _window.classList.add("icon");
        this.setzIndex(this.nextID());
        _window.style.width = _width+"px";
        _window.style.height = _height+"px";
        _window.style.backgroundColor = "#fff";
        _window.setAttribute("draggable", "true");
        _window.setAttribute("id", this.nextID().toString());
        
        var closebutton = document.createElement("button");
        closebutton.classList.add("closebutton");
        closebutton.appendChild(document.createTextNode("Hej"));
        closebutton.addEventListener("click", function(e){
            JAWM.WindowHandler.destroyWindow(_id);
        }.bind(this), false);        
        
        var topbar = document.createElement("div");
        topbar.classList.add("topbar");
        //topbar.setAttribute("draggable", "true");
        topbar.appendChild(closebutton);
        _window.appendChild(topbar);
        
        document.getElementById("desktop").appendChild(_window);
        _id = this.nextID();
        return this;
    };
    this.remove = function() {
        var element = document.getElementById(_id);
        element.parentNode.removeChild(element);
    };
    this.move = function(x, y){
        _window.style.left = x + "px";
        _window.style.top = y + "px";
        console.log("hello from move, ",_window);
        return this;
    };
    this.setzIndex = function(zindex){
        _window.style.zIndex = zindex;
        _zindex = zindex;
        return this;
    };
    this.getzIndex = function(){
        return _zindex;
    };
};