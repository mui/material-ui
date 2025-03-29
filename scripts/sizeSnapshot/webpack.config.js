// @ts-check

const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const glob = require('fast-glob');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const workspaceRoot = path.join(__dirname, '..', '..');

/**
 * @typedef {object} WebpackEntry
 * @property {string} id
 * @property {string} import
 * @property {string} [importName]
 * @property {string[]} [conditionNames]
 *
 * @typedef {object} Environment
 * @property {boolean} analyze
 * @property {boolean} accurateBundles
 */

/**
 *
 * @returns {Promise<WebpackEntry[]>}
 */
async function getWebpackEntries() {
  const materialPackagePath = path.join(workspaceRoot, 'packages/mui-material/build');
  const materialComponents = (await glob(path.join(materialPackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));

      return {
        id: componentName,
        import: `@mui/material/${componentName}`,
      };
    },
  );

  const labPackagePath = path.join(workspaceRoot, 'packages/mui-lab/build');
  const labComponents = (await glob(path.join(labPackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));

      return {
        id: componentName,
        import: `@mui/lab/${componentName}`,
      };
    },
  );

  return [
    {
      // WARNING: Changing the name will break tracking of bundle size over time
      // If the name of the package changes, rename its display name in https://github.com/eps1lon/mui-contributor-dashboard/blob/main/src/pages/SizeComparison.tsx
      id: '@mui/material',
      import: '@mui/material',
    },
    ...materialComponents,
    {
      id: '@mui/lab',
      import: '@mui/lab',
    },
    ...labComponents,
    {
      id: '@mui/styles',
      import: '@mui/styles',
    },
    {
      id: '@mui/private-theming',
      import: '@mui/private-theming',
    },
    {
      id: '@mui/system',
      import: '@mui/system',
    },
    {
      id: 'createBox',
      import: '@mui/system/createBox',
    },
    {
      id: 'createStyled',
      import: '@mui/system/createStyled',
    },
    {
      id: '@mui/styles/createTheme',
      importName: 'createTheme',
      import: '@mui/material/styles',
    },
    {
      id: 'colorManipulator',
      import: '@mui/system/colorManipulator',
    },
    {
      id: 'useAutocomplete',
      import: '@mui/lab/useAutocomplete',
    },
    {
      id: '@mui/material/useMediaQuery',
      import: '@mui/material/useMediaQuery',
    },
    {
      id: '@mui/material/useScrollTrigger',
      import: '@mui/material/useScrollTrigger',
    },
    {
      id: '@mui/utils',
      import: '@mui/utils',
    },
    {
      id: '@mui/material:mui-modern',
      import: '@mui/material',
      conditionNames: ['mui-modern', '...'],
    },
  ];
}

/**
 *
 * @param {WebpackEntry} entry
 * @param {Environment} environment
 * @returns
 */
function createWebpackConfig(entry, environment) {
  const analyzerMode = environment.analyze ? 'static' : 'disabled';
  const concatenateModules = !environment.accurateBundles;

  const importNames = entry.importName ? `{ ${entry.importName} as foo }` : '* as foo';

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
          test: /\.m?js(\?.*)?$/i,
        }),
      ],
    },
    resolve: {
      ...(entry.conditionNames ? { conditionNames: entry.conditionNames } : {}),
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
    // A context to the current dir, which has a node_modules folder with workspace dependencies
    context: __dirname,
    entry: {
      // This format is a data: url combined with inline matchResource to obtain a virtual entry.
      // See https://github.com/webpack/webpack/issues/6437#issuecomment-874466638
      // See https://webpack.js.org/api/loaders/#inline-matchresource
      [entry.id]: `./index.js!=!data:text/javascript,import ${importNames} from '${entry.import}';console.log(foo);`,
    },
    // TODO: 'browserslist:modern'
    // See https://github.com/webpack/webpack/issues/14203
    target: 'web',
  };

  return configuration;
}

exports.getWebpackEntries = getWebpackEntries;
exports.createWebpackConfig = createWebpackConfig;
