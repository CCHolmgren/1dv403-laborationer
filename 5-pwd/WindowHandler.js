/* Handles the windows
   Will later probably handle
   Creation and destruction of windows
   And so forth*/
/* global JAWM */
JAWM.WindowHandler = {
    windows: {},
    maxzindex: 0,
    id:0,
    createWindow: function(windowclass){
        var x = new JAWM[windowclass](this.id);
        this.windows[this.id] = x;
        this.maxzindex+=1;
        this.id+=1;
        return x;
    },
    destroyWindow: function(id){
        this.windows[id].remove();
        delete this.windows[id];
    },
    getWindow: function(id){
        return this.windows[id];
    },
    getWindowCount: function(){
        return Object.keys(this.windows).length;
    },
    setzIndex: function(id, zindex){
        if(zindex > this.maxzindex)
            this.maxzindex = zindex;
        this.windows[id].setzIndex(zindex);
        return this;
    }
};