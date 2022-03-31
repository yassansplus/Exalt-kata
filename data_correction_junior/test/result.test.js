// In case compiled do not exist please create it or execute node index.js at the root of  this kata
const compiled = require('../endpoint/compiled.json');
// Using this library for deep object comparison
const _ = require('lodash');
const excpectedResult = require('../results.json');

test('Json result should match', () => {
    expect(_.isEqual(compiled, excpectedResult)).toBeTruthy();
});

//Modify my result to see if it still match
test('Json result should not match', () => {
    compiled ["-MYaJYUrII35RcHQsSIBqsd"] = {
        "name": "Yass au chapeau de paille",
        "city": "Raftel",
        "age": 24,
        "job": "CTOrNot"
    };
    expect(_.isEqual(compiled, excpectedResult)).toBeFalsy();
});

