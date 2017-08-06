const fs = require('fs')
const path = require('path')
const normalizeNewline = require('normalize-newline')
const { test } = require('tap')
const { parse } = require('acorn')

const { defaultTraveler, Found } = require('../dist/astravel')

const DIRNAME = path.join(__dirname, 'samples')

function getAst(filename, ecmaVersion, sourceType = 'module') {
  const options = {
    ecmaVersion,
    sourceType,
  }
  const code = normalizeNewline(
    fs.readFileSync(path.join(DIRNAME, filename), 'utf8'),
  )
  const ast = parse(code, options)
  return ast
}

test('Default traveler', assert => {
  const ast = getAst('everything.js', 8)
  defaultTraveler.go(ast)

  assert.test('Deprecated', assert => {
    const ast = getAst('deprecated.js', 5, 'script')
    defaultTraveler.go(ast)
    assert.end()
  })

  assert.test('Find node', assert => {
    const returnNodeFinder = defaultTraveler.makeChild({
      ReturnStatement(node, state) {
        throw new Found(node, state)
      },
    })
    const result = returnNodeFinder.find(ast)
    assert.ok(result)
    assert.ok(result.node)
    assert.equal(result.node.type, 'ReturnStatement')
    assert.end()
  })

  assert.test('Find node throws error', assert => {
    assert.throws(() => defaultTraveler.find(), TypeError)
    assert.end()
  })

  assert.end()
})
