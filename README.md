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

The `astravel` module consists of three elements described hereafter.


#### astravel.defaultTraveller

The `defaultTraveller` travels through all child nodes of a given `node` by recursively calling `defaultTraveller.go(node, state)`. The `defaultTraveller` also contains method handlers for each node type, such as `defaultTraveller.Identifier(node, state)`, that are called by its `go` method. This provides enough flexibility to easily build a custom traveller with its `makeCustom(properties)` method, or the `astravel.makeCustomTraveller(properties)` function.


#### astravel.makeCustomTraveller(properties) ➞ traveller

This functions returns a traveller that inherits from the `defaultTraveller` with its own provided `properties`. These properties should redefine the traveller's behavior by defining the `go(node, state)` method and/or any node handler.

When redefining the `go` method, make sure its basic functionality is kept, which consists of calling the corresponding node handler:

```javascript
var customTraveler = astravel.makeCustomTraveller({
   go: function(node, state) {
      // Code before entering the node
      console.log('Entering ' + node.type);
      // Make sure this instruction remains somehow
      this[node.type](node, state);
      // Code after leaving the node
      console.log('Leaving ' + node.type);
   }
});
```

To skip specific node types, the most effective way is to replace the corresponding node handlers with a function that does nothing:

```javascript
var ignore = Function.prototype;
var customTraveler = astravel.makeCustomTraveller({
   FunctionDeclaration: ignore,
   FunctionExpression: ignore
});
```


#### astravel.attachComments(ast, comments) ➞ ast

This function attaches a list of `comments` to the corresponding nodes of a provided `ast` and returns that same `ast`. Each comment should be an object with the following properties:

- `type`: `"Line"` or `"Block"`
- `value`: `"Comment text value"`
- `start`: Comment starting character offset
- `end`: Comment ending character offset
- `loc`: Location object with `start` and `end` properties containing one-based `line` number and zero-based `column` number properties.

This example shows of to obtain a proper list of `comments` of a given source `code` with [Acorn](https://github.com/marijnh/acorn) and how to attach them on the generated `ast`:

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


*TODO: Describe the simple node <--> comment association algorithm.*



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
