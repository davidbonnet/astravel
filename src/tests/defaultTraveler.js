import test from 'ava'

import { getAst } from './helpers'
import defaultTraveler from '../defaultTraveler'

const ast = getAst('everything.js', 10)

test('Default traveler', assert => {
  const state = {
    tree: ['Root', []],
  }
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

test('Deprecated', assert => {
  const ast = getAst('deprecated.js', 5, 'script')
  defaultTraveler.go(ast)
  assert.pass()
})

test('Find node', assert => {
  const type = 'ReturnStatement'
  const result = defaultTraveler.find(node => node.type === type, ast)
  assert.truthy(result)
  assert.truthy(result.node)
  assert.is(result.node.type, type)
})

test('Find node throws error', assert => {
  assert.throws(() => defaultTraveler.find(), TypeError)
})
