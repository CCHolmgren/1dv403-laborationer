"use strict";

var makePerson = function (persArr) {
    var result = {},
        names = persArr.map(function (person) {
            return person.name;
        }),
        ages = persArr.map(function (person) {
            return person.age;
        }).sort(function (a, b) {
            return (a > b) ? 1 : -1
        });

    names.sort(function (a, b) {
        return a.localeCompare(b, 'sv');
    });
    result.minAge = ages[0];
    result.maxAge = ages[ages.length - 1];
    result.averageAge = Math.round(ages.reduce(function (a, b) {
        return a + b;
    }) / ages.length);
    result.names = names.join(", ");

    return result;
}