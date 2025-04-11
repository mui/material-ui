// @ts-check

const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const glob = require('fast-glob');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const workspaceRoot = path.join(__dirname, '..', '..');

/**
 * @typedef {object} WebpackEntry
 * @property {string} import
 * @property {string} [importName]
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
      return `@mui/material/${componentName}`;
    },
  );

  const labPackagePath = path.join(workspaceRoot, 'packages/mui-lab/build');
  const labComponents = (await glob(path.join(labPackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));
      return `@mui/lab/${componentName}`;
    },
  );

  return [
    '@mui/material',
    ...materialComponents,
    '@mui/lab',
    ...labComponents,
    '@mui/styles',
    '@mui/private-theming',
    '@mui/system',
    '@mui/system/createBox',
    '@mui/system/createStyled',
    '@mui/material/styles#createTheme',
    '@mui/system/colorManipulator',
    '@mui/lab/useAutocomplete',
    '@mui/material/useMediaQuery',
    '@mui/material/useScrollTrigger',
    '@mui/utils',
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

  const entryName = entry;
  const [importSrc, importName] = entryName.split('#');

  const importSpec = importName ? `{ ${importName} as foo }` : '* as foo';

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
          // Avoid creating LICENSE.txt files for each module
          // See https://github.com/webpack-contrib/terser-webpack-plugin#remove-comments
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
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
      new CompressionPlugin({
        filename: '[path][base][fragment].gz',
      }),
      new BundleAnalyzerPlugin({
        analyzerMode,
        // We create a report for each bundle so around 120 reports.
        // Opening them all is spam.
        // If opened with `webpack --config . --analyze` it'll still open one new tab though.
        openAnalyzer: false,
        // '[name].html' not supported: https://github.com/webpack-contrib/webpack-bundle-analyzer/issues/12
        reportFilename: `${importSrc}.html`,
      }),
    ],
    // A context to the current dir, which has a node_modules folder with workspace dependencies
    context: __dirname,
    entry: {
      // This format is a data: url combined with inline matchResource to obtain a virtual entry.
      // See https://github.com/webpack/webpack/issues/6437#issuecomment-874466638
      // See https://webpack.js.org/api/loaders/#inline-matchresource
      [entryName]: `./index.js!=!data:text/javascript,import ${importSpec} from '${importSrc}';console.log(foo);`,
    },
    // TODO: 'browserslist:modern'
    // See https://github.com/webpack/webpack/issues/14203
    target: 'web',
  };

  return configuration;
}

exports.getWebpackEntries = getWebpackEntries;
exports.createWebpackConfig = createWebpackConfig;
