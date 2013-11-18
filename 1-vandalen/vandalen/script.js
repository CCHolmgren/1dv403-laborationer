"use strict";

var makePerson = function(persArr){
	//Pure function
	var result = new Object();
	console.log(JSON.stringify(persArr));
	var names = Object.keys(persArr).map(function(key){return persArr[key];}).map(function(person){return person.name;});
	console.log(names)
	names.sort(function(a,b){return (a.localeCompare(b,'sv'))?1:-1});
	var ages = Object.keys(persArr).map(function(key){return persArr[key];}).map(function(person){return person.age;}).sort(function(a,b){return (a>b)?1:-1});
	console.log(names);
	console.log(ages);
	// var arr = Object.keys( persArr ).map(function ( key ) { return persArr[key]; });
	// console.log(arr);
	result.minAge = ages[0];
	result.maxAge = ages[ages.length-1];
	result.averageAge = Math.round(ages.reduce(function(a,b){return a+b})/ages.length);
	result.names = names.join(", ");
	return result;
}