import * as fs from 'fs'
import * as path from 'path'

/**
 * Init folder, can take one or several paths
 *
 * @param imagePaths path(s) to folders
 *
 */
export function initFolder(imagePaths: string[]) {
  for (let imagePath of imagePaths) {
    if (!fs.existsSync(path.resolve(imagePath))) {
      fs.mkdir(path.resolve(imagePath), { recursive: true }, console.log)
    }
  }
}
