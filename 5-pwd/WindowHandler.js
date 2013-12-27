/* Handles the windows
   Will later probably handle
   Creation and destruction of windows
   And so forth*/
/* global JAWM, document, console */
JAWM.WindowHandler = {
    windows: {},
    maxzindex: 0,
    id:0,
    windowcount: 1,
    createWindow: function(windowclass, top, left){
        top = top || this.getWindowCount() * 20+20;
        left = left || this.getWindowCount() * 20+20;
        console.log("top", top);
        console.log("left", left);
        var x = new JAWM[windowclass](this.id, top, left);
        this.windows[this.id] = x;
        this.maxzindex+=1;
        this.id+=1;
        this.windowcount += 1;
        //this.setSize(this.id,width, height);
        return x;
    },
    destroyWindow: function(id){
        this.windows[id].remove();
        delete this.windows[id];
    },
    getWindow: function(id){
        return [document.getElementById(id), this.windows[id]];
    },
    getWindowCount: function(){
        return Object.keys(this.windows).length;
    },
    /*setSize: function(id, width, height){
        width = width || 100;
        height = height || 100;
        document.getElementById(id).style.width = width;
        document.getElementById(id).style.height = height;
        this.getWindow(id).setSize(width, height);
    }*/
    setzIndex: function(id, zindex){
        if(zindex > this.maxzindex)
            this.maxzindex = zindex;
        this.getWIndow(id).setzIndex(zindex);
        return this;
    }
};