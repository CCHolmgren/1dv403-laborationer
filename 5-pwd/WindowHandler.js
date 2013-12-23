/* Handles the windows
   Will later probably handle
   Creation and destruction of windows
   And so forth*/
/* global JAWM */
JAWM.WindowHandler = {
    windows: {},
    createWindow: function(windowclass){
        var x = new JAWM[windowclass]();
        this.windows[x.nextID()] = x;
        return x;
    },
    destroyWindow: function(id){
        this.windows[id].remove();
        delete this.windows[id];
    },
    getWindow: function(id){
        return this.windows[id];
    }
};