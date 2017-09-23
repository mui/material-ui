// @flow weak
/* eslint-disable no-console */

import path from 'path';
import fse from 'fs-extra';
import flowCopySource from 'flow-copy-source';
import glob from 'glob';

function copyFile(file) {
  const buildPath = path.resolve(__dirname, '../build/', path.basename(file));
  return new Promise(resolve => {
    fse.copy(file, buildPath, err => {
      if (err) throw err;
      resolve();
    });
  }).then(() => console.log(`Copied ${file} to ${buildPath}`));
}

function copyTypings(from, to) {
  const files = glob.sync('**/*.d.ts', { cwd: from });
  const cmds = files.map(file => fse.copy(path.resolve(from, file), path.resolve(to, file)));
  return Promise.all(cmds);
}

function createPackageFile() {
  return new Promise(resolve => {
    fse.readFile(path.resolve(__dirname, '../package.json'), 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      resolve(data);
    });
  })
    .then(data => JSON.parse(data))
    .then(packageData => {
      const { nyc, ...packageDataOther } = packageData;

      const minimalPackage = {
        ...packageDataOther,
        name: 'material-ui',
        main: './index.js',
        module: './index.es.js',
        'jsnext:main': './index.es.js',
        private: false,
      };

      return new Promise(resolve => {
        const buildPath = path.resolve(__dirname, '../build/package.json');
        const data = JSON.stringify(minimalPackage, null, 2);
        fse.writeFile(buildPath, data, err => {
          if (err) throw err;
          console.log(`Created package.json in ${buildPath}`);
          resolve();
        });
      });
    });
}

const files = ['README.md', 'CHANGELOG.md', 'LICENSE'];

Promise.all(files.map(file => copyFile(file)))
  .then(() => createPackageFile())
  .then(() => copyTypings(path.resolve(__dirname, '../src'), path.resolve(__dirname, '../build')));

// Copy original implementation files for flow.
flowCopySource(['src'], 'build', { verbose: true, ignore: '**/*.spec.js' });
