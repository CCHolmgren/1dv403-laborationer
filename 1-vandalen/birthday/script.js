"use strict";

window.onload = function(){

	
	var birthday = function(date){
		console.log(date);
		
		//Matches things on the format [0-9]*4-[0-9][1-9]-[0-9][1-9]
		//Which is what we assume the input should be like
		var re = /\d{4,4}-\d{2,2}-\d{2,2}/,
			today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
			millisecondsToDays = 24*60*60*1000,
			birthday = date.split('-'); //Split into the specific parts, assuming YYYY-MM-DD format

		if(!date.match(re))
			throw {'message':'Du måste fylla i ett giltigt datum på formatet YYYY-MM-DD!'};

		//Remove the first object since we don't care what year they were born
		birthday.splice(0,1); 

		 //Assume the birth day is this year
		var nextBirthday = new Date(new Date().getFullYear(), birthday[0]-1, birthday[1]);

		console.log("Nextbirthday: " + nextBirthday);
		console.log("Todays date: " + today);
		console.log("Comparison: " + (nextBirthday < today));

		//If today is larger than nextBirthday, then it must be because it's already happened
		if(nextBirthday < today)
			//So we add a year to it, and it should be fine.
			nextBirthday = new Date(new Date().getFullYear()+1, birthday[0]-1, birthday[1]);

		console.log("nextBirthday: " + nextBirthday);

		//Math.round will round up or down,
		//Math abs will turn the negative number we get from the subtraction(could probably just switch them though)
		//Then convert the milliseconds to days via the divison of milliseconds in days
		console.log(Math.round(Math.abs((today-nextBirthday)/millisecondsToDays)));
		return Math.round(Math.abs((today - nextBirthday)/millisecondsToDays));
		};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};