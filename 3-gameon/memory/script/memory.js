"use strict";

function Memory(div, inputRows, inputCols) {
    var memory = [];
    var rows = inputRows;
    var cols = inputCols;
    var selecteddiv = document.getElementById(div);
    this.init = function () {
        memory = RandomGenerator.getPictureArray(rows, cols);
    };
    this.start = function () {
        var imagesFlipped = 0;
        var clickedImage = "";
        var lastClickedImage;
        var stopFlipping = false;
        memory.forEach(function (element) {
            var div = document.createElement("div");
            var a = document.createElement("a");
            var image = document.createElement("img");
            var that = this;

            image.setAttribute("data-src", "pics/" + element + ".png");
            image.setAttribute("src", "pics/" + 0 + ".png");

            a.appendChild(image);
            a.setAttribute("href", "#");
            a.addEventListener("click", function (e) {
                if (imagesFlipped === 0 && !stopFlipping) {
                    lastClickedImage = e.target;
                    imagesFlipped += 1;
                }
                if (imagesFlipped < 2 && !stopFlipping) {
                    e.target.setAttribute("src", e.target.dataset.src);
                    if (lastClickedImage != e.target) {
                        imagesFlipped += 1;
                    }
                }
                if (imagesFlipped == 2 && !stopFlipping) {
                    stopFlipping = true;
                    if (lastClickedImage != e.target && lastClickedImage.getAttribute("src") == e.target.getAttribute("src")) {
                        alert("DU vann!");
                    }
                    setTimeout(function () {
                        lastClickedImage.setAttribute("src", "pics/0.png");
                        e.target.setAttribute("src", "pics/0.png");
                        stopFlipping = false;
                        imagesFlipped = 0;
                    }, 1000);
                }
            });

            div.appendChild(a);
            selecteddiv.appendChild(div);
        });
    };
}