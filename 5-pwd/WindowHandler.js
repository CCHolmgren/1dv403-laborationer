/* Handles the windows
   Will later probably handle
   Creation and destruction of windows
   And so forth*/
/* global JAWM, document, console */
JAWM.WindowHandler = {
    windows: {},
    maxzindex: 0,
    id: 0,
    windowcount: 1,
    
    createWindow: function (windowclass, top, left, width, height) {
        var w = window,
            windowWidth = w.innerWidth,
            windowHeight = w.innerHeight;
        
        //We want to limit the spawning area so that the 
        //windows do not spawn outside of the viewport
        //This is done with modulo and the windowHeight
        //-the height of the window we want to spawn
        //The we remove 72 px extra so that it wont go over our launchbar
        //works the same way for the left variable aswell
        top = top || (this.getWindowCount() * 30 + 20)%(windowHeight-height-72);
        left = left || (this.getWindowCount() * 20 + 20)%(windowWidth-width);
        
        var x = new JAWM[windowclass](this.id, top, left, width, height);
        
        this.windows[this.id] = x;
        this.maxzindex += 1;
        this.id += 1;
        this.windowcount += 1;
        
        return x;
    },
    //To remove it, use the windows remove function and delete it from the dictionary
    destroyWindow: function (id) {
        this.windows[id].remove();
        delete this.windows[id];
    },
    //return both the DOM element and the object reperesenting that object
    getWindow: function (id) {
        return [document.getElementById(id), this.windows[id]];
    },
    //If we ever want to get direct access to windows without using WindowHandler.windows
    //Might be obsolete
    getWindowObj: function () {
        return this.windows;
    },
    //Return the amount of windows
    getWindowCount: function () {
        return Object.keys(this.windows).length;
    },
    //This function works in Chrome v.32.0 but might break 
    //if they change how zIndex works
    setzIndex: function (id, zindex) {
        console.log(id);
        
        if (zindex > this.maxzindex)
            this.maxzindex = zindex;
        
        /* TODO: this could technically break after a while
         * make it so that it doesn't use more than necessary*/
        this.maxzindex += 1;
        //console.log(this.getWindow(id));

        this.getWindow(id)[1].setzIndex(zindex);
        return this;
    }
};