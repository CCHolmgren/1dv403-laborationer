JAWM.ImageViewer = function (id, top, left) {
    console.log("Imageviewer");
    this._id = id;
    this._top = top;
    this._left = left;
    this._loadedimages = null;
};

JAWM.ImageViewer.prototype = new JAWM.Window();
JAWM.ImageViewer.prototype.content = function () {
    var images;
    var sizes;
    var that = this;
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            images = JSON.parse(xhr.responseText);
            sizes = that.largestimage(images);
            console.log(sizes);
            return document.createElement("div");
        }
    };
    xhr.open('GET', 'http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/', true);
    xhr.send(null);
};

JAWM.ImageViewer.prototype.xhrgetimages = function () {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            return JSON.parse(xhr.responseText);
        }
    };
    xhr.open('GET', 'http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/', true);
    xhr.send(null);
};

JAWM.ImageViewer.prototype.largestimage = function(listofimages){
    var maxheight = 0;
    var maxwidth = 0;
    for(var image in listofimages){
        if(image.thumbHeight > maxheight)
            maxheight = image.thumbHeight;
        if(image.thumbWidth > maxwidth)
            maxwidth = image.thumbWidth;
    }
    
    return [maxheight, maxwidth];
};