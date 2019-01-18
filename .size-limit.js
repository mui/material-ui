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
    limit: '18.7 KB',
  },
  {
    name: 'The size of the @material-ui/core modules',
    webpack: true,
    path: 'packages/material-ui/build/index.js',
    limit: '95.3 KB',
  },
  {
    name: 'The size of the @material-ui/styles modules',
    webpack: true,
    path: 'packages/material-ui-styles/build/index.js',
    limit: '16.6 KB',
  },
  {
    name: 'The size of the @material-ui/system modules',
    webpack: true,
    path: 'packages/material-ui-system/build/index.js',
    limit: '3.9 KB',
  },
  {
    name: 'The size of the color manipulator helpers',
    webpack: true,
    path: 'packages/material-ui/build/styles/colorManipulator.js',
    limit: '900 B',
  },
  {
    // vs https://bundlephobia.com/result?p=react-popper
    name: 'The size of the @material-ui/core/Popper component',
    webpack: true,
    path: 'packages/material-ui/build/Popper/index.js',
    limit: '10.7 KB',
  },
  {
    // vs https://bundlephobia.com/result?p=react-responsive
    // vs https://bundlephobia.com/result?p=react-media
    name: 'The size of the @material-ui/core/useMediaQuery component',
    webpack: true,
    path: 'packages/material-ui/build/useMediaQuery/index.js',
    limit: '700 B',
  },
  {
    name: 'The main docs bundle',
    webpack: false,
    path: main.path,
    limit: '189 KB',
  },
  {
    name: 'The docs home page',
    webpack: false,
    path: `.next/static/${buildId}/pages/index.js`,
    limit: '6 KB',
  },
];
