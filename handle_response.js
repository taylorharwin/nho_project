"use strict";
var process = require('./process_transactions');
var testData = require('./test_data');
console.log(process(testData));
module.exports = process;
