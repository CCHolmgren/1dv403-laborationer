/* jshint strict: true */
/* global document, console, window */
function Validator() {
    "use strict";
    this.elements = document.querySelectorAll("input[type=text]");
    this.nonempty = document.getElementsByClassName("non-empty");
    this.postcode = document.getElementsByClassName("postcode");
    this.email = document.getElementsByClassName("validemail");
    this.button = document.getElementById("modal");
    this.form = document.getElementById("main-form");
    var that = this;

    this.validateNonEmpty = function (e) {
        console.log(e.value);
        return e.value !== "";
    };
    this.validateSwePostCode = function (e) {
        var re = /^(((SE |SE)?\d{5})|((SE |SE)?\d{3}(?: )\d{2})|((SE |SE)?\d{3}(?:-)\d{2}))$/;
        return re.test(e.value);
    };
    this.validPostCode = function (e) {
        return e.value.replace("SE", "").replace("-", "").replace(" ", "");
    };
    this.validateEmail = function (e) {
        var re = /.+@.+/;
        return re.test(e.value);
    };
    this.inputValidationHandler = function (func, usereturn) {
        if (usereturn === "undefined") {
            usereturn = true;
        }
        return function (e) {
            console.log(e);
            if (usereturn) {
                if (that[func](e.target)) {
                    e.target.parentNode.className = e.target.parentNode.dataset.class + " has-success";
                    e.target.value = that[func](e.target);
                } else {
                    e.target.parentNode.className = e.target.parentNode.dataset.class = " has-error";
                }
            } else {
                if (that[func](e.target)) {
                    e.target.parentNode.className = e.target.parentNode.dataset.class + " has-success";
                } else {
                    e.target.parentNode.className = e.target.parentNode.dataset.class = " has-error";
                }
            }
        };
    };

    for (var i = 0; i < this.nonempty.length; i++) {
        this.nonempty[i].addEventListener("change", this.inputValidationHandler("validateNonEmpty", false));
        this.nonempty[i].addEventListener("blur", this.inputValidationHandler("validateNonEmpty", false));
    }
    
    for (i = 0; i < this.postcode.length; i++) {
        this.postcode[i].addEventListener("change", function (e) {
            that.inputValidationHandler("validateSwePostCode", false)(e);
            e.target.value = that.validPostCode(e.target);
        });
        this.postcode[i].addEventListener("blur", function (e) {
            that.inputValidationHandler("validateSwePostCode", false)(e);
            e.target.value = that.validPostCode(e.target);
        });
    }
    
    for (i = 0; i < this.email.length; i++) {
        this.email[i].addEventListener("change", this.inputValidationHandler("validateEmail", false));
    }
    
    this.button.addEventListener("click", function (e) {
        e.preventDefault();
        var modal = new Modal(),
            labels = document.getElementsByClassName("use-label"),
            inputs = document.getElementsByClassName("use-input"),
            modalInformation = {};
        modalInformation.categories = [];
        modalInformation.values = [];
        for (var i = 0; i < labels.length; i++) {
            if (inputs[i].nodeName === "SELECT") {
                modalInformation.values.push(inputs[i].options[inputs[i].selectedIndex].value);
            } else {
                modalInformation.values.push(inputs[i].value);
            }
            console.log("values: " + modalInformation.values[i]);
            modalInformation.categories.push(labels[i].firstChild);
            console.log("categories: " + modalInformation.categories[i]);
        }
        console.log(modalInformation);
        modal.Open(modalInformation);
    });
}

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

window.onload = function () {
    "use strict";
    new Validator();
};