"use strict";

function Memory(){
    this.memory = [];
    this.rows =  5;
    this.cols =  5;
    this.init = function(){
        this.memory = RandomGenerator.getPictureArray(this.rows, this.cols);
    };
    this.print = function(){
        console.log(this.memory);
    };
}