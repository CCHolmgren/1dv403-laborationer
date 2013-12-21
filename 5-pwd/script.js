/* global window */
window.onload = function (){
    "use strict";
    var testWindow = new window.JAWM.Window();
    testWindow.setSize(100, 100);
    testWindow.printSize();
    testWindow.render();
};