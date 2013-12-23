/* global window, console, document, NodeList, JAWM, WindowHandler */
window.onload = function () {
    "use strict";
    var WindowHandler = JAWM.WindowHandler,
        lastrun = null;
    for(var i = 0; i < 10; i++){
        var x = WindowHandler.createWindow("Window");
        x.setSize(300, 300);
        x.render();
    }

    function drag_start(event) {
        var target = event.target.parentNode;
        var style = window.getComputedStyle(target, null);
        console.log("style: ", style);
        console.log(style.getPropertyValue("left"));
        event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY) + ',' + event.target.parentNode.id);
        
        console.log("drag_start: ", event);
        WindowHandler.setzIndex(target.id, WindowHandler.maxzindex+1);
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
        //return false;
    }

    function dragover(event) {
        //console.log("dragover: ", event);
        if(lastrun == null || new Date().getTime() - lastrun > 300){
            console.log("executed");
            lastrun = new Date().getTime();
            var dm = WindowHandler.getWindow(event.dataTransfer.getData("text/plain")[2]);
            dm.move(event.clientX+dm.getWindow().style.left, event.clientY+dm.getWindow().style.top);
        }
        //console.log(event.dataTransfer.getData("text/plain"));
        
        //console.log(dm);
        //console.log("drag_over: ", event);
        //var target = event.target.parentNode;
        //var style = window.getComputedStyle(target, null);
        //var offset = event.dataTransfer.getData("text/plain").split(',');
        //var dm = WindowHandler.getWindow(offset[2]);
        //console.log(dm);
        //console.log(event);
        //dm.move(event.clientX+dm.window().style.left, event.clientY+dm.window().style.top);
        event.preventDefault();
        //return false;
    }
    NodeList.prototype.forEach = Array.prototype.forEach;
    
    var dm = document.getElementsByClassName('topbar');
    var bottombar = document.getElementById("desktop");
    
    dm.forEach(function(element){
        element.addEventListener("dragstart", drag_start, false);
        /*element.onmouseup = function(e){
            console.log("onmouseup, yeah");
        };*/
    });
    bottombar.addEventListener("dragover", dragover, false);
    bottombar.addEventListener("drop",drop, false);
};