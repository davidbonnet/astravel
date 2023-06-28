import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import { parse } from './parse.js'

const filename = fileURLToPath(import.meta.url)
const directory = dirname(filename)
const DIRNAME = join(directory, '../fixtures')

export async function parseFixture(fileName, options) {
  return await parse(join(DIRNAME, fileName), options)
}
