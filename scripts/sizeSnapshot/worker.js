const { promisify } = require('util');
const webpackCallbackBased = require('webpack');
const { createWebpackConfig } = require('./webpack.config');

const webpack = promisify(webpackCallbackBased);

async function getSizes({ entry, webpackEnvironment, index, total }) {
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

module.exports = getSizes;
