import { dirname, join } from 'path'
import { readdir, lstatSync } from 'fs'
import { promisify } from 'util'

const readdirAsync = promisify(readdir)

import { getDependents } from './getDependents'

export default async function getUnused(fileName) {
  const rootFolder = dirname(fileName)
  const dependents = await getDependents(fileName)
  const usedFiles = Object.keys(dependents)
    .map((fileName) => join(rootFolder, fileName))
    .reduce((result, fileName) => {
      result[fileName] = true
      return result
    }, {})
  checkFolder(rootFolder, usedFiles)
}

async function checkFolder(folderName, usedFiles) {
  let fileNames = await readdirAsync(folderName)
  for (let fileName of fileNames) {
    const fullPath = join(folderName, fileName)
    if (!fullPath.endsWith('.js')) {
      if (lstatSync(fullPath).isDirectory()) {
        checkFolder(fullPath, usedFiles)
      }
      continue
    }
    if (!(fullPath in usedFiles)) {
      // eslint-disable-next-line no-console
      console.log('Not used:', fullPath)
    }
  }
}
