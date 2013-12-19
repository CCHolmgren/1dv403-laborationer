/* jshint strict: true */
/* global document, console, window, NodeList, Modal */

function Validator() {
    "use strict";
    //First we select all the items that might be necessary
    //All inputs are handy to have if we need to loop through all of the sometime
    this.elements = document.querySelectorAll("input[type=text]");
    //Validation: non-empty input
    this.nonempty = document.getElementsByClassName("non-empty");
    //Validation: swedish postcode
    this.postcode = document.getElementsByClassName("postcode");
    //Validation: email
    this.email = document.getElementsByClassName("validemail");
    //Modal: so we can open the modal first
    this.button = document.getElementById("modal");
    //Form: so we can submit it with the button
    this.form = document.getElementById("main-form");
    //So that the callbacks on the eventhadlers works
    var that = this,
        i;

    //Checks if the input isn't empty, with would be ""
    //Would return true if the input is undefined
    this.validateNonEmpty = function (e) {
        console.log(e.value);
        return e.value !== "";
    };
    //Validates to a Swedish postcode based on the spec
    this.validateSwePostCode = function (e) {
        //Very large regex, but too complicated
        /*var re = /^(((SE |SE)?\d{5})|((SE |SE)?\d{3}(?: )\d{2})|((SE |SE)?\d{3}(?:-)\d{2}))$/;*/
        //This does the job just as well
        var re = /^(?:SE|SE )?(\d{5}|\d{3}(?: |-)\d{2})$/;
        //re.test checks if the input matches the re, and returns true or false
        return re.test(e.value);
    };
    //This returns a validPostcode with everything unecessary stripped
    this.validPostCode = function (e) {
        //Removes SE, - and space, as per the spec
        return e.value.replace("SE", "").replace("-", "").replace(" ", "");
    };
    //Validates if it looks like a valid email
    this.validateEmail = function (e) {
        //This is the most basic regex
        //Email shouldnät be checked with regex, but this is the best way I guess
        var re = /.+@.+/;
        return re.test(e.value);
    };
    //Handles the Validator functions, passed in with a function name
    //that is located on the this object
    //usereturn is if the return of the check should be set to e.target.value or not
    this.inputValidationHandler = function (func, usereturn) {
        //Since JavaScript allows you to pass 0->arguments.length
        //If usereturn is undefined, we assume they want to use return
        if (usereturn === "undefined") {
            usereturn = true;
        }
        //Since the addEventHandler assumes that we have a function that takes
        //an event, we must return a function that does so
        return function (e) {
            console.log(e);
            //This could probably solved in some easier way, but it works
            if (usereturn) {
                //If the passed function returns true, set the parentNode to has-success so that we get the visual representation
                if (that[func](e.target)) {
                    e.target.parentNode.className = e.target.parentNode.dataset.class + " has-success";
                    //And then change the value
                    e.target.value = that[func](e.target);
                } else {
                    //Otherwise it failed, which means we set the className to has-error
                    e.target.parentNode.className = e.target.parentNode.dataset.class + " has-error";
                }
            } else {
                if (that[func](e.target)) {
                    e.target.parentNode.className = e.target.parentNode.dataset.class + " has-success";
                } else {
                    e.target.parentNode.className = e.target.parentNode.dataset.class + " has-error";
                }
            }
        };
    };

    //Loop through the nonempty list of objects, and add the eventHandlers
    //This could be just blur and not change, but it doesn't really matter that much
    for (i = 0; i < this.nonempty.length; i++) {
        this.nonempty[i].parentNode.dataset.class = this.nonempty[i].parentNode.className;
        /*this.nonempty[i].addEventListener("change", this.inputValidationHandler("validateNonEmpty", false));*/
        this.nonempty[i].addEventListener("blur", this.inputValidationHandler("validateNonEmpty", false));
    }
    
    //Loops through the postcode inputs
    //This is a bit of a special case since we need two functions to validate and then return a valid postcode, which means we must do it this way
    for (i = 0; i < this.postcode.length; i++) {
        //Save the className so that we can reset it if we need to
        this.postcode[i].parentNode.dataset.class = this.postcode[i].parentNode.className;
        //Since this is a special case, we pass an anonymous function that first calls validateSwePostCode and then pass e to it
        /*this.postcode[i].addEventListener("change", function (e) {
            that.inputValidationHandler("validateSwePostCode", false)(e);
            //Then we set the value to what this function returns instead of what validateSwePostCode returns, since it returns true or false
            e.target.value = that.validPostCode(e.target);
        }); // jshint ignore:line
        */
        this.postcode[i].addEventListener("blur", function (e) {
            that.inputValidationHandler("validateSwePostCode", false)(e);
            e.target.value = that.validPostCode(e.target);
        }); // jshint ignore:line
    }
    //Loop through the email inputs
    for (i = 0; i < this.email.length; i++) {
        //Save the className
        this.email[i].parentNode.dataset.class = this.email[i].parentNode.className;
        //and validate with validateEmail
        /*this.email[i].addEventListener("change", this.inputValidationHandler("validateEmail", false));*/
        this.email[i].addEventListener("blur", this.inputValidationHandler("validateEmail", false));
        //Here we could have another eventListerner for blur, but it shouldn't matter that much
    }

    //The modal button should open the modal
    this.button.addEventListener("click", function (e) {
        //We do not want to send the form yet, so prevent it from doing that
        e.preventDefault();
        //A NodeList does not have the every function, which means we just copy it from Array
        //This might not work in some browsers, but it works in Chrome, and probably FF
        NodeList.prototype.every = Array.prototype.every;
        var i,
            //If all inputs are validated, which means they got the has-success className/classList entry
            allValidated = that.elements.every(function(element){
                console.log(element);
                return element.parentNode.classList.contains("has-success");
            });
        //If they are, create the modal
        if (allValidated) {
            var modal = new Modal(),
                labels = document.getElementsByClassName("use-label"),
                inputs = document.getElementsByClassName("use-input"),
                modalInformation = {};
            //Here we must grab the information from the inputs,
            //which could probably be done in a better way, since this fails if there are less labels than inputs or vice versa
            modalInformation.categories = [];
            modalInformation.values = [];
            for (i = 0; i < labels.length; i++) {
                //Select is a special case since it wont give us the selected value that easily
                //However, this is easily fixed with this ugly code
                if (inputs[i].nodeName === "SELECT") {
                    modalInformation.values.push(inputs[i].options[inputs[i].selectedIndex].value);
                } else {
                    modalInformation.values.push(inputs[i].value);
                }
                console.log("values: " + modalInformation.values[i]);
                //This is quite ugly as well, but since labels are just taggs with a child that holds the text we just grab the firstChild, which should be the text
                modalInformation.categories.push(labels[i].firstChild);
                console.log("categories: " + modalInformation.categories[i]);
            }
            console.log(modalInformation);
            //And then we open the modal with the information that we scraped
            modal.Open(modalInformation);
        }
    });
}