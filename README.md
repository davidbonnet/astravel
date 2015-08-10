# Astravel

<!-- [![Build Status](https://travis-ci.org/davidbonnet/astravel.svg?branch=master)](https://travis-ci.org/davidbonnet/astravel) -->
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

__TODO__




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
