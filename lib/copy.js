const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');

function copyTypings(from, to) {
  const files = glob.sync('**/*.d.ts', { cwd: from });
  const cmds = files.map(file => fse.copy(path.resolve(from, file), path.resolve(to, file)));
  return Promise.all(cmds);
}

function copyReadme() {
  return fse.copyFile(path.resolve(__dirname, '..', 'README.md'), path.resolve(__dirname, 'build', 'README.md'));
}

function createPackageFile() {
  return new Promise((resolve) => {
    fse.readFile(path.resolve(__dirname, 'package.json'), 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      resolve(data);
    });
  })
    .then(data => JSON.parse(data))
    .then((packageData) => {
      const newPackage = {
        ...packageData,
        main: './dist/material-ui-pickers.cjs.js',
        module: './src/index.js',
        private: false,
      };

      return new Promise((resolve) => {
        const buildPath = path.resolve(__dirname, 'build', 'package.json');
        const data = JSON.stringify(newPackage, null, 2);
        fse.writeFile(buildPath, data, (err) => {
          if (err) throw err;
          console.log(`Created package.json in ${buildPath}`);
          resolve();
        });
      });
    });
}

createPackageFile()
  .then(() => copyTypings(path.resolve(__dirname, 'src'), path.resolve(__dirname, 'build/src')))
  .then(() => copyReadme());
