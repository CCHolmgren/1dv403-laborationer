/* global window, console, document, JAWM */
(function () {
    "use strict";
    window.JAWM = {};
    JAWM.Window = function Window(id, top, left, width, height) {
        this._height = height || 1;
        this._width = width || 1;
        this._top = top || 1;
        this._left = left || 1;
        this._id = id;
        
        //these both refer to the same object
        this._dom = null; //represents the DOM element
        this._window = null; //Represnts the DOM element
        
        this._zindex = 0;
        this._topbar = null; //Represnts the DOM element
        this._content = null; //Represnts the DOM element
        this._bottombar = null; //Represnts the DOM element
        this._name = "Window";

        //console.log("id ", id);
        //console.log("_id ", this._id);
    };
    var Window = JAWM.Window;
    
    //Use a function so we can override it in the children
    JAWM.Window.prototype.content = function (bottombar) {
        var div = document.createElement("div");
        div.classList.add("content");
        return div;
    };
    
    JAWM.Window.prototype.getWindow = function () {
        return this._window;
    };
    
    JAWM.Window.prototype.getTopbar = function () {
        return this._topbar;
    };
    
    JAWM.Window.prototype.getBottombar = function(){
        return this._bottombar;
    };
    
    JAWM.Window.prototype.getID = function () {
        return this._id;
    };
    
    JAWM.Window.prototype.getSize = function () {
        return [this._width, this._height];
    };
    
    JAWM.Window.prototype.setSize = function (width, height) {
        console.log("Inside setSize");
        this._dom.style.height = height + "px";
        this._dom.style.width = width + "px";
        this._height = height;
        this._width = width;
        return this;
    };
    
    JAWM.Window.prototype.setHeight = function(height){
        this._dom.style.height = height + "px";
        this._height = height;
        return this;
    };
    
    JAWM.Window.prototype.setWidth = function(width){
        this._dom.style.width = width + "px";
        this._width = width;
        return this;
    };
    
    //Our large function to set up and create the whole window
    //Should maybe change to several smaller functions
    JAWM.Window.prototype.render = function () {
        //Might as well avoid hoisting
        var that = this,
            topBar,
            closeButton,
            windowIconDiv,
            windowIcon,
            titleSpan,
            title,
            titleContainer,
            bottomBar;
        
        this._window = document.createElement("div");
        this._window.classList.add("icon");
        this.setzIndex(this.getID());
        //this._window.style.overflowY = "scroll";
        this._window.style.width = this._width + "px";
        this._window.style.height = this._height + "px";
        this._window.style.top = this._top + "px";
        this._window.style.left = this._left + "px";
        this._window.style.backgroundColor = "#fff";
        //_window.setAttribute("draggable", "true");
        this._window.setAttribute("id", this.getID());
        
        topBar = document.createElement("div");
        topBar.classList.add("topbar");
        topBar.classList.add("gradient");
        topBar.id = "topbar" + this.getID();
        //topBar.style.height = "52px";
        //topBar.style.background = "-webkit-linear-gradient(top, #ffffff 0%,#f6f6f6 47%,#ededed 100%)";
        //topBar.setAttribute("draggable", "true");
        topBar.addEventListener("click", function(e){
            JAWM.WindowHandler.setzIndex(this._id, JAWM.WindowHandler.maxzindex);
        }.bind(this));

        closeButton = document.createElement("button");
        closeButton.classList.add("closebutton");
        closeButton.appendChild(document.createTextNode("x"));
        closeButton.addEventListener("click", function (e) {
            JAWM.WindowHandler.destroyWindow(e.target.parentNode.parentNode.id);
        });
        windowIconDiv = document.createElement("div");
        windowIcon = document.createElement("img");
        //windowIconDiv.appendChild(windowIcon);
        windowIconDiv.style.height = "26px";
        windowIconDiv.style.width = "26px";
        windowIconDiv.style.float = "left"
        
        titleSpan = document.createElement("span");
        title = document.createTextNode(this._name);
        titleContainer = document.createElement("div");
        titleContainer.classList.add("titlecontainer");
        
        titleSpan.appendChild(title);
        titleContainer.appendChild(titleSpan);
        
        topBar.appendChild(windowIconDiv);
        topBar.appendChild(titleContainer);
        topBar.appendChild(closeButton);

        bottomBar = document.createElement("div");
        bottomBar.id = "bottombar" + this.getID();
        bottomBar.classList.add("bottombar");
        bottomBar.classList.add("gradient");

        //this._topbar = topBar;
        this._window.appendChild(topBar);
        this._window.appendChild(this.content(bottomBar));
        this._window.appendChild(bottomBar);

        document.getElementById("desktop").appendChild(this._window);
        
        this._topbar = document.getElementById("topbar" + this.getID());
        this._bottombar = document.getElementById("bottombar" + this.getID());
        this._dom = document.getElementById(this.getID());
        this._window = this._dom;
        
        return this;
    };
    JAWM.Window.prototype.remove = function () {
        var element = document.getElementById(this.getID());
        element.parentNode.removeChild(element);
    };
    JAWM.Window.prototype.move = function (x, y) {
        this._window.style.left = x + "px";
        this._window.style.top = y + "px";
        console.log("hello from move, ", this._window);
        return this;
    };
    JAWM.Window.prototype.setzIndex = function (zindex) {
        console.log("hello", zindex);
        this._window.style.zIndex = zindex;
        this._zindex = zindex;
        return this;
    };
    JAWM.Window.prototype.getzIndex = function () {
        return this._zindex;
    };
}());