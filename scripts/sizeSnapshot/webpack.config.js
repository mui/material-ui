const fse = require('fs-extra');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

const workspaceRoot = path.join(__dirname, '..', '..');

async function getSizeLimitBundles() {
  const buildId = await fse.readFile('.next/BUILD_ID', 'utf8');

  const dirname = '.next/static/chunks';
  const [main] = (await fse.readdir(dirname)).reduce((result, filename) => {
    if (filename.length === 31) {
      return [...result, { path: `${dirname}/${filename}` }];
    }

    return result;
  }, []);

  return [
    {
      name: '@material-ui/core/Paper',
      webpack: true,
      path: 'packages/material-ui/build/Paper/index.js',
    },
    {
      name: '@material-ui/core/Paper.esm',
      webpack: true,
      path: 'packages/material-ui/build/esm/Paper/index.js',
    },
    {
      name: '@material-ui/core',
      webpack: true,
      path: 'packages/material-ui/build/esm/index.js',
    },
    {
      name: '@material-ui/core/styles/createMuiTheme',
      webpack: true,
      path: 'packages/material-ui/build/esm/styles/createMuiTheme.js',
    },
    {
      name: '@material-ui/lab',
      webpack: true,
      path: 'packages/material-ui-lab/build/esm/index.js',
    },
    {
      name: '@material-ui/styles',
      webpack: true,
      path: 'packages/material-ui-styles/build/esm/index.js',
    },
    {
      name: '@material-ui/system',
      webpack: true,
      path: 'packages/material-ui-system/build/esm/index.js',
    },
    {
      name: 'colorManipulator',
      webpack: true,
      path: 'packages/material-ui/build/esm/styles/colorManipulator.js',
    },
    {
      // why we use esm here: https://github.com/mui-org/material-ui/pull/13391#issuecomment-459692816
      name: 'Button',
      webpack: true,
      path: 'packages/material-ui/build/esm/Button/index.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-modal
      // vs https://bundlephobia.com/result?p=@reach/dialog
      name: 'Modal',
      webpack: true,
      path: 'packages/material-ui/build/esm/Modal/index.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-popper
      name: '@material-ui/core/Popper',
      webpack: true,
      path: 'packages/material-ui/build/esm/Popper/index.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-responsive
      // vs https://bundlephobia.com/result?p=react-media
      name: '@material-ui/core/useMediaQuery',
      webpack: true,
      path: 'packages/material-ui/build/esm/useMediaQuery/index.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-focus-lock
      name: '@material-ui/core/TrapFocus',
      webpack: true,
      path: 'packages/material-ui/build/esm/Modal/TrapFocus.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-textarea-autosize
      // vs https://bundlephobia.com/result?p=react-autosize-textarea
      name: '@material-ui/core/Textarea',
      webpack: true,
      path: 'packages/material-ui/build/esm/InputBase/Textarea.js',
    },
    {
      name: 'docs.main',
      webpack: false,
      path: main.path,
    },
    {
      name: 'docs.landing',
      webpack: false,
      path: `.next/static/${buildId}/pages/index.js`,
    },
  ];
}

module.exports = getSizeLimitBundles;

module.exports = async function webpackConfig() {
  const entries = await getSizeLimitBundles();
  const entry = entries.reduce((acc, bundle) => {
    acc[bundle.name] = path.join(workspaceRoot, bundle.path);
    return acc;
  }, {});

  const config = {
    entry,
    // ideally this would be computed from the bundles peer dependencies
    externals: /^(react|react-dom)$/,
    mode: 'production',
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'build'),
    },
    plugins: [new CompressionPlugin()],
    resolve: {
      alias: {
        '@material-ui/core': path.join(workspaceRoot, 'packages/material-ui/build'),
        '@material-ui/lab': path.join(workspaceRoot, 'packages/material-ui-lab/build'),
        '@material-ui/styles': path.join(workspaceRoot, 'packages/material-ui-styles/build'),
        '@material-ui/system': path.join(workspaceRoot, 'packages/material-ui-system/build'),
        '@material-ui/utils': path.join(workspaceRoot, 'packages/material-ui-utils/build'),
      },
    },
  };

  return config;
};
