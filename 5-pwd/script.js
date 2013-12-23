/* global window, console, document, NodeList, JAWM, WindowHandler */
window.onload = function () {
    "use strict";
    var WindowHandler = JAWM.WindowHandler;
    for(var i = 0; i < 10; i++){
        var x = WindowHandler.createWindow("Window");
        x.setSize(300, 300);
        x.render();
    }

    function drag_start(event) {
        var style = window.getComputedStyle(event.target, null);
        console.log("style: ", style);
        console.log(style.getPropertyValue("left"));
        event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY) + ',' + event.target.id);
        
        console.log("drag_start: ", event);
    }

    function drop(event) {
        console.log("drop: ",event);
        var offset = event.dataTransfer.getData("text/plain").split(',');
        console.log(offset);
        var dm = WindowHandler.getWindow(offset[2]);
        console.log(dm);
        dm.move(event.clientX + parseInt(offset[0], 10), event.clientY + parseInt(offset[1], 10));
        //dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
        //dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
        event.preventDefault();
        return false;
    }

    function drag_over(event) {
        console.log("drag_over: ", event);
        event.preventDefault();
        return false;
    }
    NodeList.prototype.forEach = Array.prototype.forEach;
    
    var dm = document.getElementsByClassName('icon');
    var bottombar = document.getElementById("bottombar");
    
    dm.forEach(function(element){
        element.ondragstart = drag_start;
        element.onmouseup = function(e){
            console.log("onmouseup, yeah");
        };
    });
    bottombar.ondragover = drag_over;
    bottombar.ondrop = drop;
};