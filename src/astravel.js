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


function makeTraveler( properties ) {
	/*
	Returns a custom AST traveler object based on the default traveler and the provided `properties`.
	*/
	return defaultTraveler.makeChild( properties )
}


class Found {
	constructor( node, state ) {
		this.node = node
		this.state = state
	}
}


export { defaultTraveler, attachComments, makeTraveler, Found }

