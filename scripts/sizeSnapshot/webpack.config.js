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

  // WARNING: Don't change the `id`. It is used to track the size over time.
  // The IDs have historic origin. They are not necessarily derived from the path
  // or module name.
  // If you want to adjust the name displayed in the mui-pr-bot comment change the LABELS
  // in the dangerfile.js
  return [
    {
      id: '@material-ui/core/Paper',
      webpack: true,
      path: 'packages/material-ui/build/Paper/index.js',
    },
    {
      id: '@material-ui/core/Paper.esm',
      webpack: true,
      path: 'packages/material-ui/build/esm/Paper/index.js',
    },
    {
      id: '@material-ui/core',
      webpack: true,
      path: 'packages/material-ui/build/index.js',
    },
    {
      id: '@material-ui/core/styles/createMuiTheme',
      webpack: true,
      path: 'packages/material-ui/build/styles/createMuiTheme.js',
    },
    {
      id: '@material-ui/lab',
      webpack: true,
      path: 'packages/material-ui-lab/build/index.js',
    },
    {
      id: '@material-ui/styles',
      webpack: true,
      path: 'packages/material-ui-styles/build/index.js',
    },
    {
      id: '@material-ui/system',
      webpack: true,
      path: 'packages/material-ui-system/build/index.js',
    },
    {
      id: 'colorManipulator',
      webpack: true,
      path: 'packages/material-ui/build/styles/colorManipulator.js',
    },
    {
      // why we use esm here: https://github.com/mui-org/material-ui/pull/13391#issuecomment-459692816
      id: 'Button',
      webpack: true,
      path: 'packages/material-ui/build/esm/Button/index.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-modal
      id: 'Modal',
      webpack: true,
      path: 'packages/material-ui/build/esm/Modal/index.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-popper
      id: '@material-ui/core/Popper',
      webpack: true,
      path: 'packages/material-ui/build/esm/Popper/index.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-responsive
      // vs https://bundlephobia.com/result?p=react-media
      id: '@material-ui/core/useMediaQuery',
      webpack: true,
      path: 'packages/material-ui/build/useMediaQuery/index.js',
    },
    {
      id: 'docs.main',
      webpack: false,
      path: main.path,
    },
    {
      id: 'docs.landing',
      webpack: false,
      path: `.next/static/${buildId}/pages/index.js`,
    },
  ];
}

module.exports = getSizeLimitBundles;

module.exports = new Promise(async resolve => {
  const entry = (await getSizeLimitBundles()).reduce((acc, bundle) => {
    acc[bundle.id] = path.join(workspaceRoot, bundle.path);
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

  resolve(config);
});
