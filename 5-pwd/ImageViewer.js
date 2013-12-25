JAWM.ImageViewer = function() {
    console.log("Imageviewer");
    JAWM.Window.call(this);
};

JAWM.ImageViewer.prototype = Object.create(JAWM.Window.prototype);

JAWM.ImageViewer.prototype.getID = function() {
    return JAWM.Window.getID().bind(this);
};