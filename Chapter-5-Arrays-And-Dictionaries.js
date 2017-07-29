// Chapter 5: Arrays and Dictionaries

// Item 43: Build lightweight dictionaries from direct instances of objects

var dict = { alice: 34, bob: 24, chris: 62 };
  var people = [];
  for (var name in dict) {
    people.push(name + ": " + dict[name]);
  }
people; //["alice: 34", "bob: 24", "chris: 62"]

function NaiveDict(){}
  NaiveDict.prototype.count = function() {
    var i = 0;
      for (var name in this) { //
      }
    };
    return i;
};

NaiveDict.prototype.toString = () {
  return "[object NativeDict]";
};

var dict = new NativeDict();
dict.alice = 34;
dict.bob = 24;
dict.chris = 62;
dict.count(); // 5

// Only use direct instances of Object as dictionaries
var dict = {};
dict.alice = 34;
dict.bob = 24;
dict.chris = 62;
var names = [];
for (var name in dict) {
  names.push(name);
}
names; // ["alice", "bob", "chris"]


// Item 44: Use null prototypes to prevent prototype pollution

var x = Object.create(null);
Object.getPrototypeOf(o) === null;

//In older JS environments consider using protocol
{ __proto__: null }

// Item 45: Use hasOwnProperty to protect against prototype pollution

var dict = {};
"alice" in dict; //false
"bob" in dict; //false
"chris" in dict; //false
"toString" in dict; //true
"valueOf" in dict; //true
