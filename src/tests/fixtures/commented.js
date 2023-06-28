/*
Module documentation.
*/

/*
Documentation for variable `point`.
*/
const point = {
  /* This is a block comment inside an object expression */
  // This comment is for the x property
  x: 0,
  // …and this one is for the y property
  y: 1,
  // Trailing comment
}

class A {
  /*
	Documentation for class A.
	*/

  m(x, y = true) {
    const foo = 'foo'

    Promise.all([
      import('./a.js'),
      import('b'),
      import(`${foo}/bar`),
      import('https://domain.com/pkg/umd/foo.js')
    ])
    /*
		Document for method `m` with params `x` and `y`.
		*/
  }
}
