

import traveller from "./traveller"


function attachComments( parent, children, findHeadingComments, state, traveller ) {
	let { index, comments } = state
	let comment = comments[ index ]
	if ( comment != null ) {
		if ( children == null || children.length === 0 ) {
			// No children, attach comments to parent
			let boundComments = parent.comments != null ? parent.comments : []
			while ( comment != null && comment.end < parent.end ) {
				boundComments.push( comment )
				comment = comments[ ++index ]
			}
			if ( boundComments.length !== 0 && parent.comments == null )
				parent.comments = boundComments
		} else {
			// Look for heading block comments
			if ( findHeadingComments ) {
				let boundComments = parent.comments != null ? parent.comments : []
				let { start } = children[ 0 ]
				while ( comment != null && comment.type[ 0 ] === 'B' && comment.end < start ) {
					boundComments.push( comment )
					comment = comments[ ++index ]
				}
				if ( boundComments.length !== 0 && parent.comments == null )
					parent.comments = boundComments				
			}
			// Attach comments to children
			for ( let i = 0, { length } = children; comment != null && i < length; i++ ) {
				let statement = children[ i ]
				let boundComments = []
				while ( comment != null && comment.end < statement.start ) {
					boundComments.push( comment )
					comment = comments[ ++index ]
				}
				if ( comment != null && comment.type[ 0 ] === 'L' ) {
					// Check if next comment is line comment and on the same line
					if ( comment.loc.start.line === statement.loc.end.line ) {
						boundComments.push( comment )
						comment = comments[ ++index ]
					}
				}
				if ( boundComments.length !== 0 )
					statement.comments = boundComments
				// Travel through statement
				state.index = index
				traveller[ statement.type ]( statement, state )
				;( { index } = state )
				comment = comments[ index ]
			}
			// Look for remaining comments
			index = state.index
			comment = comments[ index ]
			let trailingComments = []
			while ( comment != null && comment.end < parent.end ) {
				trailingComments.push( comment )
				comment = comments[ ++index ]
			}
			if ( trailingComments.length !== 0 ) {
				parent.trailingComments = trailingComments
				state.index = index
			}
		}
	}
}


var Program


let customTraveller = traveller.makeCustom( {
	Program: Program = function( node, state ) {
		attachComments( node, node.body, true, state, this )
	},
	BlockStatement: Program,
	ObjectExpression: function( node, state ) {
		attachComments( node, node.properties, true, state, this )
	},
	SwitchStatement: function( node, state ) {
		attachComments( node, node.cases, false, state, this )
	},
	SwitchCase: function( node, state ) {
		attachComments( node, node.consequent, false, state, this )
	}
	// TODO: Consider ArrayExpression ?
} )


export default function( node, comments ) {
	/*
	Attaches the provided `comments` list to the `node`-rooted ast.
	*/
	customTraveller[ node.type ]( node, {
		comments,
		index: 0
	} )
	return node
}

