"use strict";

function Memory(div, winDiv, inputRows, inputCols) {
    var memory = [],
        rows = inputRows,
        cols = inputCols,
        numOfImages = 8,
        winnerDiv = document.getElementById(winDiv),
        selecteddiv = document.getElementById(div);

    //Init the memory array, which could be done in the start function, really.
    this.init = function () {
        memory = RandomGenerator.getPictureArray(rows, cols);
    };

    this.start = function () {
        var imagesFlipped = 0,
            clickedImage = "",
            lastClickedImage,
            stopFlipping = false,
            guesses = 0,
            won = false,
            index = 0,
            turnedImages = [],
            clickHandler = function (e) {
                //Ugly solution, but we do not want to be able to click after
                //the game is won
                if (!won && !stopFlipping) {
                    if (imagesFlipped === 0 && turnedImages.indexOf(e.currentTarget.childNodes[0]) === -1) {
                        lastClickedImage = e.currentTarget.childNodes[0];
                        imagesFlipped += 1;
                    }
                    if (imagesFlipped < 2) {
                        e.currentTarget.childNodes[0].setAttribute("src", e.currentTarget.childNodes[0].dataset.src);
                        //If the users hasn't clicked on the same image twice
                        if (lastClickedImage !== e.currentTarget.childNodes[0] && turnedImages.indexOf(e.currentTarget.childNodes[0]) === -1) {
                            imagesFlipped += 1;
                        }
                    }
                    if (imagesFlipped === 2) {
                        //stopFlipping is here so that you can't flip while you have already clicked two images
                        guesses += 1;
                        stopFlipping = true;
                        imagesFlipped = 0;
                        //if lastClickedImage isn't the same
                        //as the one we clicked now
                        //and they got the same src
                        //could be checking for the dataset.src but they are
                        //already flipped so that isn't necessary
                        if (lastClickedImage !== e.currentTarget.childNodes[0] && lastClickedImage.getAttribute("src") === e.currentTarget.childNodes[0].getAttribute("src")) {
                            turnedImages.push(lastClickedImage);
                            turnedImages.push(e.currentTarget.childNodes[0]);
                            stopFlipping = false;
                            if (turnedImages.length === rows * cols) {
                                var winnerText = document.createTextNode("Du vann. Det krävdes " + guesses + " gissningar för dig att hitta de matchande bilderna!");

                                winnerDiv.appendChild(winnerText);
                                won = true;
                            }
                        }
                        //If the game isn't won yet, flip the images after 1 second
                        if (!won && turnedImages.indexOf(lastClickedImage) === -1 && turnedImages.indexOf(e.target) === -1) {
                            setTimeout(function () {
                                lastClickedImage.setAttribute("src", "pics/0.png");
                                e.target.setAttribute("src", "pics/0.png");
                                stopFlipping = false;
                                imagesFlipped = 0;
                            }, 1000);
                        }
                    }
                }
                console.log(guesses);
                console.log(imagesFlipped);
            };
        var keyHandler = function (e) {
            //Ugly solution, but we do not want to be able to click after
            //the game is won
            if (!won) {
                if (imagesFlipped === 0 && !stopFlipping) {
                    lastClickedImage = e.currentTarget.childNodes[0];
                    imagesFlipped += 1;
                    guesses += 1;
                }
                if (imagesFlipped < 2 && !stopFlipping) {
                    e.currentTarget.childNodes[0].setAttribute("src", e.currentTarget.childNodes[0].dataset.src);
                    //If the users hasn't clicked on the same image twice
                    if (lastClickedImage !== e.currentTarget.childNodes[0]) {
                        imagesFlipped += 1;
                        guesses += 1;
                    }   
                }
                if (imagesFlipped === 2 && !stopFlipping) {
                    //stopFlipping is here so that you can't flip while you have already clicked two images
                    stopFlipping = true;
                    imagesFlipped = 0;
                    //if lastClickedImage isn't the same
                    //as the one we clicked now
                    //and they got the same src
                    //could be checking for the dataset.src but they are
                    //already flipped so that isn't necessary
                    if (lastClickedImage !== e.currentTarget.childNodes[0] && lastClickedImage.getAttribute("src") === e.currentTarget.childNodes[0].getAttribute("src")) {
                        turnedImages.push(lastClickedImage);
                        turnedImages.push(e.currentTarget.childNodes[0]);
                        stopFlipping = false;

                        if (turnedImages.length === rows * cols) {
                            var winnerText = document.createTextNode("Du vann. Det krävdes " + guesses + " gissningar för dig att hitta de matchande bilderna!");

                            winnerDiv.appendChild(winnerText);
                            won = true;
                        }
                    }
                    //If the game isn't won yet, flip the images after 1 second
                    if (!won && turnedImages.indexOf(lastClickedImage) === -1 && turnedImages.indexOf(e.target) === -1) {
                        setTimeout(function () {
                            lastClickedImage.setAttribute("src", "pics/0.png");
                            console.log(e);
                            e.target.childNodes[0].setAttribute("src", "pics/0.png");
                            stopFlipping = false;
                            imagesFlipped = 0;
                        }, 1000);
                    }
                }
            }
        };
        //Since we want rows we got to do it this way with nested for loops
        for (var i = 0; i < rows; i++) {
            var div = document.createElement("div");

            for (var j = 0; j < cols; j++) {
                var a = document.createElement("a");
                var image = document.createElement("img");
                var that = this;

                //We use the data-src to hold the src to the image until the image is clicked
                image.setAttribute("data-src", "pics/" + ((memory[index] % numOfImages) + 1) + ".png");
                //pics/0.png is the default image
                image.setAttribute("src", "pics/0.png");
                //This is to avoid w3c validator to complain
                image.setAttribute("alt", "");

                a.appendChild(image);
                //For anchors to be clickable they got to have a href
                a.setAttribute("href", "#");
                //Define a onclick event which will handle everything mostly
                a.addEventListener("click", clickHandler);
                a.addEventListener("keypress", keyHandler);

                div.appendChild(a);
                div.className = "images";
                index += 1;
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