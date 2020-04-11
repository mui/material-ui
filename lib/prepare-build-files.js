const path = require('path');
const fse = require('fs-extra');

function copyReadme() {
  return fse
    .copyFile(
      path.resolve(__dirname, '..', 'README.md'),
      path.resolve(__dirname, 'build', 'README.md')
    )
    .then(() => console.log('> Copied README.md'));
}

function createAdapterPackageFile(name) {
  const packageJson = {
    name: `@material-ui/pickers-adapter-${name}`,
    module: 'index.js',
    main: 'index.cjs.js',
    typings: `../${name}.d.ts`,
  };

  return fse.writeFile(
    path.resolve(__dirname, 'build', 'adapter', name, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
}

function createAdaptersPackages() {
  return Promise.all(
    ['luxon', 'date-fns', 'dayjs', 'moment'].map(createAdapterPackageFile)
  ).then(() => console.log('> Created package.json files for adapters'));
}

function createRootPackageFile() {
  return fse
    .readFile(path.resolve(__dirname, 'package.json'), 'utf8')
    .then(data => JSON.parse(data))
    .then(packageData => {
      // cleanup produced package
      const {
        devDependencies,
        jest,
        husky,
        main,
        module,
        'lint-staged': ls,
        ...other
      } = packageData;

      const newPackage = {
        ...other,
        private: false,
        main: './dist/material-ui-pickers.js',
        module: './index.js',
        typings: './src/index.d.ts',
      };

      const buildPath = path.resolve(__dirname, 'build', 'package.json');
      const data = JSON.stringify(newPackage, null, 2);

      return fse
        .writeFile(buildPath, data)
        .then(() => console.log(`> Created package.json in ${buildPath}`));
    });
}

createRootPackageFile()
  .then(copyReadme)
  .then(createAdaptersPackages)
  .then(() => console.log('\nFinished build files preparation'))
  .catch(console.error);
