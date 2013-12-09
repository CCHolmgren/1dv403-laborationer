"use strict";

function Memory() {
    this.memory = [];
    this.rows = 4;
    this.cols = 4;
    this.init = function () {
        this.memory = RandomGenerator.getPictureArray(this.rows, this.cols);
    };
    this.print = function () {
        this.memory.forEach(function(element){
            document.write(element+" ");
        })
    };
}