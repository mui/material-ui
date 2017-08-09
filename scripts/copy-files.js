// @flow weak
/* eslint-disable no-console */

import path from 'path';
import fse from 'fs-extra';
import glob from 'glob';
import flowCopySource from 'flow-copy-source';

function copyFile(file) {
  const buildPath = path.resolve(__dirname, '../build/', path.basename(file));
  return new Promise(resolve => {
    fse.copy(file, buildPath, err => {
      if (err) throw err;
      resolve();
    });
  }).then(() => console.log(`Copied ${file} to ${buildPath}`));
}

function copyTypings(folder) {
  return new Promise(resolve => {
    glob(`${folder}/**/*.d.ts`, (err, files) => {
      if (err) throw err;
      console.log(files);
      resolve(files);
    });
  }).then(files => Promise.all(files.map(file => copyFile(file))));
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
      const {
        author,
        version,
        description,
        keywords,
        repository,
        license,
        bugs,
        homepage,
        peerDependencies,
        dependencies,
        typings,
      } = packageData;

      const minimalPackage = {
        name: 'material-ui',
        author,
        version,
        description,
        main: './index.js',
        module: './index.es.js',
        'jsnext:main': './index.es.js',
        keywords,
        repository,
        license,
        bugs,
        homepage,
        peerDependencies,
        dependencies,
        typings,
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
const typings = path.resolve(__dirname, '../typings');

Promise.all(files.map(file => copyFile(file)))
  .then(() => copyTypings(typings))
  .then(() => createPackageFile());

// Copy original implementation files for flow.
flowCopySource(['src'], 'build', { verbose: true, ignore: '**/*.spec.js' });
