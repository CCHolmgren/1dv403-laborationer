"use strict";

window.onload = function () {
    var mem = new Memory("game1","win1" , 2, 8);
    mem.init();
    mem.start();
    var gaem = new Memory("game2","win2" , 4, 4);
    gaem.init();
    gaem.start();
};