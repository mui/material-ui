const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const glob = require('fast-glob');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const workspaceRoot = path.join(__dirname, '..', '..');

async function getWebpackEntries() {
  const materialPackagePath = path.join(workspaceRoot, 'packages/mui-material/build');
  const materialComponents = (await glob(path.join(materialPackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));
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
        path: path.relative(workspaceRoot, path.dirname(componentPath)),
      };
    },
  );

  const corePackagePath = path.join(workspaceRoot, 'packages/mui-core/build');
  const coreComponents = (await glob(path.join(corePackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));

      return {
        name: componentName,
        path: path.relative(workspaceRoot, path.dirname(componentPath)),
      };
    },
  );

  const labPackagePath = path.join(workspaceRoot, 'packages/mui-lab/build');
  const labComponents = (await glob(path.join(labPackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));

      return {
        name: componentName,
        path: path.relative(workspaceRoot, path.dirname(componentPath)),
      };
    },
  );

  return [
    {
      // WARNING: Changing the name will break tracking of bundle size over time
      // If the name of the package changes, rename its display name in https://github.com/eps1lon/mui-contributor-dashboard/blob/main/src/pages/SizeComparison.tsx
      name: '@material-ui/core',
      path: path.join(path.relative(workspaceRoot, materialPackagePath), 'index.js'),
    },
    ...materialComponents,
    {
      name: '@material-ui/lab',
      path: path.join(path.relative(workspaceRoot, labPackagePath), 'index.js'),
    },
    ...labComponents,
    {
      name: '@material-ui/styles',
      path: 'packages/mui-styles/build/index.js',
    },
    {
      name: '@material-ui/private-theming',
      path: 'packages/mui-private-theming/build/index.js',
    },
    {
      name: '@material-ui/system',
      path: 'packages/mui-system/build/esm/index.js',
    },
    {
      name: 'createBox',
      path: 'packages/mui-system/build/esm/createBox.js',
    },
    {
      name: 'createStyled',
      path: 'packages/mui-system/build/esm/createStyled.js',
    },
    {
      name: '@material-ui/core/styles/createTheme',
      path: 'packages/mui-material/build/styles/createTheme.js',
    },
    {
      name: 'colorManipulator',
      path: 'packages/mui-system/build/colorManipulator.js',
    },
    {
      name: 'useAutocomplete',
      path: 'packages/mui-lab/build/useAutocomplete/index.js',
    },
    {
      name: '@material-ui/core/useMediaQuery',
      path: 'packages/mui-material/build/useMediaQuery/index.js',
    },
    {
      name: '@material-ui/core/useScrollTrigger',
      path: 'packages/mui-material/build/useScrollTrigger/index.js',
    },
    {
      name: '@material-ui/unstyled',
      path: path.join(path.relative(workspaceRoot, corePackagePath), 'index.js'),
    },
    ...coreComponents,
    {
      name: '@material-ui/utils',
      path: 'packages/mui-utils/build/esm/index.js',
    },
    // TODO: Requires webpack v5
    // Resolution of webpack/acorn to 7.x is blocked by nextjs (https://github.com/vercel/next.js/issues/11947)
    // {
    //   name: '@material-ui/core.modern',
    //   webpack: true,
    //   path: path.join(path.relative(workspaceRoot, materialPackagePath), 'modern/index.js'),
    // },
    {
      name: '@material-ui/core.legacy',
      path: path.join(path.relative(workspaceRoot, materialPackagePath), 'legacy/index.js'),
    },
  ];
}

module.exports = async function webpackConfig(webpack, environment) {
  const analyzerMode = environment.analyze ? 'static' : 'disabled';
  const concatenateModules = !environment.accurateBundles;

  const entries = await getWebpackEntries();
  const configurations = entries.map((entry) => {
    return {
      // ideally this would be computed from the bundles peer dependencies
      externals: /^(react|react-dom|react\/jsx-runtime)$/,
      mode: 'production',
      optimization: {
        concatenateModules,
        minimizer: [
          new TerserPlugin({
            test: /\.js(\?.*)?$/i,
          }),
        ],
      },
      output: {
        filename: '[name].js',
        path: path.join(__dirname, 'build'),
      },
      plugins: [
        new CompressionPlugin(),
        new BundleAnalyzerPlugin({
          analyzerMode,
          // We create a report for each bundle so around 120 reports.
          // Opening them all is spam.
          // If opened with `webpack --config . --analyze` it'll still open one new tab though.
          openAnalyzer: false,
          // '[name].html' not supported: https://github.com/webpack-contrib/webpack-bundle-analyzer/issues/12
          reportFilename: `${entry.name}.html`,
        }),
      ],
      resolve: {
        alias: {
          '@mui/material': path.join(workspaceRoot, 'packages/mui-material/build'),
          '@mui/lab': path.join(workspaceRoot, 'packages/mui-lab/build'),
          '@mui/styled-engine': path.join(workspaceRoot, 'packages/mui-styled-engine/build'),
          '@mui/styled-engine-sc': path.join(workspaceRoot, 'packages/mui-styles-sc/build'),
          '@mui/styles': path.join(workspaceRoot, 'packages/mui-styles/build'),
          '@mui/system': path.join(workspaceRoot, 'packages/mui-system/build'),
          '@mui/private-theming': path.join(workspaceRoot, 'packages/mui-private-theming/build'),
          '@mui/utils': path.join(workspaceRoot, 'packages/mui-utils/build'),
          '@mui/core': path.join(workspaceRoot, 'packages/mui-core/build'),
        },
      },
      entry: { [entry.name]: path.join(workspaceRoot, entry.path) },
    };
  });

  return configurations;
};
