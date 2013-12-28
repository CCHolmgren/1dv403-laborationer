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
    
    /*JAWM.Memory.prototype.content = function(){
        
    };*/
}());