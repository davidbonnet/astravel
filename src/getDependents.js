import { isAbsolute, join, relative, dirname } from 'path'

import { parse } from './parse'
import { defaultTraveler } from './defaultTraveler'

const { resolve: requireResolve } = require

function resolve(path, options) {
  try {
    return requireResolve(path, options)
  } catch (error) {
    return false
  }
}

export async function getDependents(
  fileName,
  options = {
    rootFolder: dirname(fileName),
  },
  currentDependents = {
    [relative(options.rootFolder, fileName)]: {},
  },
) {
  if (/\/node_modules\//.test(fileName)) {
    return currentDependents
  }
  const { rootFolder } = options
  const ast = await parse(fileName, options.parserOptions)
  const dependents = {}
  const state = {
    fileName: relative(rootFolder, fileName),
    dependents,
    folderName: dirname(fileName),
    rootFolder,
  }
  traveler.go(ast, state)
  for (let dependency in dependents) {
    if (dependency in currentDependents) {
      currentDependents[dependency] = Object.assign(
        currentDependents[dependency],
        dependents[dependency],
      )
      continue
    }
    currentDependents[dependency] = dependents[dependency]
    if (!dependency.endsWith('.js')) {
      continue
    }
    currentDependents = await getDependents(
      join(rootFolder, dependency),
      options,
      currentDependents,
    )
  }
  return currentDependents
}

let ImportDeclaration

const traveler = defaultTraveler.makeChild({
  ImportDeclaration: (ImportDeclaration = (node, state) => {
    if (!node.source) {
      if (node.declaration && this[node.declaration.type]) {
        this[node.declaration.type](node.declaration, state)
      }
      return
    }
    const { dependents, fileName, folderName, rootFolder } = state
    const { value } = node.source
    const dependencyName = resolve(value, { paths: [folderName] })
    if (!dependencyName) {
      return
    }
    const relativeDependencyName = !isAbsolute(dependencyName)
      ? dependencyName
      : // TODO: Expose `resolve` option
        relative(rootFolder, resolve(value, { paths: [folderName] }))
    const dependent =
      dependents[relativeDependencyName] ||
      (dependents[relativeDependencyName] = {})
    dependent[fileName] = true
  }),
  ImportExpression: ImportDeclaration,
  ExportAllDeclaration: ImportDeclaration,
  ExportNamedDeclaration: ImportDeclaration,
  // TODO: Look for require() usage with scope
  CallExpression(node, state) {
    const { callee, arguments: values } = node
    if (
      callee.type[0] !== 'I' ||
      callee.name !== 'require' ||
      values.length !== 1 ||
      values[0].type[0] !== 'L'
    ) {
      return this.super.CallExpression.call(this, node, state)
    }
    const [{ value }] = values
    const { dependents, fileName, folderName, rootFolder } = state
    const dependencyName = resolve(value, { paths: [folderName] })
    if (!dependencyName) {
      return
    }
    const relativeDependencyName = !isAbsolute(dependencyName)
      ? dependencyName
      : // TODO: Expose `resolve` option
        relative(rootFolder, resolve(value, { paths: [folderName] }))
    const dependent =
      dependents[relativeDependencyName] ||
      (dependents[relativeDependencyName] = {})
    dependent[fileName] = true
  },
})
