/* Handles the windows
   Will later probably handle
   Creation and destruction of windows
   And so forth*/

function WindowHandler(){
    this.createWindow = function(){
        var x = new JAWM.Window();
        return x;
    };
}