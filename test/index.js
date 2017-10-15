const fs = require('fs')
const path = require('path')
const normalizeNewline = require('normalize-newline')
const { test } = require('tap')
const { parse } = require('acorn')

const { defaultTraveler, attachComments } = require('../dist/astravel')

const DIRNAME = path.join(__dirname, 'samples')

function getAst(filename, ecmaVersion, sourceType = 'module', onComment) {
  const options = {
    ecmaVersion,
    sourceType,
    locations: onComment != null,
    onComment,
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
    const type = 'ReturnStatement'
    const result = defaultTraveler.find(node => node.type === type, ast)
    assert.ok(result)
    assert.ok(result.node)
    assert.equal(result.node.type, type)
    assert.end()
  })

  assert.test('Find node throws error', assert => {
    assert.throws(() => defaultTraveler.find(), TypeError)
    assert.end()
  })

  assert.end()
})

test('Comments attachment', assert => {
  const comments = []
  const ast = getAst('comments.js', 8, 'script', comments)
  attachComments(ast, comments)
  assert.end()
})
