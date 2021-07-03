module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['@material-ui/styled-engine'] = '@material-ui/styled-engine-sc';
    return config;
  },
};
