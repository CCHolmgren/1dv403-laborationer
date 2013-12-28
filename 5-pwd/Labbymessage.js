/* global JAWM */
(function(){
    "use strict";
    JAWM.Labbymessage = function(id, top, left, width, height){
        JAWM.Window.call(this, id, top, left, width, height);
        //this._id = id;
        //this._top = top;
        //this._left = left;
        //this._loadedimages = null;
        this._name = "Labbymessage";
    };
    JAWM.Labbymessage.prototype = new JAWM.Window();
    
}());