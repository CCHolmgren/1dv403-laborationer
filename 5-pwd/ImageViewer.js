/* global JAWM, console, document, XMLHttpRequest */
"use strict";

JAWM.ImageViewer = function (id, top, left) {
    console.log("Imageviewer");
    this._id = id;
    this._top = top;
    this._left = left;
    this._loadedimages = null;
};

JAWM.ImageViewer.prototype = new JAWM.Window();
JAWM.ImageViewer.prototype.content = function () {
    var div = document.createElement("div");
    this.xhrgetimages(div);
    return div;
};

JAWM.ImageViewer.prototype.xhrgetimages = function (handle) {
    var xhr = new XMLHttpRequest(),
        that = this,
        handlehello = handle;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var response = JSON.parse(xhr.responseText);
            var largestimages = [200, 200];
            for(var i = 0; i < response.length; i++){
                var img = document.createElement("img");
                img.setAttribute("src", response[i].thumbURL);
                img.setAttribute("data-imgvalue", i);
                img.style.width = largestimages[0] + "px";
                img.style.height = largestimages[1] + "px";
                img.style.float = "left";
                console.log(response);
                img.addEventListener("click", function(e){
                    console.log(e);
                    console.log("Response inside click event", response);
                    console.log(i);
                    document.body.style.backgroundImage = 'url(' +  response[e.target.dataset.imgvalue].URL + ')';
                });
                handlehello.appendChild(img);
                handlehello.style.overflow = "scroll";
                handlehello.style.height = "100%";
            }
        }
    };
    xhr.open('GET', 'http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/?'+this.getID() , true);
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