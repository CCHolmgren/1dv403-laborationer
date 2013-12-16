/* jshint strict: true */
/* global document, console */
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
                e.target.parentNode.className += " has-success";
            } else {
                e.target.parentNode.className += " has-warning";
            }

        });
    }
    for (i = 0; i < this.postcode.length; i++) {
        this.postcode[i].addEventListener("change", function (e) {
            console.log(e);
            if (that.validateSwePostCode(e.target)) {
                e.target.parentNode.className += " has-success";
            } else {
                e.target.parentNode.className += " has-error";
            }
        });
    }
    for(i = 0; i < this.email.length; i++){
        this.email[i].addEventListener("change", function(e){
            console.log(e);
            if(that.validateEmail(e.target)){
                e.target.parentNode.className += " has-success";
            }
            else{
                e.target.parentNode.className += " has-error";
            }
        });
    }
    this.validateNonEmpty = function (e) {
        return e.value != String.empty;
    };
    this.validateSwePostCode = function (e) {
        var re = /\d{5}/;
        return re.test(e.value);
    };
    this.validateEmail = function(e){
        var re = /.*@.*/;
        return re.test(e.value);
    };
}