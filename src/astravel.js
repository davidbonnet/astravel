// Astravel is  tiny and fast ESTree-compliant AST walker and modifier.
//
// Astravel was written by David Bonnet and released under an MIT license.
//
// The Git repository for Astravel is available at:
// https://github.com/davidbonnet/astravel.git
//
// Please use the GitHub bug tracker to report issues:
// https://github.com/davidbonnet/astravel/issues


import defaultTraveler from "./defaultTraveler"
import attachComments from "./attachComments"


function makeCustomTraveler( places ) {
	/*
	Returns a custom AST traveler object based on the default traveler.
	*/
	let customTraveler = Object.create( defaultTraveler )
	for ( let key in places )
		customTraveler[ key ] = places[ key ]
	return customTraveler
}


class Found {
	constructor( node, state ) {
		this.node = node
		this.state = state
	}
}


export { defaultTraveler, attachComments, makeCustomTraveler, Found }

