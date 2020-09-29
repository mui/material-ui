const { addWebpackAlias, override } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@material-ui/styled-engine': '@material-ui/styled-engine-sc',
  }),
);
