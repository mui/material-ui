import path from 'path';
import url from 'url';
import fs from 'fs/promises';

/**
 * Returns the full path of the root directory of this repository.
 * @returns {string}
 */
// eslint-disable-next-line import/prefer-default-export
export function getWorkspaceRoot() {
  const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
  const workspaceRoot = path.resolve(currentDirectory, '..');
  return workspaceRoot;
}

/**
 * @param {string} file
 * @param {string} dir
 * @returns {Promise<string | null>}
 */
export async function findUp(file, dir = process.cwd()) {
  if (!path.isAbsolute(dir)) {
    throw new Error(`Path "${dir}" must be absolute`);
  }
  while (path.relative(dir, '/') !== '') {
    const filepath = path.resolve(dir, file);
    try {
      // eslint-disable-next-line no-await-in-loop
      await fs.stat(filepath);
      return filepath;
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }
    dir = path.dirname(dir);
  }
  return null;
}
