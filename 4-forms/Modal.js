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

        var msg = document.createElement("div"),
            header = document.createElement("h1"),
            i,
            closebtn = document.createElement("button"),
            continuebtn = document.createElement("button"),
            hr = document.createElement("hr");
        header.appendChild(document.createTextNode("Vänligen bekräfta ditt köp"));
        hr.className = "hr";
        this.square.appendChild(header);
        this.square.appendChild(hr);
        msg.className = "msg";

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

        closebtn = document.createElement("button");
        closebtn.onclick = function () {
            this.parentNode.Code.Close();
        };
        closebtn.appendChild(document.createTextNode("Avbryt"));
        closebtn.className = "btn btn-default right-bottom-corner";

        continuebtn = document.createElement("button");
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