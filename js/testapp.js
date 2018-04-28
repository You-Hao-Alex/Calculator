const assert = require('assert');
const AddSub = require('./app');
const MulDiv = require('./app');
const Pow = require('./app');
const Sqrt = require('./app');

AddSub("3", "+", "2");
assert.strictEqual(segment(0), "5");

AddSub("3", "-", "2");
assert.strictEqual(segment(0), "1");

MulDiv("3", "*", "2");
assert.strictEqual(segment(0), "6");

MulDiv("6", "/", "2");
assert.strictEqual(segment(0), "3");

Pow("6", "^", "2");
assert.strictEqual(segment(0), "36");

Pow("√", "9");
assert.strictEqual(segment(0), "3");