import { join } from 'path'
import test from 'ava'

import { getDependents } from '../getDependents'

function fileName(fileName) {
  return join(__dirname, fileName)
}

test('Get dependents', async (assert) => {
  assert.snapshot(await getDependents(fileName('./getDependents.js')))
})
