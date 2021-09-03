const { addWebpackAlias, override } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@mui/styled-engine': '@mui/styled-engine-sc',
  }),
);
