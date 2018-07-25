const fs = require('fs');

function getMainFile() {
  const dirname = '.next/static/commons';
  const files = fs.readdirSync(dirname);
  const [file] = files
    .reduce((result, filename) => {
      if (!/^main-[a-f0-9]+\.js$/.test(filename)) {
        return result;
      }

      const path = `${dirname}/${filename}`;
      return [...result, { path, ctime: fs.statSync(path).ctimeMs }];
    }, [])
    .sort((x, y) => y.ctime - x.ctime);
  return file;
}

module.exports = [
  {
    name: 'The initial cost people pay for using one component',
    webpack: true,
    path: 'packages/material-ui/build/Paper/index.js',
    limit: '17.9 KB',
  },
  {
    name: 'The size of all the modules of material-ui.',
    webpack: true,
    path: 'packages/material-ui/build/index.js',
    limit: '95.1 KB',
  },
  {
    name: 'The main bundle of the docs',
    webpack: false,
    path: getMainFile().path,
    limit: '176 KB',
  },
  {
    name: 'The home page of the docs',
    webpack: false,
    path: '.next/bundles/pages/index.js',
    limit: '5.9 KB',
  },
];
