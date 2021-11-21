import test from 'ava'

import { parseFixture } from './helpers/parseFixture'
import { attachComments } from '../attachComments'
import { document } from '../document'

test('Builds structure', async (assert) => {
  const comments = []
  const ast = await parseFixture('documented.js', { onComment: comments })
  const scope = document(attachComments(ast, comments))
  assert.snapshot(scope)
})
