import normalizeNewline from 'normalize-newline'
import { parse as baseParse } from 'meriyah'
import { readFile } from 'fs'
import { promisify } from 'util'

const readFileAsync = promisify(readFile)

export async function parse(fileName, parserOptions = null) {
  const code = await readFileAsync(fileName, 'utf8')
  return baseParse(normalizeNewline(code), {
    module: true,
    jsx: true,
    specDeviation: true,
    next: true,
    ...parserOptions,
  })
}
