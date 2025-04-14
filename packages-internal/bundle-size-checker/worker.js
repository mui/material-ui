// @ts-check

import { promisify } from 'util';
import path from 'path';
import webpackCallbackBased from 'webpack';
import CompressionPlugin from 'compression-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const webpack = promisify(webpackCallbackBased);
const rootDir = process.cwd();

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
 * Creates webpack configuration for bundle size checking
 * @param {WebpackEntry} entry
 * @param {Environment} environment
 * @returns {import('webpack').Configuration}
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
      path: path.join(rootDir, 'build'),
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
    context: rootDir,
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

export default async function getSizes({ entry, webpackEnvironment, index, total }) {
  const sizes = [];

  const configuration = createWebpackConfig(entry, webpackEnvironment);

  // eslint-disable-next-line no-console -- process monitoring
  console.log(`Compiling ${index + 1}/${total}: "${Object.keys(configuration.entry)}"`);

  const webpackStats = await webpack(configuration);

  if (webpackStats.hasErrors()) {
    const { entrypoints, errors } = webpackStats.toJson({
      all: false,
      entrypoints: true,
      errors: true,
    });
    throw new Error(
      `The following errors occurred during bundling of ${Object.keys(
        entrypoints,
      )} with webpack: \n${errors
        .map((error) => {
          return `${JSON.stringify(error, null, 2)}`;
        })
        .join('\n')}`,
    );
  }

  const stats = webpackStats.toJson({
    all: false,
    assets: true,
    entrypoints: true,
    relatedAssets: true,
  });
  const assets = new Map(stats.assets.map((asset) => [asset.name, asset]));

  Object.values(stats.entrypoints).forEach((entrypoint) => {
    let parsedSize = 0;
    let gzipSize = 0;

    entrypoint.assets.forEach(({ name, size }) => {
      const asset = assets.get(name);
      const gzippedAsset = asset.related.find((relatedAsset) => {
        return relatedAsset.type === 'gzipped';
      });

      parsedSize += size;
      gzipSize += gzippedAsset.size;
    });

    sizes.push([entrypoint.name, { parsed: parsedSize, gzip: gzipSize }]);
  });

  return sizes;
}
