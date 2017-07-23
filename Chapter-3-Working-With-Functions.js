// CHAPTER 3: Working with Functions

// Item 18: Understand the difference between Function, Method and Constructor calls
function hello(username) {
  return "hello, " + username;
}
hello("Keyser Soze"); // "hello, Keyser Soze"


// Methods are nothing more than object properties that happen to be functions
var obj = {
  hello: function(){
    return "hello, " + this.username;
  },
  username: "Hans Gruber"
};
obj.hello(); // "hello, Hans Gruber"

var obj2 = {
  hello: obj.hello,
  username: "Boo Radley"
};
obj2.hello(); // "hello, Boo Radley"

function hello() {
  return "hello, " + this.username;
}

var obj1 = {
  hello: hello,
  username: "Gordon Gekko"
};
obj1.hello();

var obj2 = {
  hello: hello,
  username: "Biff Tannen"
};
obj.hello(); // "hello, Biff Tannen"

// ES5's strict mode changes default binding of global this to undefined

function hello() {
  "use strict";
  return "hello, " + this.username;
}
hello(); // error: cannot read property "username" of undefined

// constructor patterns
function User(name, passwordHash) {
  this.name = name;
  this.passwordHash = passwordHash;
}
var u = new User("sfalken", "0ef33ae791068ec64b502d6cb0191387");
u.name; // "sfalken"


// Item 19: Get comfortable using higher-order Functions

var aIndex = "a".charCodeAt(0); // 97
var alphabet = "";
for (var i = 0; i < 26; i++) {
    alphabet += String.fromCharCode(aIndex + i);
}
alphabet; // "abcdefghijklmnopqrstuvwxyz"

// utility function for Concatenating

function buildString(n, callback) {
  var result = "";
  for (var i = 0; i < n; i++) {
    result =+ callback(i);
  }
  return result;
}

var digits = buildString(10, function(i) {
  return i;
});
digits; // "0123456789"

var random = buildString(8, function() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + aIndex);
});
random; // "ltvisfjr" (different result each time)

// ITEM 20: Use call to Call Methods with a Custom Receiver

// an object representing a table of key-value bindings providing a forEach Method

var table = {
  entries: [],
  addEntry: function(key, value) {
    this.entries.push({ key: key, value: value });
  },
  forEach: function(f, thisArg) {
    var entries = this.entries;
    for (var i = 0, n = entries.length; i < n; i++) {
      var entry = entries[i];
      f.call(thisArg, entry.key, entry.value, i);
    }
  }
};

function greet() {
  var reply = [this.person, 'Is An Awesome', this.role].join(' ');
  console.log(reply);
}
var i = {
  person: 'Douglas Crockford', role: 'Javascript Developer'
};
greet.call(i); // Douglas Crockford Is An Awesome Javascript Developer

// ITEM 21: Use apply to Call Functions with different numbers of arguments

var buffer = {
  state: [],
  append: function() {
    for (var i = 0, n = arguments.length; i < n; i++) {
      this.state.push(arguments[i]);
    }
  }
};
buffer.append(firstName, " ", lastName, "!");
buffer.append.apply(buffer, getInputStrings());

// Item 22: Use arguments to create variadic functions


// Item 23: Never modify the arguments object

function callMethod(obj, method) {
	var args = [].slice.call(arguments, 2);
	return obj[method].apply(obj, args);
}
obj = {
	add: function(x,y) { return x + y; }
};
callMethod(obj, "add", 17, 25); // 42


// Item 24: Use a variable to save a reference to arguments

function values() {
	var i = 0, n = arguments.length, a = arguments;
	return {
		hasNext: function() {
			return i < n;
		},
		next: function() {
			if (i >= n) {
				throw new Error("end of iteration");
			}
			return a[i++];
		}
	};
}
var it = values(1, 4, 1, 4, 2, 1, 3, 6, 8);
it.next(); // 1
it.next(); // 4
it.next(); // 17


// Item 25: Use bind to Extract Methods with a fixed receiver

var buffer = {
	entries: [],
	add: function(s) {
		this.entries.push(s);
	},
	concat: function() {
		return this.entries.join("");
	}
};

var source = ["867", "-", "5309"];

source.forEach(buffer.add, buffer);
buffer.join(); // "867-5309"

source.forEach(function(s) {
	buffer.add(s);
});
buffer.join();

source.forEach(buffer.add.bind(buffer));
buffer.join(); // "867--5309"


// Item 26: Use bind to Curry Functions

function simpleURL(protocol, domain, path) {
	return protocol + "://" + domain + "/" + path;
}

var urls = paths.maps(function(path) {
	return simpleURL("http", siteDomain, path);
});

var urls = paths.map(simpleURL.bind(null, "http", siteDomain));

//Item 27: Prefer closures to strings for encapsulating code
function repeat(n, action) {
	for (var i = 0; i < n; i++) {
		eval(action)
	}
}
function benchmark() {
	var start = [], end = [], timings = [];
	repeat(1000, function() {
		start.push(Date.now());
		f();
		end.push(Date.now()));
	});
	for (var i = 0, n = start.length; i < n; i++) {
		timings[i] = end[i] - start[i];
	}
	return timings;
}

// using function expressions can mean the code is compiled at the same time as the code  it appears within, rather than waiting for eval to receiving the string in the compiler.


// Item 28: Avoid relying on the toString method of functions
(function(x) {
	return x+1;
}).toString(); // "function (x) {\n    return x+1;\n"


// Item 29: Avoid Nonstandard Stack Inspection Properties
//caller and callee are disabled for security reasons and if they appear more than once stack inspection logic built recursively can end up in a loop.
