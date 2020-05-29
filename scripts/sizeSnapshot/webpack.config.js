const globCallback = require('glob');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const { promisify } = require('util');

const glob = promisify(globCallback);

const workspaceRoot = path.join(__dirname, '..', '..');

async function getSizeLimitBundles() {
  const corePackagePath = path.join(workspaceRoot, 'packages/material-ui/build/esm');
  const coreComponents = (await glob(path.join(corePackagePath, '[A-Z]*'))).map((componentPath) => {
    const componentName = path.basename(componentPath);
    let entryName = componentName;
    // adjust for legacy names
    if (componentName === 'Paper') {
      entryName = '@material-ui/core/Paper.esm';
    } else if (componentName === 'TextareaAutosize') {
      entryName = '@material-ui/core/Textarea';
    } else if (['Popper'].indexOf(componentName) !== -1) {
      entryName = `@material-ui/core/${componentName}`;
    }

    return {
      name: entryName,
      webpack: true,
      path: path.relative(workspaceRoot, componentPath),
    };
  });

  const labPackagePath = path.join(workspaceRoot, 'packages/material-ui-lab/build/esm');
  const labComponents = (await glob(path.join(labPackagePath, '[A-Z]*'))).map((componentPath) => {
    const componentName = path.basename(componentPath);

    return {
      name: componentName,
      webpack: true,
      path: path.relative(workspaceRoot, componentPath),
    };
  });

  return [
    {
      name: '@material-ui/core',
      webpack: true,
      path: path.join(path.relative(workspaceRoot, corePackagePath), 'index.js'),
    },
    {
      name: '@material-ui/lab',
      webpack: true,
      path: path.join(path.relative(workspaceRoot, labPackagePath), 'index.js'),
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
    ...coreComponents,
    {
      name: '@material-ui/core/styles/createMuiTheme',
      webpack: true,
      path: 'packages/material-ui/build/esm/styles/createMuiTheme.js',
    },
    {
      name: 'colorManipulator',
      webpack: true,
      path: 'packages/material-ui/build/esm/styles/colorManipulator.js',
    },
    ...labComponents,
    {
      name: 'useAutocomplete',
      webpack: true,
      path: 'packages/material-ui-lab/build/esm/useAutocomplete/index.js',
    },
    {
      name: '@material-ui/core/useMediaQuery',
      webpack: true,
      path: 'packages/material-ui/build/esm/useMediaQuery/index.js',
    },
    {
      name: '@material-ui/core/useScrollTrigger',
      webpack: true,
      path: 'packages/material-ui/build/esm/useScrollTrigger/index.js',
    },
    {
      name: '@material-ui/utils',
      webpack: true,
      path: 'packages/material-ui-utils/build/esm/index.js',
    },
  ];
}

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
