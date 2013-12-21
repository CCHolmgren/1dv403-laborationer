/* global window, console, document */
window.onload = function () {
    "use strict";
    var testWindow = new window.JAWM.Window();
    testWindow.setSize(100, 100);
    testWindow.printSize();
    testWindow.render();

    function drag_start(event) {
        var style = window.getComputedStyle(event.target, null);
        console.log("style: ", style);
        event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
        
        console.log("drag_start: ",event);
    }

    function drop(event) {
        console.log("drop: ",event);
        var offset = event.dataTransfer.getData("text/plain").split(',');
        var dm = document.getElementById('imgviewer');
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
    var dm = document.getElementById('imgviewer');
    dm.addEventListener('dragstart', drag_start, false);
    document.body.addEventListener('dragover', drag_over, false);
    document.body.addEventListener('drop', drop, false);
};