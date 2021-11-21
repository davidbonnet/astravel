import test from 'ava'

import { parseFixture } from './helpers/parseFixture'
import { defaultTraveler } from '../defaultTraveler'

test('Default traveler', async (assert) => {
  const state = {
    tree: ['Root', []],
  }
  const ast = await parseFixture('everything.js')
  const customTraveler = defaultTraveler.makeChild({
    go(node, state) {
      const { tree } = state
      const child = [node.type, []]
      tree[1].push(child)
      state.tree = child
      this[node.type](node, state)
      state.tree = tree
    },
  })
  customTraveler.go(ast, state)
  assert.snapshot(state.tree)
})

test('Deprecated', async (assert) => {
  const ast = await parseFixture('deprecated.js', {
    module: false,
    impliedStrict: false,
  })
  defaultTraveler.go(ast)
  assert.pass()
})

test('Find node', async (assert) => {
  const ast = await parseFixture('simple.js')
  const type = 'ReturnStatement'
  const result = defaultTraveler.find((node) => node.type === type, ast)
  assert.truthy(result)
  assert.truthy(result.node)
  assert.is(result.node.type, type)
})

test('Find node throws error', (assert) => {
  assert.throws(() => defaultTraveler.find(), { instanceOf: TypeError })
})
