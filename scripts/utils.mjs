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
 * Find a file or directory by walking up parent directories.
 * @param {string} file
 * @param {string} dir
 * @returns {Promise<string | null>}
 */
export async function findUp(file, dir = process.cwd()) {
  if (!path.isAbsolute(dir)) {
    throw new Error(`Path "${dir}" must be absolute`);
  }

  const filepath = path.resolve(dir, file);
  try {
    await fs.stat(filepath);
    return filepath;
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }

  if (path.relative(dir, '/') === '') {
    return null;
  }

  return findUp(file, path.dirname(dir));
}
