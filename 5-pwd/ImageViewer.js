JAWM.ImageViewer = function(id, top, left) {
    console.log("Imageviewer");
    this._id = id;
    this._top = top;
    this._left = left;
};

JAWM.ImageViewer.prototype = new JAWM.Window();