"use strict";

function Memory(div, rows, cols) {
    var memory = [];
    var rows = rows;
    var cols = cols;
    var div = div;
    this.init = function () {
        memory = RandomGenerator.getPictureArray(rows, cols);
    };
    this.start = function () {
        var imagesFlipped = 0;
        var clickedImage = "";
        var lastClickedImage;
        memory.forEach(function (element) {
            var div = document.createElement("div");
            var a = document.createElement("a");
            var image = document.createElement("img");
            var that = this;

            a.appendChild(image);
            a.setAttribute("href", "#");
            image.setAttribute("data-src", "pics/" + element + ".png");
            a.addEventListener("click", function (e) {
                if (imagesFlipped === 0) {
                    lastClickedImage = e.target;
                    imagesFlipped += 1;
                }
                if (imagesFlipped < 2) {
                    e.target.setAttribute("src", e.target.dataset.src);
                    if (lastClickedImage != e.target) {
                        imagesFlipped += 1;
                    }
                }
                if (imagesFlipped == 2) {
                    if (lastClickedImage != e.target && lastClickedImage.getAttribute("src") == e.target.getAttribute("src")) {
                        alert("DU vann!");
                    }
                    imagesFlipped = 0;
                    setTimeout(function () {
                        var images = document.querySelectorAll("a img");
                        lastClickedImage.setAttribute("src", "pics/0.png");
                        e.target.setAttribute("src", "pics/0.png");
                        for(var i = 0; i < images.length; i++){
                            images[i].setAttribute("src", "pics/0.png");
                        }
                    }, 1000);
                }
            });
            image.setAttribute("src", "pics/" + 0 + ".png");
            div.appendChild(a);
            document.getElementById("bestdiv").appendChild(div);
        });
    };
    this.turnImg = function (e) {
        
    };
}