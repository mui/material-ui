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
      }

      return {
        id: entryName,
        path: path.relative(workspaceRoot, path.dirname(componentPath)),
      };
    },
  );

  const corePackagePath = path.join(workspaceRoot, 'packages/mui-base/build');
  const coreComponents = (await glob(path.join(corePackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));
      let entryName = componentName;

      if (['Popper'].indexOf(componentName) !== -1) {
        entryName = `@material-ui/core/${componentName}`;
      }

      return {
        id: entryName,
        path: path.relative(workspaceRoot, path.dirname(componentPath)),
      };
    },
  );

  const labPackagePath = path.join(workspaceRoot, 'packages/mui-lab/build');
  const labComponents = (await glob(path.join(labPackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));

      return {
        id: componentName,
        path: path.relative(workspaceRoot, path.dirname(componentPath)),
      };
    },
  );

  const joyPackagePath = path.join(workspaceRoot, 'packages/mui-joy/build');
  const joyComponents = (await glob(path.join(joyPackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));

      return {
        id: `@mui/joy/${componentName}`,
        path: path.relative(workspaceRoot, path.dirname(componentPath)),
      };
    },
  );

  return [
    {
      // WARNING: Changing the name will break tracking of bundle size over time
      // If the name of the package changes, rename its display name in https://github.com/eps1lon/mui-contributor-dashboard/blob/main/src/pages/SizeComparison.tsx
      id: '@material-ui/core',
      path: path.join(path.relative(workspaceRoot, materialPackagePath), 'index.js'),
    },
    ...materialComponents,
    {
      id: '@material-ui/lab',
      path: path.join(path.relative(workspaceRoot, labPackagePath), 'index.js'),
    },
    ...labComponents,
    {
      id: '@material-ui/styles',
      path: 'packages/mui-styles/build/index.js',
    },
    {
      id: '@material-ui/private-theming',
      path: 'packages/mui-private-theming/build/index.js',
    },
    {
      id: '@material-ui/system',
      path: 'packages/mui-system/build/index.js',
    },
    {
      id: 'createBox',
      path: 'packages/mui-system/build/createBox/index.js',
    },
    {
      id: 'createStyled',
      path: 'packages/mui-system/build/createStyled/index.js',
    },
    {
      id: '@material-ui/core/styles/createTheme',
      path: 'packages/mui-material/build/styles/createTheme.js',
    },
    {
      id: 'colorManipulator',
      path: 'packages/mui-system/build/colorManipulator/index.js',
    },
    {
      id: 'useAutocomplete',
      path: 'packages/mui-lab/build/useAutocomplete/index.js',
    },
    {
      id: '@material-ui/core/useMediaQuery',
      path: 'packages/mui-material/build/useMediaQuery/index.js',
    },
    {
      id: '@material-ui/core/useScrollTrigger',
      path: 'packages/mui-material/build/useScrollTrigger/index.js',
    },
    {
      id: '@material-ui/unstyled',
      path: path.join(path.relative(workspaceRoot, corePackagePath), 'index.js'),
    },
    ...coreComponents,
    {
      id: '@material-ui/utils',
      path: 'packages/mui-utils/build/esm/index.js',
    },
    // TODO: Requires webpack v5
    // Resolution of webpack/acorn to 7.x is blocked by nextjs (https://github.com/vercel/next.js/issues/11947)
    // {
    //   id: '@material-ui/core.modern',
    //   webpack: true,
    //   path: path.join(path.relative(workspaceRoot, materialPackagePath), 'modern/index.js'),
    // },
    {
      id: '@mui/joy',
      path: path.join(path.relative(workspaceRoot, joyPackagePath), 'index.js'),
    },
    ...joyComponents,
  ];
}

function createWebpackConfig(entry, environment) {
  const analyzerMode = environment.analyze ? 'static' : 'disabled';
  const concatenateModules = !environment.accurateBundles;

  /**
   * @type {import('webpack').Configuration}
   */
  const configuration = {
    // ideally this would be computed from the bundles peer dependencies
    // Ensure that `react` as well as `react/*` are considered externals but not `react*`
    externals: /^(date-fns|dayjs|luxon|moment|react|react-dom)(\/.*)?$/,
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
      library: {
        // TODO: Use `type: 'module'` once it is supported (currently incompatible with `externals`)
        name: 'M',
        type: 'var',
        // type: 'module',
      },
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
        reportFilename: `${entry.id}.html`,
      }),
    ],
    entry: { [entry.id]: path.join(workspaceRoot, entry.path) },
    // TODO: 'browserslist:modern'
    // See https://github.com/webpack/webpack/issues/14203
    target: 'web',
  };

  return configuration;
}

exports.getWebpackEntries = getWebpackEntries;
exports.createWebpackConfig = createWebpackConfig;
