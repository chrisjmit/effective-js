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
