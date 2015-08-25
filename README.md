# Astravel

[![Build Status](https://travis-ci.org/davidbonnet/astravel.svg?branch=master)](https://travis-ci.org/davidbonnet/astravel)
[![NPM Version](https://img.shields.io/npm/v/astravel.svg)](https://www.npmjs.org/package/astravel)
[![Dependency Status](https://david-dm.org/davidbonnet/astravel.svg)](https://david-dm.org/davidbonnet/astravel)
[![devDependency Status](https://david-dm.org/davidbonnet/astravel/dev-status.svg)](https://david-dm.org/davidbonnet/astravel#info=devDependencies)

A tiny and fast [ESTree](https://github.com/estree/estree)-compliant AST walker and modifier.

Key features:

- Works on [ESTree](https://github.com/estree/estree)-compliant ASTs such as the ones produced by [Acorn](https://github.com/marijnh/acorn).
- Runs both in a browser and in [Node](http://nodejs.org).
- Out-of-the-box functions such as source code comments insertion.
- No dependencies and small footprint.



## Installation

The easiest way is to install it with the [Node Package Manager](https://www.npmjs.com/package/astravel):

```bash
npm install astravel
```

Alternatively, checkout this repository and install the development dependencies to build the module file:

```bash
git clone https://github.com/davidbonnet/astravel.git
cd astravel
npm install
```

The path to the module file is `dist/astravel.min.js` and can be linked to from an HTML webpage. When used in a browser environment, the module exposes a global variable `astravel`:

```html
<script src="astravel.min.js" type="text/javascript"></script>
```



## Usage

The `astravel` module consists of the following items:

- [defaultTraveler](#astraveldefaulttraveler)
- [makeTraveler(properties) ➞ traveler](#astravelmaketravelerproperties--traveler)
- [Found(node, state)](#astravelfoundnode-state)
- [attachComments(ast, comments) ➞ ast](#astravelattachcommentsast-comments--ast)


#### astravel.defaultTraveler

This object describes a basic AST traveler. It contains the following methods:

- `go(node, state)`: Travels through the provided AST `node` with a given `state` (an object that can be of any type) by recursively calling this method.
- `find(node, state) ➞ Found?`: Travels through the provided AST `node` with a given `state`. If it catches a `Found` instance, returns it. Otherwise, returns nothing.
- `[NodeType](node, state)`: Method handler for a specific `NodeType`.
- `makeChild(properties) ➞ traveler`: Returns a custom AST traveler that inherits from `this` traveler with its own provided `properties` and the property `super` that points to `this` traveler.


#### astravel.makeTraveler(properties) ➞ traveler

This function is similar to `astravel.defaultTraveler.makeChild`: it returns a traveler that inherits from the `defaultTraveler` with its own provided `properties` and the property `super` that points to the `defaultTraveler` object. These properties should redefine the traveler's behavior by implementing the `go(node, state)` method and/or any node handler.

When redefining the `go` method, make sure its basic functionality is kept by calling the parent's `go` method to keep traveling through the AST:

```javascript
var customTraveler = astravel.makeTraveler({
   go: function(node, state) {
      // Code before entering the node
      console.log('Entering ' + node.type);
      // Call the parent's `go` method
      this.super.go.call(this, node, state);
      // Code after leaving the node
      console.log('Leaving ' + node.type);
   }
});
```

To skip specific node types, the most effective way is to replace the corresponding node handlers with a function that does nothing:

```javascript
var ignore = Function.prototype;
var customTraveler = astravel.makeTraveler({
   FunctionDeclaration: ignore,
   FunctionExpression: ignore,
   ArrowFunctionExpression: ignore
});
```


#### astravel.Found(node, state)

This class creates an instance by initializing its `node` and `state` properties to the values provided to the constructor arguments. Its purpose is to be thrown from within a traveler's node handler, or it's `go` method. The traveler's `find` method then catches that instance and returns it. This is particularly useful for searching specific nodes and preventing the traveler to unnecessarily go through the entire AST.

This example shows how to look for the first function declaration:

```javascript
var customTraveler = astravel.makeTraveler({
   FunctionDeclaration: function(node, state) {
      // Found first function declaration, end travel
      throw new astravel.Found(node, state);
   }
});
// Get the first function declaration, if any
var found = customTraveler.find(node);
if (found) console.log('Found function named ' + found.node.id.name);
```


#### astravel.attachComments(ast, comments) ➞ ast

This function attaches a list of `comments` to the corresponding nodes of a provided `ast` and returns that same `ast`. The `ast` is modified in-place and only the nodes getting comments are augmented with a `comments` and/or a `trailingComments` array property.

Each comment should be an object with the following properties:

- `type`: `"Line"` or `"Block"`
- `value`: Comment string value
- `start`: Comment starting character offset number
- `end`: Comment ending character offset number
- `loc`: Location object with `start` and `end` properties containing one-based `line` number and zero-based `column` number properties.

This example shows how to obtain a proper list of `comments` of a given source `code` with [Acorn](https://github.com/marijnh/acorn) and how to attach them on the generated `ast`:

```javascript
var comments = [];
var ast = acorn.parse(code, {
   // This ensures that the `loc` property is present on comment objects
   locations: true,
   // Acorn will store the comment objects in this array
   onComment: comments
});
// Attach comments on the ast
astravel.attachComments(ast, comments);
```

The algorithm assumes that comments are not put in exotic places, such as in-between function arguments, and proceeds as follows:

- For a given statement, it stores all comments right above it and on the same line to it's right side in a `comments` property.
- If a comment block is at the beginning of a code block, it is attached to that code block.
- Comments not followed by any statement in a code block are attached as `trailingComments` to that code block.

In this example, the comments tell to which statement they are attached:

```javascript
// Attached to the variable declaration just below
var point = {
   // Attached to the property definition just below
   x: 0,
   y: 0 // Attached to the property definition on its left
};
/*
Attached to the function declaration just below.
*/
function add(a, b) {
   /*
   Attached to the function body because it is the first comment block.
   */
   return a + b; // Attached to the return statement on its left
   // Trailing comment attached as such to the function body
}
// Trailing comment attached as such to the program body
```



## Building

All building scripts are defined in the `package.json` file and rely on the [Node Package Manager](https://www.npmjs.com/). All commands must be run from within the root repository folder.

### Production

The source code of Astravel is written in JavaScript 6 and located at `src/astravel.js`. It is compiled down to a minified JavaScript 5 file located at `dist/astravel.min.js` using [Browserify](http://browserify.org), [Babel](http://babeljs.io/) and [UglifyJS](https://github.com/mishoo/UglifyJS2). This is achieved by running:
```bash
npm install
```

If you are already using a JavaScript 6 to 5 compiler for your project, or a JavaScript 6 compliant interpreter, you can include the `src/astravel.js` file directly.

A non-minified and source map free version can be obtained at `dist/astravel.js` by running:
```bash
npm run build
```

### Development

If you are working on Astravel, you can use [Watchify](https://github.com/substack/watchify) to build automatically at each modification a non-minified version (along with a source map for easy debugging) located at `dist/astravel.debug.js` by running:
```bash
npm start
```

While making changes to Astravel, make sure it passes the tests by running:
```bash
npm test
```



## TODO

- Provide a set of examples
- Show how to modify an AST

