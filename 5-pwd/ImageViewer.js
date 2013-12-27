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

JAWM.ImageViewer.prototype.xhrgetimages = function (divhandle) {
    var xhr = new XMLHttpRequest(),
        that = this,
        handle = divhandle;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var response = JSON.parse(xhr.responseText);
            var largestimages = that.largestimage(response);
            for(var i = 0; i < response.length; i++){
                var img = document.createElement("img");
                var div = document.createElement("div");
                img.setAttribute("src", response[i].thumbURL);
                img.setAttribute("data-imgvalue", i);
                div.style.width = largestimages[0] + "px";
                div.style.height = largestimages[1] + "px";
                div.style.float = "left";
                img.addEventListener("click", function(e){
                    console.log(e);
                    console.log("Response inside click event", response);
                    console.log(i);
                    document.body.style.backgroundImage = 'url(' +  response[e.target.dataset.imgvalue].URL + ')';
                });
                div.appendChild(img);
                handle.appendChild(div);
                handle.style.overflow = "scroll";
                handle.style.height = "100%";
            }
        }
    };
    xhr.open('GET', 'http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/?'+this.getID() , true);
    xhr.send(null);
};

JAWM.ImageViewer.prototype.largestimage = function(listofimages){
    var maxHeight = 0;
    var maxWidth = 0;
    var keys = Object.keys(listofimages);
    var imageWidths = keys.map(function(key){
        return listofimages[key].thumbWidth;
    });
    var imageHeights = keys.map(function(key){
        return listofimages[key].thumbHeight;
    });
    imageHeights.forEach(function(element){
        if(element>maxHeight){
            maxHeight = element;
        }
    });
    imageWidths.forEach(function(element){
        if(element >maxWidth){
            maxWidth = element;
        }
    });
    console.log(maxHeight, maxWidth);
    return [maxWidth, maxHeight];
};