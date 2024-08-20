/* eslint-disable no-console */
import fs from 'fs/promises';

/**
 * README
 *
 * Description:
 *
 * This script copies the theme files from `docs/data/material/getting-started/templates/shared-theme` to each template's theme folder.
 * All other files should be managed in each template's theme folder, as are assumed to be unique.
 * To add a shared theme file, add it to the `shared-theme` folder and run this script.
 * To update a shared theme file, update it in the `shared-theme` folder and run this script.
 *
 * Usage:
 *
 * From the root of the project, run `pnpm template:update-theme`
 */

const THEME_SOURCE_FILES_PATH = 'docs/data/material/getting-started/templates/shared-theme';
const TEMPLATES_PATH = 'docs/data/material/getting-started/templates';
const TEMPLATES = [
  'blog',
  'checkout',
  'dashboard',
  'marketing-page',
  'sign-in',
  'sign-in-side',
  'sign-up',
];

async function traversePath(path: string, relativePath = '') {
  return fs.readdir(path, { withFileTypes: true }).then((subpaths) => {
    subpaths.forEach((subpath) => {
      const sourcePath = `${subpath.parentPath}/${subpath.name}`;
      if (subpath.isDirectory()) {
        traversePath(sourcePath, `${relativePath ? `${relativePath}/` : ''}${subpath.name}`);
      } else {
        TEMPLATES.forEach((template) => {
          const targetPath = `${TEMPLATES_PATH}/${template}/theme/${relativePath}/${subpath.name}`;
          fs.copyFile(sourcePath, targetPath);
        });
      }
    });
  });
}

(() => {
  traversePath(THEME_SOURCE_FILES_PATH)
    .then(() => {
      console.log('Successfully updated theme files');
    })
    .catch((error) => {
      console.error('Error while updating theme files:', error);
    });
})();
