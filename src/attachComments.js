

import defaultTraveller from "./defaultTraveller"


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
				let child = children[ i ]
				let boundComments = []
				while ( comment != null && comment.end < child.start ) {
					boundComments.push( comment )
					comment = comments[ ++index ]
				}
				// Check if next comment is line comment and on the same line
				if ( comment != null && comment.type[ 0 ] === 'L' ) {
					if ( comment.loc.start.line === child.loc.end.line ) {
						boundComments.push( comment )
						comment = comments[ ++index ]
					}
				}
				if ( boundComments.length !== 0 )
					child.comments = boundComments
				// Travel through child
				state.index = index
				// console.log( 'comment', comment )
				traveller[ child.type ]( child, state )
				index = state.index
				comment = comments[ index ]
			}
			// Look for remaining comments
			let trailingComments = []
			while ( comment != null && comment.end < parent.end ) {
				trailingComments.push( comment )
				comment = comments[ ++index ]
			}
			if ( trailingComments.length !== 0 )
				parent.trailingComments = trailingComments
			state.index = index
		}
	}
}


let Program


let customTraveller = defaultTraveller.makeCustom( {
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
	Modifies in-place the AST starting at `node` by attaching the provided `comments` and returns that AST.
	*/
	customTraveller[ node.type ]( node, {
		comments,
		index: 0
	} )
	return node
}
