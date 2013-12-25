JAWM.ImageViewer = function ImageViewer(){
    console.log("hello");
};
console.log(JAWM.ImageViewer);

console.log(JAWM.Window);
JAWM.ImageViewer.prototype = JAWM.Window.prototype;

JAWM.ImageViewer.prototype.constructor = JAWM.ImageViewer;