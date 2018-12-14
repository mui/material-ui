const fs = require('fs');

const buildId = fs.readFileSync('.next/BUILD_ID', 'utf8');

const dirname = '.next/static/chunks';
const [main] = fs.readdirSync(dirname).reduce((result, filename) => {
  if (filename.length === 31) {
    return [...result, { path: `${dirname}/${filename}` }];
  }

  return result;
}, []);

module.exports = [
  {
    name: 'The initial cost paid for using one component',
    webpack: true,
    path: 'packages/material-ui/build/Paper/index.js',
    limit: '18.6 KB',
  },
  {
    name: 'The size of the @material-ui/core modules',
    webpack: true,
    path: 'packages/material-ui/build/index.js',
    limit: '91.9 KB',
  },
  {
    name: 'The size of the @material-ui/styles modules',
    webpack: true,
    path: 'packages/material-ui-styles/build/index.js',
    limit: '14.7 KB',
  },
  {
    // vs https://bundlephobia.com/result?p=react-popper
    name: 'The size of the @material-ui/core/Popper component',
    webpack: true,
    path: 'packages/material-ui/build/Popper/index.js',
    limit: '9.8 KB',
  },
  {
    name: 'The main docs bundle',
    webpack: false,
    path: main.path,
    limit: '176.1 KB',
  },
  {
    name: 'The docs home page',
    webpack: false,
    path: `.next/static/${buildId}/pages/index.js`,
    limit: '5.7 KB',
  },
];
