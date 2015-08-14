

import { Found } from "./astravel"


var ForInStatement, FunctionDeclaration, RestElement, BinaryExpression, ArrayExpression


const ignore = Function.prototype


export default {

	// Basic methods
	go: function( node, state ) {
		/*
		Starts travelling through the specified AST `node` with the provided `state`.
		*/
		this[ node.type ]( node, state )
	},
	find: function( node, state ) {
		/*
		Starts travelling through the specified AST `node` with the provided `state`.
		If it catches a `Found` instance, returns it. Otherwise, returns `undefined`.
		*/
      try {
         this.go( node, state );
      } catch ( error ) {
         if ( error instanceof Found )
            return error;
         else
            throw error;
      }
   },
	makeCustom: function ( properties ) {
		/*
		Returns a custom AST traveler object based on this one.
		*/
		let customTraveler = Object.create( this )
		customTraveler.super = this
		for ( let key in properties )
			customTraveler[ key ] = properties[ key ]
		return customTraveler
	},

	// JavaScript 5
	Program: function( node, state ) {
		let statements = node.body
		for ( let i = 0, { length } = statements; i < length; i++ )
			this.go( statements[ i ], state )
	},
	BlockStatement: function( node, state ) {
		let statements = node.body
		if ( statements != null )
			for ( let i = 0, { length } = statements; i < length; i++ )
				this.go( statements[ i ], state )
	},
	EmptyStatement: ignore,
	ExpressionStatement: function( node, state ) {
		this.go( node.expression, state )
	},
	IfStatement: function( node, state ) {
		this.go( node.test, state )
		this.go( node.consequent, state )
		if ( node.alternate != null )
			this.go( node.alternate, state )
	},
	LabeledStatement: function( node, state ) {
		this.go( node.label, state )
		this.go( node.body, state )
	},
	BreakStatement: function( node, state ) {
		if ( node.label )
			this.go( node.label, state )
	},
	ContinueStatement: function( node, state ) {
		if ( node.label )
			this.go( node.label, state )
	},
	WithStatement: function( node, state ) {
		this.go( node.object, state )
		this.go( node.body, state )
	},
	SwitchStatement: function( node, state ) {
		const { lineEnd, code } = state
		this.go( node.discriminant, state )
		const { cases } = node;
		for ( let i = 0, { length } = cases; i < length; i++ )
			this.go( cases[ i ], state )
	},
	SwitchCase: function( node, state ) {
		if ( node.test != null )
			this.go( node.test, state )
		let statements = node.consequent
		for ( let i = 0, { length } = statements; i < length; i++ )
			this.go( statements[ i ], state )
	},
	ReturnStatement: function( node, state ) {
		if ( node.argument )
			this.go( node.argument, state )
	},
	ThrowStatement: function( node, state ) {
		this.go( node.argument, state )
	},
	TryStatement: function( node, state ) {
		this.go( node.block, state )
		if ( node.handler != null ) {
			this.go( node.handler.param, state )
			this.go( node.handler.body, state )
		}
		if ( node.finalizer != null )
			this.go( node.finalizer, state )
	},
	WhileStatement: function( node, state ) {
		this.go( node.test, state )
		this.go( node.body, state )
	},
	DoWhileStatement: function( node, state ) {
		this.go( node.body, state )
		this.go( node.test, state )
	},
	ForStatement: function( node, state ) {
		if ( node.init != null )
			this.go( node.init, state )
		if ( node.test != null )
			this.go( node.test, state )
		if ( node.update != null )
			this.go( node.update, state )
		this.go( node.body, state )
	},
	ForInStatement: ForInStatement = function( node, state ) {
		this.ForInit( node.left, state )
		this.go( node.right, state )
		this.go( node.body, state )
	},
	DebuggerStatement: ignore,
	FunctionDeclaration: FunctionDeclaration = function( node, state ) {
		if ( node.id != null )
			this.go( node.id, state )
		const { params } = node
		if ( params != null && params.length !== 0 )
			for ( let i = 0, { length } = params; i < length; i++ )
				this.go( params[ i ], state )
		this.go( node.body, state )
	},
	VariableDeclaration: function( node, state ) {
		const { declarations } = node
		for ( let i = 0, { length } = declarations; i < length; i++ )
			this.go( declarations[ i ], state )
	},
	VariableDeclarator: function( node, state ) {
		this.go( node.id, state )
		if ( node.init != null )
			this.go( node.init, state )
	},
	ArrowFunctionExpression: function( node, state ) {
		const { params } = node
		if ( params != null && params.length !== 0 ) {
			for ( let i = 0, { length } = params; i < length; i++ ) {
				let param = params[ i ]
				this.go( param, state )
			}
		}
		this.go( node.body, state )
	},
	ThisExpression: ignore,
	ArrayExpression: ArrayExpression = function( node, state ) {
		for ( let i = 0, { elements } = node, { length } = elements; i < length; i++ ) {
			let element = elements[ i ]
			this.go( element, state )
		}
	},
	ObjectExpression: function( node, state ) {
		const { properties } = node, { length } = properties
		for ( let i = 0; i < length; i++ )
			this.go( properties[ i ], state )
	},
	Property: function( node, state ) {
		this.go( node.key )
		if ( !node.shorthand )
			this.go( node.value )
	},
	FunctionExpression: FunctionDeclaration,
	SequenceExpression: function( node, state ) {
		const { expressions } = node
		for ( let i = 0, { length } = expressions; i < length; i++ ) {
			let expression = expressions[ i ]
			this.go( expression, state )
		}
	},
	UnaryExpression: function( node, state ) {
		this.go( node.argument, state )
	},
	UpdateExpression: function( node, state ) {
		this.go( node.argument, state )
	},
	AssignmentExpression: function( node, state ) {
		this.go( node.left, state )
		this.go( node.right, state )
	},
	BinaryExpression: BinaryExpression = function( node, state ) {
		this.go( node.left, state )
		this.go( node.right, state )
	},
	LogicalExpression: BinaryExpression,
	ConditionalExpression: function( node, state ) {
		this.go( node.test, state )
		this.go( node.consequent, state )
		this.go( node.alternate, state )
	},
	NewExpression: function( node, state ) {
		this.CallExpression( node, state )
	},
	CallExpression: function( node, state ) {
		this.go( node.callee, state )
		const args = node[ 'arguments' ]
		for ( let i = 0, { length } = args; i < length; i++ )
			this.go( args[ i ], state )
	},
	MemberExpression: function( node, state ) {
		this.go( node.object, state )
		this.go( node.property, state )
	},
	Identifier: ignore,
	Literal: ignore,

	// JavaScript 6
	ForOfStatement: ForInStatement,
	ClassDeclaration: function( node, state ) {
		this.go( node.id, state )
		if ( node.superClass )
			this.go( node.superClass, state )
		// ClassBody
		this.BlockStatement( node.body, state )
	},
	ImportDeclaration: function( node, state ) {
		const { specifiers } = node, { length } = specifiers
		if ( length > 0 )
			for ( let i = 0; i < length; i++ )
				this.go( specifiers[ i ], state )
	},
	ImportNamespaceSpecifier: ignore,
	ImportDefaultSpecifier: ignore,
	ImportSpecifier: ignore,
	ExportDefaultDeclaration: function( node, state ) {
		this.go( node.declaration, state )
	},
	ExportNamedDeclaration: function( node, state ) {
		if ( node.declaration ) {
			this.go( node.declaration, state )
		} else {
			const { specifiers } = node, { length } = specifiers
			for ( let i = 0; i < length; i++ )
				this.go( specifiers[ i ], state )
		}
	},
	ExportSpecifier: ignore,
	ExportAllDeclaration: ignore,
	MethodDefinition: function( node, state ) {
		this.go( node.key, state )
		const { params } = node.value
		if ( params ) {
			for ( let i = 0, { length } = params; i < length; i++ )
				this.go( params[ i ], state )
		}
		this.go( node.value.body, state )
	},
	ClassExpression: function( node, state ) {
		this.ClassDeclaration( node, state )
	},
	Super: ignore,
	RestElement: RestElement = function( node, state ) {
		this.go( node.argument, state )
	},
	SpreadElement: RestElement,
	YieldExpression: function( node, state ) {
		if ( node.argument )
			this.go( node.argument, state )
	},
	TemplateLiteral: function( node, state ) {
		const { quasis, expressions } = node
		for ( let i = 0, { length } = expressions; i < length; i++ )
			this.go( expressions[ i ], state )
	},
	TaggedTemplateExpression: function( node, state ) {
		this.go( node.tag, state )
		this.go( node.quasi, state )
	},
	ObjectPattern: function( node, state ) {
		const { properties } = node, { length } = properties
		for ( let i = 0; i < length; i++ )
			this.go( properties[ i ], state )
	},
	ArrayPattern: ArrayExpression,
	AssignmentPattern: function( node, state ) {
		this.go( node.left, state )
		this.go( node.right, state )
	}

}

// TODO: Add JS7 nodes
