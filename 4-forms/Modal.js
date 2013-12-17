/* jshint strict: true */
/* global document, console, window */

function Modal() {
    "use strict";
    this.square = null;
    this.greyOut = null;

    this.Open = function (inputobj) {
        this.greyOut = document.createElement("div");
        this.greyOut.className = "overdiv";

        this.square = document.createElement("div");
        this.square.className = "square";
        this.square.Code = this;

        var msg = document.createElement("div");
        msg.className = "msg";

        for (var i = 0; i < Math.max(inputobj.categories.length, inputobj.values.length); i++) {
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

        var closebtn = document.createElement("button");
        closebtn.onclick = function () {
            this.parentNode.Code.Close();
        };
        closebtn.appendChild(document.createTextNode("Avbryt"));
        closebtn.className = "btn btn-default right-bottom-corner";

        var continuebtn = document.createElement("button");
        continuebtn.onclick = function () {
            document.getElementById("main-form").submit();
        };
        continuebtn.appendChild(document.createTextNode("Fortsätt med köpet"));
        continuebtn.className = "btn btn-warning right-bottom-corner";

        this.square.appendChild(continuebtn);
        this.square.appendChild(closebtn);

        document.body.appendChild(this.greyOut);
        document.body.appendChild(this.square);
    };
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