import { join } from 'path'

import { parse } from './parse'

const DIRNAME = join(__dirname, '../fixtures')

export async function parseFixture(fileName, options) {
  return await parse(join(DIRNAME, fileName), options)
}
