//ITEM 1: Know which Javascript you are using

// Function form of use strict

function f(x) {
	"use strict";
}

//Concatenating files with use strict

//file1.js
"use strict";
function f() {

}

//file2.js
//( no strict mode-directive)
function f() {
	var arguments = [];
}


// Immediately invoked function expressions (IIFE's)

(function() {
	"use strict";
	function f() {
	}
})();

(function() {
	//separate scope
	//no strict-mode directive
	function f() {
		var arguments = [];
	}
})();


//ITEM 2: Understand Javascript's Floating-Point Numbers

// Base 2
(8).toString(2); // "1000"
(555).toString(2); // "1000101011"

// Converstion
parseInt("1001", 2); // 9

// Floating point inaccuracies
0.1 + 0.2; // 0.30000000000000004
(0.1 + 0.2) + 0.3; // 0.6000000000000001
0.1 + (0.2 + 0.3); // 0.6

// Rounded to integers
(10 + 20) + 30; // 60
10 + (20 + 30); // 60


//ITEM 3: Beware of implicit conversions

// Arithmetic operators and mixing types
1 + 2 + "3"; // "33"
"17" * 3 // 51
var x = NaN;
x === NaN; // false
isNaN(NaN); // true

// Testing NaN
var a = NaN;
a !== a; // true
var b = "foo";
b !== b; // false

var x = {};
function isReallyNaN(x) {
return x !== x;
}

// Objects coerced to primitives
JSON.toString(); // "[object JSON]"

// Type conversion using toString and valueOf
"J" + { toString: function() { return "S"; } }; // "JS"
2 * { valueOf: function() { return 3; } }; // 6

// Resolving ambiguity by choosing valueOf over toString
var obj = {
	toString: function() {
		return "[object MyObject]";
	},
	valueOf: function() {
		return 17;
	}
};
"object: " + obj; // "object: 17"

// Truthy values
// if, ||, &&, values are interpreted as boolean according to simple implicit conversion

// Seven falsy values
// false, 0, -0, "", NaN, null, undefined

//Not always safe to use truthiness to check if a property is defined

//ignores falsy
function point(x, y) {
	if (!x) {
		x = 320;
	}
	if (!y) {
		y = 240;
	}
	return { x: x, y: y };
}
 //sees falsy
 // 0 is read here!
 function point(x, y) {
	 if (typeof x === "undefined") {
		 x = 320;
	 }
	 if (typeof y === "undefined") {
		 y = 240;
	 }
	 return { x: x, y: y };
 }


// ITEM 4: Prefer Primitives to Object Wrappers

// 5 types of primitive values
// booleans, numbers, strings, null, undefined

 // String object wrapping string value
 var s = new String("hello");
 s + "world"; // "hello world"

// Unable to compare two distinct string objects
 typeof "hello"; // "string"
 typeof s; // object
 var s1 = new String("hello");
 var s2 = new String("hello");
 s1 === s2; // false

// ITEM 5: Avoid using ==  with Mixed Types

// Strict equality conversion
var today = new Date();
if (+form.month.value === (today.getMonth() + 1) && // strict
+form.day.value === today.getDate()) { // strict
// happy birthday!
// ...
}

// Comparing strings to dates
var date = new Date("1999/12/31");
date == "1999/12/31"; // false
date.toString(); // "Fri Dec 31 1999 00:00:00 GMT+0000 (GMT Standard Time)"

function toYMD(date) {
var y = date.getYear() + 1900, // year is 1900-indexed
m = date.getMonth() + 1, // month is 0-indexed
d = date.getDate();
return y
+ "/" + (m < 10 ? "0" + m : m)
+ "/" + (d < 10 ? "0" + d : d);
}
toYMD(date) === "1999/12/31"; // true


// ITEM 6: Learn the Limit of Semicolon Insertion

// Automatic insertion example

function Point(x, y) {
	this.x = x || 0
	this.y = y || 0
}

Point.prototype.isOrigin = function() {
	return this.x === 0 && this.y === 0
}

// RULE 1: Semicolons are only ever inserted before a } token, after one or more
//newlines, or at the end of the program input.
// RULE 2: Semicolons are only ever inserted when the next input token cannot be
// parsed.
// RULE 3: Semicolons are never inserted as separators in the head of a for loop or
// as empty statements.

// Illegal use

function area(r) {r = +r return Math.PI * r * r } // error (required after +r)

a = b["r", "g", "b"].forEach(function(key) {
background[key] = foreground[key] / 2;
});

var x // semicolon inferred
a = b // no semicolon inferred
(f()) // semicolon inferred

// return
// {};
// parses as three separate statements:
// return;
// {}
// ;

// Loop with empty body
function infiniteLoop() { while(true) } //parse error
function infiniteLoop() { while(true); }


//ITEM 7: Think of Strings as Sequences of 16-Bit Code Units

// JavaScript strings consist of 16-bit code units, not Unicode code points
// Unicode code points 216 and above are represented in JavaScript by two code units, known as a surrogate pair.
// Surrogate pairs throw off string element counts, affecting length, charAt, charCodeAt, and regular expression patterns such as “.”.
// Use third-party libraries for writing code point-aware string manipulation.
// Whenever you are using a library that works with strings, consult the documentation to see how it handles the full range of code points.
