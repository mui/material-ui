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
    limit: '17.7 KB',
  },
  {
    name: 'The size of all the material-ui modules.',
    webpack: true,
    path: 'packages/material-ui/build/index.js',
    limit: '93.4 KB',
  },
  {
    name: 'The main docs bundle',
    webpack: false,
    path: main.path,
    limit: '177 KB',
  },
  {
    name: 'The docs home page',
    webpack: false,
    path: `.next/static/${buildId}/pages/index.js`,
    limit: '6 KB',
  },
];
