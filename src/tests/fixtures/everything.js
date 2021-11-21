import a from 'a'
import b, { c } from 'b'
import { d as e } from 'c'
import * as f from 'd'

export { g } from 'd'
export const h = a
export * from 'e'

export default class Class {
  constructor() {
    this.bound = () => {}
    this.otherBound = a => ({})
  }
  static s() {}
  m() {
    new.target
    this.isEverything = 42
  }
}

const ClassExpression = class extends Class {}

function callable(a, b, c = 42) {
  let d = a
  var e = b
  const f = c
  const { g, h, i } = e
  const [j, k, l] = array
  return c === 42 ? a : b
}

function* generator() {
  yield
  yield 42
}

async function asyncFunction() {
  return await answer()
}

async function asyncLoop() {
  for await (const x of generator) {
  }
}

function branches() {
  if (a > 0) {
    callable(...a)
  } else if (a < 0) {
    callable(1)
  } else {
    callable(2)
  }
  if (a == 0) {
  }
  label: switch (a) {
    case 1:
      break label
    default:
      break
  }
  return
}

function loops() {
  otherLabel: for (let i = 0; i < a.length; i++) {
    if (i < 10) {
      continue otherLabel
    } else {
      continue
    }
  }
  for (;;) {}
  for (let name in object) {
  }
  for (let name of array) {
  }
  while (i < 0) {}
  do {} while (i < 0)
}

function exceptions() {
  try {
    throw new Error()
  } catch (error) {
    callable(error)
  } finally {
    callable(42)
  }
  try {
  } catch (error) {}
  try {
  } catch {}
}

function patterns() {
  const { a, [b]: c, ...rest } = object
  const [d, e] = array
}

const instance = new Class()

const data = {
  a,
  b: c,
  m() {},
  ...d,
}

const object = {
  a: 42,
  b: '42',
  c: 1 + 1,
  d: 2 * 2,
  f: 2 / 2,
  g: 3 - 2,
  h: 2 % 2,
  i: 1.5 | 0,
  j: 1 ^ 2,
  k: 1 & 2,
  l: 'test' in data,
  m: 1 == 2,
  n: 1 != 2,
  o: 1 === 2,
  p: 1 !== 2,
  q: 1 instanceof Number,
  r: 1 || 2,
  s: 1 && 2,
  t: (1, 2),
  u: 1 > 2,
  v: 1 < 2,
  w: 1 >= 2,
  x: 1 <= 2,
  y: 42 ** 2,
}

object.a = 42
object.a += 42
object.a -= 42
object.a *= 42
object.a /= 42
object.a %= 1
object.a++
++object.a
object.a--
--object.a
object.a = -object.a
object.a **= 2

const array = [1, 2, 3, , 4, ...a]

const template = `Answer is ${42}`

const formattedTemplate = format`Answer is ${a}`
