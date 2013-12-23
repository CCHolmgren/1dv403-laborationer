/* global window, console, document, NodeList, JAWM */
window.onload = function () {
    "use strict";
    for(var i = 0; i < 10; i++){
        var x = new JAWM.Window();
        x.render();
    }

    function drag_start(event) {
        var style = window.getComputedStyle(event.target, null);
        console.log("style: ", style);
        console.log(style.getPropertyValue("left"));
        event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY) + ',' + event.target.id);
        
        console.log("drag_start: ",event);
    }

    function drop(event) {
        console.log("drop: ",event);
        var offset = event.dataTransfer.getData("text/plain").split(',');
        console.log(offset);
        var dm = document.getElementById(offset[2]);
        console.log(dm);
        dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
        dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
        event.preventDefault();
        return false;
    }

    function drag_over(event) {
        console.log("drag_over: ",event);
        event.preventDefault();
        return false;
    }
    NodeList.prototype.forEach = Array.prototype.forEach;
    
    var dm = document.getElementsByClassName('icon');
    var bottombar = document.getElementById("bottombar");
    
    dm.forEach(function(element){
        element.ondragstart = drag_start;
    });
    bottombar.ondragover = drag_over;
    bottombar.ondrop = drop;
};