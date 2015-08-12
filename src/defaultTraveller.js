

var ForInStatement, FunctionDeclaration, RestElement, BinaryExpression, ArrayExpression


const ignore = Function.prototype


export default {
	go: function( node, state ) {
		/*
		Starts travelling through the specified AST `node` with the provided `state`.
		*/
		this[ node.type ]( node, state )
	},
	makeCustom: function ( places ) {
		/*
		Returns a custom AST traveller object based on this one.
		*/
		let customTraveller = Object.create( this )
		for ( let key in places )
			customTraveller[ key ] = places[ key ]
		return customTraveller
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
			this.ForInit( node.init, state )
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
	ForInit: function( node, state ) {
		this.go( node, state )
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
		for ( let i = 0, { length } = declarations; i < length; i++ ) {
			let declaration = declarations[ i ]
			this.go( declaration.id, state )
			const { init } = declaration
			if ( init != null )
				this.go( init, state )
		}
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
		for ( let i = 0, { properties } = node, { length } = properties; i < length; i++ ) {
			let property = properties[ i ]
			this.go( property.key, state )
			if ( !property.shorthand ) {
				this.go( property.value, state )
			}
		}
	},
	Property: ignore,
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
		this.go( node, state )
		this.go( node, state )
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
		for ( let i = 0, { length } = args; i < length; i++ ) {
			let arg = args[ i ]
			this.go( arg, state )
		}
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
		if ( length > 0 ) {
			let i = 0, specifier = null
			for ( let i = 0; i < length; i++ ) {
				let specifier = specifiers[ i ]
			}
		}
	},
	ExportDefaultDeclaration: function( node, state ) {
		this.go( node.declaration, state )
	},
	ExportNamedDeclaration: function( node, state ) {
		if ( node.declaration ) {
			this.go( node.declaration, state )
		} else {
			const { specifiers } = node
			const { length } = specifiers
			if ( length > 0 ) {
				for ( let i = 0; i < length; i++ ) {
					let specifier = specifiers[i]
					let { name } = specifier.local
					if ( name !== specifier.exported.name )
						specifier.exported.name
				}
			}
		}
	},
	ExportAllDeclaration: ignore,
	MethodDefinition: function( node, state ) {
		this.go( node.key, state )
		const { params } = node.value
		if ( params ) {
			for ( let i = 0, { length } = params; i < length; i++ ) {
				let param = params[ i ]
				this.go( param, state )
			}
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
		for ( let i = 0, { length } = expressions; i < length; i++ ) {
			let expression = expressions[ i ]
			this.go( expression, state )
		}
	},
	TaggedTemplateExpression: function( node, state ) {
		this.go( node.tag, state )
		this.go( node.quasi, state )
	},
	ObjectPattern: function( node, state ) {
		for ( let i = 0, { properties } = node, { length } = properties; i < length; i++ ) {
			let property = properties[ i ]
			if ( property.computed ) {
				this.go( property.key, state )
			} else {
				this.go( property.key, state )
			}
			if ( !property.shorthand ) {
				this.go( property.value, state )
			}
		}
	},
	ArrayPattern: ArrayExpression,
	AssignmentPattern: function( node, state ) {
		this.go( node.left, state )
		this.go( node.right, state )
	}
}

// TODO: Add JS7 nodes
