// CHAPTER 2: Variable Scope

// ITEM 8: Minimise use of the Global object

// Declare variables locally not globally

function averageScore(player) {
	var i, n, sum;
	sum = 0;
	for (i = 0, n = players.length; i < n; i++) {
		sum += score(players[i]);
	}
	return sum / n;
}

function score(player) {
	var i, n, sum;
	sum = 0;
	for (i = 0; n = player.levels.length; i < n; i++) {
		sum += player.levels[i].score;
	}
	return sum;
}

// Test for global JSON object

if (!this.JSON) {
	this.JSON = {
		parse: "chris",
		stringify: "robert"
	};
}


// ITEM 9: Always declare local variables

function swap(a, i, j) {
	temp = a[i]; // global
	var temp = a[i]; //local
}


// ITEM 10: Avoid 'with'

 // with search continues outside of local scope!


// ITEM 11: Get comfortable with Closures

function makeSandwich() {
	var magicIngredient = "peanut butter";
	function make(filling) {
		return magicIngredient + " and " +  filling;
	}
	return make;
}
var f = makeSandwich();
f("jelly"); // "peanut butter and jelly"

// More general purpose
function sandwichMaker(magicIngredient) {
	function make(filling) {
		return magicIngredient + " and " + filling;
	}
	return make;
}
var hamAnd = sandwichMaker("ham");
hamAnd("cheese"); // "ham and cheese";
hamAnd("mustard"); // "ham and mustard";
var turkeyAnd = sandwichMaker("turkey");
turkeyAnd("Swiss"); // "turkey and Swiss";
turkeyAnd("Provolone"); // "turkey and Provolone"

// Literal syntax
function sandwichMaker(magicIngredient) {
	return function(filling) {
		return magicIngredient + " and " + filling;
	};
}

// Updating values of outer variables
function box() {
	var val = undefined;
	return {
		set: function(newVal) { val = newVal; },
		get: function() { return val; },
		type: function() { return typeof val; }
	};
}
var b = box;
b.type();
b.set(98.6);
b.get();
b.type();


// ITEM 12: Understand Variable Hoisting

function trimSections(header, body, footer) {
	var i, n;
	for (i = 0, n = header.length; i < n; i++) {
		header[i] = header[i].trim();
	}
	for (i = 0, n = body.length; i < n; i++) {
		body[i] = body[i].trim();
	}
	for (i = 0, n = footer.length; i < n; i++) {
		footer[i] = footer[i].trim();
	}
}

// Exception to variable hoisting in local scope

function test() {
	var x = "var", result = [];
	result.push(x);
	try {
		throw "exception";
	} catch (x) {
		x = "catch";
	}
	result.push(x);
	return result;
}
test();

// ITEM 13: Use Immediately Invoked Function Expressions to Create Local Scopes

function wrapElements(a) {
	var result = [], i, n;
	for (i = 0, a.length; i < n; i++) {
		result[i] = function() { return a[i]; };
	}
	return result;
}

function wrapElements(a) {
	var result = [];
	for (var i = 0, n = a.length; i < n; i++) {
		(function() {
		var j = i;
		result[i] = function() { return a[j]; };
		})();
	}
	return result;
}


// ITEM 14: Beware of unportable scoping of named function expressions


var constructor = function() { return null; }; var f = function() {
return constructor(); };
f(); // {} (in nonconformant environments)

// nonstandard behaviour of ES3 hoisting
var f = function g() { return 17; }; var g = null;

// avoid named function expressions

// ITEM 25: Beware of Unportable Scoping of Block-Local Function Declarations

// nesting a function declaration at the top of another function
function f() { return "global"; }
function test(x) {
	function f() { return "local"; }
	var result = [];
	if (x) {
		result.push(f());
	}
	result.push(f());
	return result;
}
test(true); // ["local", "local"]
test(false); // ["local"]

// avoid putting function declarations in local blocks ior substatements
function f() { return "global"; }

function test(x) {
	var g = f, result = [];
	if (x) {
		g = function() { return "local"; }
		result.push(g());
	}
	result.push(g());
	return result;
}

// Avoid creating local variables with eval

// run eval in an implicitly nested scope
var y = "global";
function test(src) {
	(function() { eval(src); })();
	return y;
}

test("var y = 'local';"); // "global" test("var z = 'local';"); // "global"

// ITEM 17: Prefer indirect eval to Direct eval

// eval has access to full scope at the point which it is called


var x = "global";
function test() {
	var x = "local";
	var f = eval;
	return f("x"); // indirect eval
}
test(); // "global"
