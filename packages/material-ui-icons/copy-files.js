// @flow weak
/* eslint-disable no-console */

import path from 'path';
import fse from 'fs-extra';

function copyFile(file) {
  const buildPath = path.resolve(__dirname, './build/', path.basename(file));
  return new Promise(resolve => {
    fse.copy(file, buildPath, err => {
      if (err) throw err;
      resolve();
    });
  }).then(() => console.log(`Copied ${file} to ${buildPath}`));
}

function createPackageFile() {
  return new Promise(resolve => {
    fse.readFile(path.resolve(__dirname, './package.json'), 'utf8', (err, data) => {
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
      } = packageData;

      const minimalPackage = {
        name: 'material-ui-icons',
        author,
        version,
        description,
        keywords,
        repository,
        license,
        bugs,
        homepage,
        dependencies: {
          recompose: '^0.22.0',
        },
        peerDependencies: {
          react: '^15.0.0',
          'react-dom': '^15.0.0',
          'material-ui': '^1.0.0-alpha',
        },
      };

      return new Promise(resolve => {
        const buildPath = path.resolve(__dirname, './build/package.json');
        const data = JSON.stringify(minimalPackage, null, 2);
        fse.writeFile(buildPath, data, err => {
          if (err) throw err;
          console.log(`Created package.json in ${buildPath}`);
          resolve();
        });
      });
    });
}

const files = ['../../LICENSE', './README.md'];

Promise.all(files.map(file => copyFile(file))).then(() => createPackageFile());
