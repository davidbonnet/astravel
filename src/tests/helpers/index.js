import normalizeNewline from 'normalize-newline'
import { parse } from 'acorn'
import { readFileSync } from 'fs'
import { join } from 'path'

const DIRNAME = join(__dirname, '../fixtures')

export function getAst(
  filename,
  ecmaVersion,
  sourceType = 'module',
  onComment,
) {
  const options = {
    ecmaVersion,
    sourceType,
    locations: onComment != null,
    onComment,
  }
  const code = normalizeNewline(readFileSync(join(DIRNAME, filename), 'utf8'))
  const ast = parse(code, options)
  return ast
}
