/* global window, console, document, NodeList, JAWM, WindowHandler */
window.onload = function () {
    "use strict";
    NodeList.prototype.forEach = Array.prototype.forEach;

    var WindowHandler = JAWM.WindowHandler,
        lastrun = null,
        icons = document.querySelectorAll(".launchericon"),
        toolbars = document.querySelectorAll(".topbar");

    icons.forEach(function(element){
        element.addEventListener("click", WindowHandlerHandler);
    });
    function WindowHandlerHandler(event){
        WindowHandler.createWindow(event.target.parentNode.dataset.prog, null, null, 400, 400).render();
    }
};