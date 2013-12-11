"use strict";

function Memory(div, inputRows, inputCols) {
    var memory = [];
    var rows = inputRows;
    var cols = inputCols;
    var numOfImages = 8;
    var selecteddiv = document.getElementById(div);

    this.init = function () {
        memory = RandomGenerator.getPictureArray(rows, cols);
    };

    this.start = function () {
        var imagesFlipped = 0;
        var clickedImage = "";
        var lastClickedImage;
        var stopFlipping = false;
        var guesses = 0;
        var won = false;
        var index = 0;
        for (var i = 0; i < rows; i++) {
            var div = document.createElement("div");
            
            for (var j = 0; j < cols; j++) {
                var a = document.createElement("a");
                var image = document.createElement("img");
                var that = this;

                image.setAttribute("data-src", "pics/" + ((memory[index]%numOfImages)+1) + ".png");
                console.log(index%8);
                image.setAttribute("src", "pics/0.png");

                a.appendChild(image);
                a.setAttribute("href", "#");
                a.addEventListener("click", function (e) {
                    if (!won) {
                        if (imagesFlipped === 0 && !stopFlipping) {
                            lastClickedImage = e.target;
                            imagesFlipped += 1;
                            guesses += 1;
                        }
                        if (imagesFlipped < 2 && !stopFlipping) {
                            e.target.setAttribute("src", e.target.dataset.src);
                            if (lastClickedImage != e.target) {
                                imagesFlipped += 1;
                                guesses += 1;
                            }
                        }
                        if (imagesFlipped == 2 && !stopFlipping) {
                            stopFlipping = true;
                            
                            if (lastClickedImage !== e.target && lastClickedImage.getAttribute("src") == e.target.getAttribute("src")) {
                                var winDiv = document.getElementById("win");
                                var text = document.createTextNode("Du vann. Det krävdes " + guesses + " gissningar för dig att hitta de matchande bilderna!");
                                winDiv.appendChild(text);
                                won = true;
                                
                                var images = selecteddiv.querySelectorAll("a img");
                                for (var i = 0; i < images.length; i++) {
                                    images[i].setAttribute("src", images[i].dataset.src);
                                }
                            }
                            if (!won) {
                                setTimeout(function () {
                                    lastClickedImage.setAttribute("src", "pics/0.png");
                                    e.target.setAttribute("src", "pics/0.png");
                                    stopFlipping = false;
                                    imagesFlipped = 0;
                                }, 1000);
                            }
                        }
                    }
                });
                div.appendChild(a);
                div.className = "images " + i;
                index+=1;
            }
            selecteddiv.appendChild(div);
        }
        
        /*memory.forEach(function (element) {
            var div = document.createElement("div");
            var a = document.createElement("a");
            var image = document.createElement("img");
            var that = this;

            image.setAttribute("data-src", "pics/" + element + ".png");
            image.setAttribute("src", "pics/" + 0 + ".png");

            a.appendChild(image);
            a.setAttribute("href", "#");
            a.addEventListener("click", function (e) {
                if (!won) {
                    if (imagesFlipped === 0 && !stopFlipping) {
                        lastClickedImage = e.target;
                        imagesFlipped += 1;
                        guesses += 1;
                    }
                    if (imagesFlipped < 2 && !stopFlipping) {
                        e.target.setAttribute("src", e.target.dataset.src);
                        if (lastClickedImage != e.target) {
                            imagesFlipped += 1;
                            guesses += 1;
                        }
                    }
                    if (imagesFlipped == 2 && !stopFlipping) {
                        stopFlipping = true;
                        if (lastClickedImage != e.target && lastClickedImage.getAttribute("src") == e.target.getAttribute("src")) {
                            var win = document.getElementById("win");
                            var text = document.createTextNode("Du vann. Det krävdes " + guesses + " gissningar för dig att hitta de matchande bilderna!");
                            win.appendChild(text);
                            won = true;
                            var images = document.querySelectorAll("a img");
                            for (var i = 0; i < images.length; i++) {
                                images[i].setAttribute("src", images[i].dataset.src);
                            }
                        }
                        if (!won) {
                            setTimeout(function () {
                                lastClickedImage.setAttribute("src", "pics/0.png");
                                e.target.setAttribute("src", "pics/0.png");
                                stopFlipping = false;
                                imagesFlipped = 0;
                            }, 1000);
                        }
                    }
                }
            });
            div.appendChild(a);
            selecteddiv.appendChild(div);
        });*/
    };
}