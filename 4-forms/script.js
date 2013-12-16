/* jshint strict: true */
/* global document, console, window */
function Validator() {
    "use strict";
    this.elements = document.querySelectorAll("input[type=text]");
    this.nonempty = document.getElementsByClassName("non-empty");
    this.postcode = document.getElementsByClassName("postcode");
    this.email = document.getElementsByClassName("validemail");
    this.button = document.getElementById("submit");
    this.form = document.getElementById("main-form");

    var that = this;
    for (var i = 0; i < this.nonempty.length; i++) {
        this.nonempty[i].addEventListener("change", function (e) {
            console.log(e);
            if (that.validateNonEmpty(e.target)) {
                e.target.parentNode.className = e.target.parentNode.dataset.class + " has-success";
            } else {
                e.target.parentNode.className = e.target.parentNode.dataset.class + " has-error";
            }

        });
    }
    for (i = 0; i < this.nonempty.length; i++) {
        this.nonempty[i].addEventListener("blur", function (e) {
            console.log(e);
            if (that.validateNonEmpty(e.target)) {
                e.target.parentNode.className = e.target.parentNode.dataset.class + " has-success";
            } else {
                e.target.parentNode.className = e.target.parentNode.dataset.class + " has-error";
            }

        });
    }
    for (i = 0; i < this.postcode.length; i++) {
        this.postcode[i].addEventListener("change", function (e) {
            console.log(e);
            if (that.validateSwePostCode(e.target)) {
                e.target.parentNode.className = e.target.parentNode.dataset.class + " has-success";
            } else {
                e.target.parentNode.className = e.target.parentNode.dataset.class + " has-error";
            }
        });
    }
    for (i = 0; i < this.postcode.length; i++) {
        this.postcode[i].addEventListener("blur", function (e) {
            if (that.validateSwePostCode(e.target)) {
                e.target.parentNode.className = e.target.parentNode.dataset.class + " has-success";
                e.target.value = that.validPostCode(e.target);
            } else {
                e.target.parentNode.className = e.target.parentNode.dataset.class + " has-error";
            }
        });
    }
    for (i = 0; i < this.email.length; i++) {
        this.email[i].addEventListener("change", function (e) {
            console.log(e);
            if (that.validateEmail(e.target)) {
                e.target.parentNode.className = e.target.parentNode.dataset.class + " has-success";
            } else {
                e.target.parentNode.className = e.target.parentNode.dataset.class + " has-success";
            }
        });
    }
    this.button.addEventListener("click", function (e) {
        e.preventDefault();
        var modal = new Modal(),
            labels = document.querySelectorAll("label"),
            modalInformation = {};
        modalInformation.categories = [];
        modalInformation.values = [];
        for(var i = 0; i < labels.length; i++){
            modalInformation.categories.push(labels[i].value);
        }
    });
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
}

function Modal() {
    "use strict";
    this.square = null;
    this.greyOut = null;

    this.Open = function (textobj) {
        this.greyOut = document.createElement("div");
        this.greyOut.className = "overdiv";

        this.square = document.createElement("div");
        this.square.className = "square";
        this.square.Code = this;
        
        var msg = document.createElement("div");
        msg.className = "msg";
        
        this.square.appendChild(msg);
        var closebtn = document.createElement("button");
        closebtn.onclick = function () {
            this.parentNode.Code.Close();
        };
        closebtn.innerHTML = "Avbryt";
        closebtn.className = "btn btn-default";
        
        var continuebtn = document.createElement("button");
        continuebtn.onclick = function() {
            document.getElementById("main-form").submit();
        };
        continuebtn.innerHTML = "Fortsätt med köpet";
        continuebtn.className = "btn btn-primary";
        
        this.square.appendChild(closebtn);
        this.square.appendChild(continuebtn);

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