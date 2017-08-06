# Astravel

[![NPM Version](https://img.shields.io/npm/v/astravel.svg)](https://www.npmjs.org/package/astravel)
[![Build Status](https://travis-ci.org/davidbonnet/astravel.svg?branch=master)](https://travis-ci.org/davidbonnet/astravel)
[![Coverage](https://codecov.io/gh/davidbonnet/astravel/branch/master/graph/badge.svg)](https://codecov.io/gh/davidbonnet/astravel)
[![devDependency Status](https://david-dm.org/davidbonnet/astravel/dev-status.svg)](https://david-dm.org/davidbonnet/astravel#info=devDependencies)
[![Greenkeeper](https://badges.greenkeeper.io/davidbonnet/astravel.svg)](https://greenkeeper.io/)

A tiny and fast [ESTree](https://github.com/estree/estree)-compliant AST walker and modifier.

### Key features

- Works on [ESTree](https://github.com/estree/estree)-compliant ASTs such as the ones produced by [Acorn](https://github.com/marijnh/acorn).
- Out-of-the-box functions such as source code comments insertion for [Astring](https://github.com/davidbonnet/astring).
- No dependencies and small footprint.



## Installation

Install with the [Node Package Manager](https://www.npmjs.com/package/astravel):

```bash
npm install astravel
```

Alternatively, checkout this repository and install the development dependencies to build the module file:

```bash
git clone https://github.com/davidbonnet/astravel.git
cd astravel
npm install
```

A browser-ready minified version of Astravel is available at `dist/astravel.min.js`.



## Usage

The `astravel` module exports the following items:

- [defaultTraveler](#astraveldefaulttraveler)
- [makeTraveler(properties) ➞ traveler](#astravelmaketravelerproperties--traveler)
- [attachComments(ast, comments) ➞ ast](#astravelattachcommentsast-comments--ast)


#### astravel.defaultTraveler

This object describes a basic AST traveler. It contains the following methods:

- `go(node, state)`: Travels through the provided AST `node` with a given `state` (an object that can be of any type) by recursively calling this method.
- `find(predicate, node, state) ➞ { node, state }?`: Returns `{ node, state }` for which `predicate(node, state)` returns truthy, starting at the specified AST `node` and with the provided `state`. Otherwise, returns `undefined`.
- `[NodeType](node, state)`: Method handler for a specific `NodeType`.
- `makeChild(properties) ➞ traveler`: Returns a custom AST traveler that inherits from `this` traveler with its own provided `properties` and the property `super` that points to `this` traveler.


#### astravel.makeTraveler(properties) ➞ traveler

This function is similar to `astravel.defaultTraveler.makeChild`: it returns a traveler that inherits from the `defaultTraveler` with its own provided `properties` and the property `super` that points to the `defaultTraveler` object. These properties should redefine the traveler's behavior by implementing the `go(node, state)` method and/or any node handler.

When redefining the `go` method, make sure its basic functionality is kept by calling the parent's `go` method to keep traveling through the AST:

```javascript
var customTraveler = astravel.makeTraveler({
  go: function(node, state) {
    // Code before entering the node
    console.log('Entering ' + node.type)
    // Call the parent's `go` method
    this.super.go.call(this, node, state)
    // Code after leaving the node
    console.log('Leaving ' + node.type)
  },
})
```

To skip specific node types, the most effective way is to replace the corresponding node handlers with a function that does nothing:

```javascript
var ignore = Function.prototype
var customTraveler = astravel.makeTraveler({
  FunctionDeclaration: ignore,
  FunctionExpression: ignore,
  ArrowFunctionExpression: ignore,
})
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
  y: 0, // Attached to the property definition on its left
}
/*
Attached to the function declaration just below.
*/
function add(a, b) {
  /*
   Attached to the function body because it is the first comment block.
   */
  return a + b // Attached to the return statement on its left
  // Trailing comment attached as such to the function body
}
// Trailing comment attached as such to the program body
```



## Building

All building scripts are defined in the `package.json` file and rely on the [Node Package Manager](https://www.npmjs.com/). All commands must be run from within the root repository folder.


### Production

Production code can be obtained from the `dist` folder by running:

```bash
npm run build
```

If you are already using a JavaScript 6 to 5 compiler for your project, or a JavaScript 6 compliant interpreter, you can include the `src/astravel.js` file directly.

A minified version of Astravel with source maps can be obtained at `dist/astravel.min.js` by running:

```bash
npm run build:minified
```


### Development

If you are working on Astring, you can enable Babel's watch mode to automatically transpile to the `dist` folder at each update by running:

```bash
npm start
```


#### Tests

While making changes to Astravel, make sure it passes the tests (it checks code formatting and unit tests):

```bash
npm test
```



## Roadmap

Planned features and releases are outlined on the [milestones page](https://github.com/davidbonnet/astravel/milestones).
