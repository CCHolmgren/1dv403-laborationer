/* jshint strict: true */
/* global document, console, window */

//Modal class/function
//Copied and changed from internet, which means that it's not as I might have written it
function Modal() {
    "use strict";
    //This will represent the window with the information on
    this.square = null;
    //This is the grey box that hinders us from clicking on the form
    //Wonder if tabbing still works though..?
    this.greyOut = null;

    //Opens the modal with the information we have given it
    this.Open = function (inputobj) {
        //The greyout is just a div that has transparency via the class
        this.greyOut = document.createElement("div");
        this.greyOut.className = "overdiv";

        this.square = document.createElement("div");
        this.square.className = "square";
        //Works the same way as var that = this would
        this.square.Code = this;

        //All elements we will need, or not really
        //All elements we will need for now
        var msg = document.createElement("div"),
            header = document.createElement("h1"),
            i,
            closebtn = document.createElement("button"),
            continuebtn = document.createElement("button"),
            hr = document.createElement("hr"),
            buttonDiv = document.createElement("div");
        
        msg.className = "msg";
        buttonDiv.className = "buttonDiv";
        header.appendChild(document.createTextNode("Vänligen bekräfta ditt köp"));
        header.className = "squareheader";
        hr.className = "hr";
        
        this.square.appendChild(header);
        this.square.appendChild(hr);
        

        //Math.max(categories.length, values.length) just gives the longes
        //Might want to do it some other way
        //Maybe with a dubble iteration
        //However, the spec doesn't say that it should handle that type of case
        for (i = 0; i < Math.max(inputobj.categories.length, inputobj.values.length); i++) {
            var div = document.createElement("div"),
                categoryText = document.createTextNode(inputobj.categories[i].data),
                categorySpan = document.createElement("span"),
                valueText = document.createTextNode(inputobj.values[i]),
                valueSpan = document.createElement("span");

            categorySpan.appendChild(categoryText);
            categorySpan.className = "col-sm-2 control-label bold";

            valueSpan.appendChild(valueText);

            div.appendChild(categorySpan);
            div.appendChild(valueSpan);
            msg.appendChild(div);
        }
        this.square.appendChild(msg);

        //On click on the close button, we must call the code of the square div, which is 2 levels up from the button,
        //Is there a better way to do this than hardcoding the level?
        closebtn.onclick = function () {
            this.parentNode.parentNode.Code.Close();
        };

        closebtn.appendChild(document.createTextNode("Avbryt"));
        closebtn.className = "btn btn-default right-bottom-corner";

        //To submit a form, just select it and call the submit function on it
        continuebtn.onclick = function () {
            document.getElementById("main-form").submit();
        };
        
        continuebtn.appendChild(document.createTextNode("Fortsätt med köpet"));
        continuebtn.className = "btn btn-warning right-bottom-corner";

        buttonDiv.appendChild(continuebtn);
        buttonDiv.appendChild(closebtn);

        this.square.appendChild(buttonDiv);
        document.body.appendChild(this.greyOut);
        document.body.appendChild(this.square);
    };
    //Closing the modal is as easy as just removing the modal window and the greying out box
    this.Close = function () {
        if (this.square !== null) {
            document.body.removeChild(this.square);
            this.square = null;
        }
        if (this.greyOut !== null) {
            document.body.removeChild(this.greyOut);
            this.greyOut = null;
        }

    };
}