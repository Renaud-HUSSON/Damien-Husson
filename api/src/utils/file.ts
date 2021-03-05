import { rm, writeFile } from 'fs'

/**
 * Deletes a file asynchronously
 *
 * @param path Path of the file you want to delete
 *
 * @returns Promise
 *
 */
export function promisifiedDeleteFile(path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    return rm(path, (err) => {
      if (err) return reject(err)

      resolve()
    })
  })
}

/**
 * Writes a file asynchronously
 *
 * @param path The path to the upload location, containing the filename
 * @param buffer The file buffer
 *
 * @returns Promise
 *
 */
export function promisifiedWriteFile(
  path: string,
  buffer: Buffer
): Promise<void> {
  return new Promise((resolve, reject) => {
    return writeFile(path, buffer, (err) => {
      if (err) return reject(err)

      return resolve()
    })
  })
}

/**
 * Deletes and upload a new file
 *
 * @param oldPath Old path to the file you want to delete
 * @param newPath New path to the upload location
 * @param buffer The file buffer
 *
 */
export async function deleteOldFileAndCreateAnother(
  oldPath: string,
  newPath: string,
  buffer: Buffer
): Promise<void> {
  await promisifiedDeleteFile(oldPath).catch((_err) => {})
  await promisifiedWriteFile(newPath, buffer)
}
