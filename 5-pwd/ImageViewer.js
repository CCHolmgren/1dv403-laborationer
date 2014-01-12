/* global JAWM, console, document, XMLHttpRequest */
(function () {
    "use strict";

    //Constructing the object by using Window.call and using this
    //That way we do not need to write the same code several times
    JAWM.ImageViewer = function (id, top, left, width, height) {
        JAWM.Window.call(this, id, top, left, width, height);
        //Holds our loaded images when they are loaded
        this._loadedimages = null;
        //Used for the title
        this._name = "ImageViewer";
    };

    //Inherits from Window
    JAWM.ImageViewer.prototype = new JAWM.Window();
    //Override the original content function so that we
    //can define what content we want to have
    JAWM.ImageViewer.prototype.content = function (bottombar) {
        var div = document.createElement("div");
        //Gets the images and passes in the handle so we can use it later
        //Also uses bottombar so we can use that aswell since we need a spinner
        this.xhrgetimages(div, bottombar);
        return div;
    };

    //The function that loads the images
    JAWM.ImageViewer.prototype.xhrgetimages = function (divhandle, botbar ) {
        //XMLHttpRequest object for our ajax call
        var xhr = new XMLHttpRequest(),
            //spinner
            loaderimg = document.createElement("img"),
            //For evenhandler
            //could have binded it, but for some reason i didnt do that here
            that = this,
            //handle for us to add content to
            handle = divhandle,
            //bottombar for spinner
            bottombar = botbar,
            //To get loading time
            d = new Date(), 
            start = d.getTime();
        
        //Set the src to the spinner
        loaderimg.setAttribute("src", "ajax-loader.gif");
        bottombar.appendChild(loaderimg);
        bottombar.appendChild(document.createTextNode("Loading.."));
        
        //Our eventhandler that does everything for us
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                //JSON.parse instead of evaling or something like that
                //Doesn't bring the objects into global scope, just local
                var response = JSON.parse(xhr.responseText),
                    largestdimensions = that.largestimage(response);
                
                for (var i = 0; i < response.length; i++) {
                    var img = document.createElement("img"),
                        div = document.createElement("div");
                    
                    img.setAttribute("src", response[i].thumbURL);
                    img.setAttribute("data-imgvalue", i);
                    img.setAttribute("alt", "");
                    
                    div.style.width = largestdimensions[0] + "px";
                    div.style.height = largestdimensions[1] + "px";
                    div.style.float = "left";
                    
                    div.addEventListener("click", function (e) {
                        console.log(e);
                        console.log("Response inside click event", response);
                        //This is a complicated line of code
                        //It sets the background image of body to the image clicked
                        //However, since this is a onclick event we must check 
                        //if it's the image or the div we clicked since the 
                        //dataset is only on the image and not on the div
                        //e.toElement.locaName == "div", if the clicked element is 
                        //the div, use e.target.firstChild (the image)'s dataset
                        document.body.style.backgroundImage = 'url(' + response[(e.toElement.localName == "div") ? e.target.firstChild.dataset.imgvalue : e.target.dataset.imgvalue].URL + ')';
                    });
                    
                    div.appendChild(img);
                    handle.appendChild(div);
                    
                    handle.style.position = "relative";
                    handle.style.top = "0";
                    handle.style.left = "0";
                    handle.style.overflowY = "scroll";
                    handle.classList.add("content");
                }
                //Write out the loading time in ms from start till we are fully done
                //You could cound differently if the browser is slow, 
                //Set this code on the first row of onreadystatechange
                //so it doesn't depend on DOM appending and just the ajax call
                bottombar.innerHTML = (new Date().getTime() - start) + "ms";
            }
        };
        xhr.open('GET', 'http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/?' + this.getID(), true);
        xhr.send(null);
    };
    
    //Max wouldn't work properly so this is a function 
    //to get the dimensions of the json
    JAWM.ImageViewer.prototype.largestimage = function (jsonofimages) {
        var maxHeight = 0,
            maxWidth = 0,
            keys = Object.keys(jsonofimages),
            imageWidths = keys.map(function (key) {
                return jsonofimages[key].thumbWidth;
            }),
            imageHeights = keys.map(function (key) {
                return jsonofimages[key].thumbHeight;
            });
        
        imageHeights.forEach(function (element) {
            //If the element is larger, use that instead
            if (element > maxHeight) {
                maxHeight = element;
            }
        });
        imageWidths.forEach(function (element) {
            //If the element is larger, use that instead
            if (element > maxWidth) {
                maxWidth = element;
            }
        });
        
        //Return both objects
        return [maxWidth, maxHeight];
    };
}());