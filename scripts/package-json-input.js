// @flow weak
const buildPackage = require('../package.json');

module.exports = {
  name: 'material-ui',
  author: buildPackage.author,
  version: buildPackage.version,
  description: buildPackage.description,
  main: './index.js',
  module: './index.es.js',
  'jsnext:main': './index.es.js',
  keywords: buildPackage.keywords,
  repository: buildPackage.repository,
  license: buildPackage.license,
  bugs: buildPackage.bugs,
  homepage: buildPackage.homepage,
  peerDependencies: buildPackage.peerDependencies,
  dependencies: buildPackage.dependencies,
};
