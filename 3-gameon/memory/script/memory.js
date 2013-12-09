"use strict";

function Memory() {
    this.memory = [];
    this.rows = 4;
    this.cols = 4;
    this.init = function () {
        this.memory = RandomGenerator.getPictureArray(this.rows, this.cols);
    };
    this.start = function () {
        var imagesFlipped = 0;
        var clickedImage = "";
        this.memory.forEach(function(element){
            var div = document.createElement("div");
            var a = document.createElement("a");
            var image = document.createElement("img");
            var that = this;
            
            a.appendChild(image);
            a.setAttribute("href", "#");
            a.setAttribute("data-src", "pics/"+element+".png");
            a.addEventListener("click", function(e){
                if(clickedImage == e.target.parentNode.dataset.src){
                    alert("Du vann!");
                }
                if(imagesFlipped < 2){
                    e.target.parentNode.childNodes[0].setAttribute("src", e.target.parentNode.dataset.src);
                    clickedImage = e.target.parentNode.dataset.src;
                    imagesFlipped+=1;
                }
            });
            
            image.setAttribute("src", "pics/"+0+".png");
            div.appendChild(a);
            document.getElementById("bestdiv").appendChild(div);
        });
    };
    this.turnImg = function(e){
    };
}