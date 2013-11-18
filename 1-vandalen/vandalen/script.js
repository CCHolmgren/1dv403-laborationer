"use strict";

var makePerson = function(persArr){
	//Pure function
	var result = {};
	var names = Object.keys(data).map(function(key){return data[key];}).map(function(person){return person.name;}).sort(function(a,b){return (a>b)?1:-1});
	var ages = Object.keys(data).map(function(key){return data[key];}).map(function(person){return person.age;}).sort(function(a,b){return (a>b)?1:-1});
	var arr = Object.keys( persArr ).map(function ( key ) { return persArr[key]; });
	console.log(arr);
	result.minAge = ages[0];
	result.maxAge = ages[ages.length-1];
	result.averageAge = Math.round(ages.reduce(function(a,b){return a+b})/ages.length);
	result.names = names.join(", ");
	return result;
}

var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

var result = makePerson(data);

console.log(result);