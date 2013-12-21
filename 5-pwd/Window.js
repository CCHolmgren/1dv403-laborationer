/* global window, console, document */
window.JAWM = {};
window.JAWM.Window = function(){
    "use strict";
    var _height;
    var _width;
    this.setSize = function(height, width){
        this._height = height;
        this._width = width;
    };
    this.printSize = function(){
        console.log(this._height);
        console.log(this._width);
    };
    this.render = function(){
        var div = document.createElement("div");
        div.classList.add("floatingWindow");
        document.getElementById("main").appendChild(div);
    };
};