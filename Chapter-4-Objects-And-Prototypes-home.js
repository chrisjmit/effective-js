// Chapter 4 - Objects and Prototypes

// Item 30: Understand the difference between prototype, getPrototypeOf and _proto_

function User(name, passwordHash) {
	this.name = name;
	this.passwordHash = passwordHash;
}

User.prototype.toString = function() {
	return "[User " + this.name + "]";
};

User.prototype.checkPassword = function(password) {
	return hash(password) === this.passwordHash;
};

var u - new User("cmitchell",
				 "00whgwiuhgh02882y9y2ub2480");

// Function.protoype options including .apply, .bind, .call

// Item 31: Prefer Object.getPrototypeOf to _proto_

// Item 32: Never modify _proto_

// Item 33: Make your Constructors new-Agnostic

function User(name, passwordHash) {
	if (!(this instanceof User)) {
		return new User(name, passwordHash);
	}
	this.name = name;
	this.passwordHash = passwordHash;
}

function User(name, passwordHash) {
	var self = this instanceof User
		? this
	: Object.create(User.prototype);
	self.name = name;
	self.passwordHash = passwordHash;
	return self;
}

// Item 34: Store methods on prototypes

function User(name, passwordHash) {
	this.name = name;
	this.passwordHash = passwordHash;
	this.toString = function() {
		return "[User " + this.name + "]";
};
	this.checkPassword = function(password) {
		return hash(password) === this.passwordHash;
	};
}

// storing methods on an instance duplicates the functions as one per object
// prototypes are heavily optimised

// Item 35: Use Closures to Store Private Data

function User(name, passwordHash) {
	this.toString = function() {
		return "[User " + name + "]";
	};
	this.checkPassword = function(password) {
		return hash(password) === passwordHash;
	};
}

// Item 36: Store instance state only on instance objects

Tree.prototype = {
	children: [], // should be instance state!
	addChild: function(x) {
		this.children.push(x);
	}
};

function Tree(x) {
	this.value = x;
	this.children = []; // instance state
}
Tree.prototype = {
	addChild: function(x) {
		this.children.push(x);
	}
};

// Item 37: Recognising the implicit binding of this

function CSVReader(separators) {
	this.separators = separators || [","];
	this.regexp =
		new Regexp(this.separators.map(function(sep) {
			return "\\" + sep[0];
		}).join("|"));
}

CSVReader.prototype.read = function(str) {
	var lines = str.trim().split(\/n/);
	return lines.map(function(line) {
		return line.split(this.regexp);
	}.bind(this)); //binds to outer this-binding
};

var reader = new CSVReader();
reader.read("a,b,c\nd,e,f\n");
// [["a", "b", "c"], ["d", "e", "f"]]

// Item 38:


// Item 39: Never reuse superclass property names

function Actor(scene, x, y) {
  this.scene = scene;
  this.x = x;
  this.y = y;
  this.actorID = ++Actor.nextID; // distinct from alienID
  scene.register(this);
}

Actor.nextID = 0;

function Alien(scene, x, y, direction, speed, strength) {
  Actor.call(this, scene, x, y);
  this.direction = direction;
  this.speed = speed;
  this.strength = strength;
  this.damage = 0;
  this.alienID = ++Alien.nextID; // distinct from actorID
}

Alien.nextID = 0;

// Item 40: Avoid inheriting from standard classes
