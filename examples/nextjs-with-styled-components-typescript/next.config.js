const withTM = require('next-transpile-modules')(['@mui/material', '@material-ui/system']); // pass the modules you would like to see transpiled

module.exports = withTM({
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@material-ui/styled-engine': '@material-ui/styled-engine-sc',
    };
    return config;
  },
});
