import test from 'ava'

import { parseFixture } from './helpers/parseFixture.js'
import { attachComments } from '../attachComments.js'

test('Comments attachment', async (assert) => {
  const comments = []
  const ast = await parseFixture('commented.js', {
    ranges: true,
    onComment: comments,
  })
  assert.snapshot(comments)
  attachComments(ast, comments)
  assert.snapshot(ast)
})
