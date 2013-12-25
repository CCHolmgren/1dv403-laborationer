/* global window, console, document, NodeList, JAWM, WindowHandler */
window.onload = function () {
    "use strict";
    NodeList.prototype.forEach = Array.prototype.forEach;

    var WindowHandler = JAWM.WindowHandler,
        lastrun = null,
        icons = document.querySelectorAll(".launchericon"),
        toolbars = document.querySelectorAll(".topbar");

    for (var i = 0; i < 10; i++) {
        var x = WindowHandler.createWindow("Window");
        x.render();
        x.setSize(300, 300);
        //JAWM.dragDrop.initElement(x.getTopbar());
    }
    for(var j = 0; j < 5; j++){
        var y = WindowHandler.createWindow("ImageViewer");
        y.render();
        y.setSize(200, 500);
    }

    /*icons.forEach(function (element) {
        console.log("element.dataset.prog", element.dataset.prog);
        var x = WindowHandler.createWindow("ImageViewer");
        x.setSize(300, 300);
        x.render();
    });*/
    icons.forEach(function(element){
        element.addEventListener("click", WindowHandlerHandler);
    });
    function WindowHandlerHandler(event){
        WindowHandler.createWindow(event.target.dataset.prog).render().setSize(300, 300);
    }
    /*var windows = document.querySelectorAll('.icon');
    [].forEach.call(windows, function (win) {

        // …find the title bar inside it and do something onmousedown
        var title = win.querySelector('.topbar');
        title.addEventListener('mousedown', function (evt) {
            console.log("hello from mousedown");

            // Record where the window started
            var real = window.getComputedStyle(win),
                winX = parseFloat(real.left),
                winY = parseFloat(real.top);

            // Record where the mouse started
            var mX = evt.clientX,
                mY = evt.clientY;

            // When moving anywhere on the page, drag the window
            // …until the mouse button comes up
            //document.body.addEventListener('mousemove', drag, false);
            

            // Every time the mouse moves, we do the following 
            function drag(evt) {
                console.log("hello from drag");
                // Add difference between where the mouse is now
                // versus where it was last to the original positions
                win.style.left = winX + evt.clientX - mX + 'px';
                win.style.top = winY + evt.clientY - mY + 'px';
            }
        }, false);
    });*/
    /*document.body.addEventListener('mouseup', function (evt) {
                console.log("hello from mouseup");
                win.style.left = winX + evt.clientX - mX + 'px';
                win.style.top = winY + evt.clientY - mY + 'px';
                //document.body.removeEventListener('mousemove', drag, false);
            }, false);*/


    /*function drag_start(event) {
        //var crt = this.cloneNode(true);
        //document.body.appendChild(crt);
        //event.dataTransfer.setDragImage(crt, 0, 0);
        console.log("drag_start: ", event);
        var target = event.target.parentNode;
        //target.setAttribute("draggable", "false");
        var style = window.getComputedStyle(target, null);
        console.log("style: ", style);
        //console.log(style.getPropertyValue("left"));
        event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY) + ',' + target.id);
        WindowHandler.setzIndex(target.id, WindowHandler.maxzindex + 1);
    }*/

    /*function drop(event) {
        console.log("drop: ", event);
        var offset = event.dataTransfer.getData("text/plain").split(',');
        console.log(offset);
        var dm = WindowHandler.getWindow(offset[2]);
        console.log(dm);
        dm.move(event.clientX + parseInt(offset[0], 10), event.clientY + parseInt(offset[1], 10));
        //dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
        //dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
        event.preventDefault();
        //return false;
    }*/

    /*function dragover(event) {
        //console.log("dragover: ", event);
        if(lastrun === null || new Date().getTime() - lastrun > 300){
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
    }*/
    /*NodeList.prototype.forEach = Array.prototype.forEach;

    var dm = document.getElementsByClassName('topbar');
    var bottombar = document.getElementById("desktop");

    dm.forEach(function (element) {
        element.addEventListener("dragstart", drag_start, false);
        element.onmouseup = function(e){
            console.log("onmouseup, yeah");
        };
    });
    bottombar.addEventListener("dragover", dragover, false);
    bottombar.addEventListener("drop", drop, false);*/

};