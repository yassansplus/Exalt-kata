const compiled = require('../endpoint/compiled.json');
// Using this library for deep object comparison
const _ = require('lodash');
const excpectedResult = require('../results.json');

test('Json result should match', () => {
    expect(_.isEqual(compiled, excpectedResult)).toBeTruthy();
});

//Modify my result to see if it still match
test('Json result should not match', () => {
    compiled ["-MYaJYUrII35RcHQsSIBqsd"] = {"name": "Paul", "city": "Versailles", "age": 37, "job": "CTO"}
    expect(_.isEqual(compiled, excpectedResult)).toBeFalsy();
});

