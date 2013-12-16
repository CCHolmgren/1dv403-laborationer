/* jshint strict: true */
/* global document, console, window */
function Validator() {
    "use strict";
    this.elements = document.querySelectorAll("input[type=text]");
    this.nonempty = document.getElementsByClassName("non-empty");
    this.postcode = document.getElementsByClassName("postcode");
    this.email = document.getElementsByClassName("validemail");
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
    for(i = 0; i < this.postcode.length; i++){
     this.postcode[i].addEventListener("blur", function(e){
         if (that.validateSwePostCode(e.target)) {
                e.target.parentNode.className = e.target.parentNode.dataset.class + " has-success";
             e.target.value = that.validPostCode(e.target);
            } else {
                e.target.parentNode.className = e.target.parentNode.dataset.class + " has-error";
            }
     });
    }
    for(i = 0; i < this.email.length; i++){
        this.email[i].addEventListener("change", function(e){
            console.log(e);
            if(that.validateEmail(e.target)){
                e.target.parentNode.className = e.target.parentNode.dataset.class + " has-success";
            }
            else{
                e.target.parentNode.className = e.target.parentNode.dataset.class + " has-success";
            }
        });
    }
    this.validateNonEmpty = function (e) {
        console.log(e.value);
        return e.value !== "";
    };
    this.validateSwePostCode = function (e) {
        var re = /^(((SE |SE)?\d{5})|((SE |SE)?\d{3}(?: )\d{2})|((SE |SE)?\d{3}(?:-)\d{2}))$/;
        return re.test(e.value);
    };
    this.validPostCode = function(e){
        return e.value.replace("SE", "").replace("-", "").replace(" ", "");
    };
    this.validateEmail = function(e){
        var re = /.+@.+/;
        return re.test(e.value);
    };
}

window.onload = function(){
    "use strict";
    new Validator();
};