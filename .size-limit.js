const fs = require('fs');

const buildId = fs.readFileSync('.next/BUILD_ID', 'utf8');

const dirname = '.next/static/chunks';
const [main] = fs.readdirSync(dirname).reduce((result, filename) => {
  if (filename.length === 23) {
    return [...result, { path: `${dirname}/${filename}` }];
  }

  return result;
}, []);

module.exports = [
  {
    name: 'The initial cost people pay for using one component',
    webpack: true,
    path: 'packages/material-ui/build/Paper/index.js',
    limit: '17.6 KB',
  },
  {
    name: 'The size of all the modules of material-ui.',
    webpack: true,
    path: 'packages/material-ui/build/index.js',
    limit: '90.1 KB',
  },
  {
    name: 'The main bundle of the docs',
    webpack: false,
    path: main.path,
    limit: '178 KB',
  },
  {
    name: 'The home page of the docs',
    webpack: false,
    path: `.next/static/${buildId}/pages/index.js`,
    limit: '6 KB',
  },
];
