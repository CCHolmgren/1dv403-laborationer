/* global JAWM, window, console, document */

(function(){
    "use strict";
    JAWM.Memory = function(id, top, left, width, height){
        JAWM.Window.call(this, id, top, left, width, height);
        //this._id = id;
        //this._top = top;
        //this._left = left;
        //this._loadedimages = null;
        this._name = "MemoryWindow";
    };
    JAWM.Memory.prototype = new JAWM.Window();
    
    JAWM.Memory.prototype.content = function(){
        var div = document.createElement("div"),
            maindiv = document.createElement("div"), 
            windiv = document.createElement("div");
        
        maindiv.id="maindiv"+this._id;
        windiv.id = "windiv"+this._id;
        div.id = "content"+this._id;
        div.appendChild(maindiv);
        div.appendChild(windiv);
        return div;
    };
    JAWM.Memory.prototype.render = function () {
        //Might as well avoid hoisting
        var that = this,
            topbar,
            closebutton,
            windowicondiv,
            windowicon,
            titlespan,
            title,
            titlecontainer,
            bottombar;
        
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
        
        topbar = document.createElement("div");
        topbar.classList.add("topbar");
        topbar.classList.add("gradient");
        topbar.id = "topbar" + this.getID();
        topbar.style.height = "52px";
        topbar.style.background = "-webkit-linear-gradient(top, #ffffff 0%,#f6f6f6 47%,#ededed 100%)";
        //topbar.setAttribute("draggable", "true");
        topbar.addEventListener("click", function(e){
            JAWM.WindowHandler.setzIndex(this._id, JAWM.WindowHandler.maxzindex);
        }.bind(this));

        closebutton = document.createElement("button");
        closebutton.classList.add("closebutton");
        closebutton.appendChild(document.createTextNode("x"));
        closebutton.addEventListener("click", function (e) {
            JAWM.WindowHandler.destroyWindow(e.target.parentNode.parentNode.id);
        });
        windowicondiv = document.createElement("div");
        windowicon = document.createElement("img");
        //windowicondiv.appendChild(windowicon);
        windowicondiv.style.height = "26px";
        windowicondiv.style.width = "26px";
        windowicondiv.style.float = "left";
        
        titlespan = document.createElement("span");
        title = document.createTextNode(this._name);
        titlecontainer = document.createElement("div");
        
        titlecontainer.style.float = "left";
        
        titlespan.appendChild(title);
        titlecontainer.appendChild(titlespan);
        
        topbar.appendChild(windowicondiv);
        topbar.appendChild(titlecontainer);
        topbar.appendChild(closebutton);

        bottombar = document.createElement("div");
        bottombar.id = "bottombar" + this.getID();
        bottombar.classList.add("bottombar");
        bottombar.classList.add("gradient");

        //this._topbar = topbar;
        this._window.appendChild(topbar);
        this._window.appendChild(this.content(bottombar));
        this._window.appendChild(bottombar);

        document.getElementById("desktop").appendChild(this._window);
        
        this._topbar = document.getElementById("topbar" + this.getID());
        this._bottombar = document.getElementById("bottombar" + this.getID());
        this._dom = document.getElementById(this.getID());
        this._window = this._dom;
        var memory = new Memory("maindiv"+this._id, "windiv"+this._id, 4, 4);
        memory.init();
        memory.start();

        return this;
    };
}());