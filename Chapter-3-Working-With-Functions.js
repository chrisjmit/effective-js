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
