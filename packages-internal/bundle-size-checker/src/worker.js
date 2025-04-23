import { promisify } from 'util';
import path from 'path';
import webpackCallbackBased from 'webpack';
import CompressionPlugin from 'compression-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

/**
 * @type {(options: webpackCallbackBased.Configuration) => Promise<webpackCallbackBased.Stats>}
 */
// @ts-expect-error Can't select the right overload
const webpack = promisify(webpackCallbackBased);
const rootDir = process.cwd();

// Type declarations are now in types.d.ts

/**
 * Creates webpack configuration for bundle size checking
 * @param {string} entryName - Entry point string
 * @param {CommandLineArgs} args
 * @returns {import('webpack').Configuration}
 */
function createWebpackConfig(entryName, args) {
  const analyzerMode = args.analyze ? 'static' : 'disabled';
  const concatenateModules = !args.accurateBundles;

  const [importSrc, importName] = entryName.split('#');

  const entryContent = importName
    ? `import { ${importName} as foo } from '${importSrc}';console.log(foo);`
    : `import * as foo from '${importSrc}';console.log(foo);`;

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
      [entryName]: `./index.js!=!data:text/javascript,${entryContent}`,
    },
    // TODO: 'browserslist:modern'
    // See https://github.com/webpack/webpack/issues/14203
    target: 'web',
  };

  return configuration;
}

/**
 * Get sizes for a bundle
 * @param {{ entry: string, args: CommandLineArgs, index: number, total: number }} options
 * @returns {Promise<Array<[string, { parsed: number, gzip: number }]>>}
 */
export default async function getSizes({ entry, args, index, total }) {
  /** @type {Array<[string, { parsed: number, gzip: number }]>} */
  const sizes = [];

  const configuration = createWebpackConfig(entry, args);

  // eslint-disable-next-line no-console -- process monitoring
  console.log(`Compiling ${index + 1}/${total}: "${entry}"`);

  const webpackStats = await webpack(configuration);

  if (!webpackStats) {
    throw new Error('No webpack stats were returned');
  }

  if (webpackStats.hasErrors()) {
    const statsJson = webpackStats.toJson({
      all: false,
      entrypoints: true,
      errors: true,
    });

    const entrypointKeys = statsJson.entrypoints ? Object.keys(statsJson.entrypoints) : [];

    throw new Error(
      `The following errors occurred during bundling of ${entrypointKeys.join(', ')} with webpack: \n${(
        statsJson.errors || []
      )
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

  if (!stats.assets) {
    return sizes;
  }

  const assets = new Map(stats.assets.map((asset) => [asset.name, asset]));

  if (stats.entrypoints) {
    Object.values(stats.entrypoints).forEach((entrypoint) => {
      let parsedSize = 0;
      let gzipSize = 0;

      if (entrypoint.assets) {
        entrypoint.assets.forEach(({ name, size }) => {
          const asset = assets.get(name);
          if (asset && asset.related) {
            const gzippedAsset = asset.related.find((relatedAsset) => {
              return relatedAsset.type === 'gzipped';
            });

            if (size !== undefined) {
              parsedSize += size;
            }

            if (gzippedAsset && gzippedAsset.size !== undefined) {
              gzipSize += gzippedAsset.size;
            }
          }
        });
      }

      if (!entrypoint.name) {
        throw new Error('Entrypoint name is undefined');
      }

      sizes.push([entrypoint.name, { parsed: parsedSize, gzip: gzipSize }]);
    });
  }

  return sizes;
}
