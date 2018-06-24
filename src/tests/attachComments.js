import test from 'ava'

import { getAst } from './helpers'
import attachComments from '../attachComments'

test('Comments attachment', assert => {
  const comments = []
  const ast = getAst('commented.js', 8, 'script', comments)
  attachComments(ast, comments)
  assert.snapshot(ast)
})
