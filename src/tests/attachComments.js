import test from 'ava'

import { parseFixture } from './helpers/parseFixture'
import { attachComments } from '../attachComments'

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
