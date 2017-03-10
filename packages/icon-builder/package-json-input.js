// @flow weak
const buildPackage = require('./package.json');

module.exports = {
  name: 'material-ui-icons',
  author: buildPackage.author,
  version: buildPackage.version,
  description: buildPackage.description,
  keywords: buildPackage.keywords,
  repository: buildPackage.repository,
  license: buildPackage.license,
  bugs: buildPackage.bugs,
  homepage: buildPackage.homepage,
  dependencies: {
    recompose: '^0.22.0',
  },
  peerDependencies: {
    react: '^15.0.0',
    'react-dom': '^15.0.0',
    'material-ui': '^1.0.0-alpha',
  },
};
