// @flow weak
/* eslint-disable no-console */

import path from 'path';
import fse from 'fs-extra';
import initPackage from 'init-package-json';

function copyFile(file) {
  const buildPath = path.resolve(__dirname, './build/', path.basename(file));
  return new Promise((resolve) => {
    fse.copy(
      file,
      buildPath,
      (err) => {
        if (err) throw err;
        resolve();
      },
    );
  })
  .then(() => console.log(`Copied ${file} to ${buildPath}`));
}

function createPackageFile() {
  return new Promise((resolve) => {
    const buildPath = path.resolve(__dirname, './build');
    const inputPath = path.resolve(__dirname, './package-json-input.js');

    initPackage(buildPath, inputPath, (err) => {
      if (err) throw (err);
      console.log(`Created package.json in ${buildPath}`);
      resolve();
    });
  });
}

const files = [
  '../../LICENSE',
];

Promise
  .all(files.map((file) => copyFile(file)))
  .then(() => createPackageFile());
