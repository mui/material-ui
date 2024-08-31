/* eslint-disable no-console */
const path = require('path');
const fse = require('fs-extra');

const CACHE_OUTPUT_FILE = 'cache-output.json';

function generateAbsolutePaths(context) {
  const { constants } = context;

  const workspaceRoot = path.dirname(constants.CONFIG_PATH);
  const docsWorkspacePath = path.join(workspaceRoot, 'docs');

  const nextjsCacheDir = path.join(docsWorkspacePath, '.next', 'cache');

  return { nextjsCacheDir };
}

module.exports = {
  // Restore the `.next/cache` folder
  // based on: https://github.com/netlify/next-runtime/blob/733a0219e5413aa1eea790af48c745322dbce917/src/index.ts
  async onPreBuild(context) {
    const { constants, utils } = context;
    const { nextjsCacheDir } = generateAbsolutePaths({ constants });

    const cacheDirExists = fse.existsSync(nextjsCacheDir);
    console.log("'%s' exists: %s", nextjsCacheDir, String(cacheDirExists));

    const success = await utils.cache.restore(nextjsCacheDir);

    console.log("Restored the cached '%s' folder: %s", nextjsCacheDir, String(success));

    const restoredCacheDir = fse.existsSync(nextjsCacheDir);
    console.log("'%s' exists: %s", nextjsCacheDir, String(restoredCacheDir));
  },
  // On build, cache the `.next/cache` folder
  // based on: https://github.com/netlify/next-runtime/blob/733a0219e5413aa1eea790af48c745322dbce917/src/index.ts
  // This hook is called immediately after the build command is executed.
  async onBuild(context) {
    const { constants, utils } = context;
    const { nextjsCacheDir } = generateAbsolutePaths({ constants });

    const cacheExists = fse.existsSync(nextjsCacheDir);

    if (cacheExists) {
      console.log("'%s' exists: %s", nextjsCacheDir, String(cacheExists));

      const success = await utils.cache.save(nextjsCacheDir);

      console.log("Cached '%s' folder: %s", nextjsCacheDir, String(success));
    } else {
      console.log("'%s' does not exist", nextjsCacheDir);
    }
  },
  // debug
  // based on: https://github.com/netlify-labs/netlify-plugin-debug-cache/blob/v1.0.3/index.js
  async onEnd({ constants, utils }) {
    const { PUBLISH_DIR } = constants;
    const cacheManifestFileName = CACHE_OUTPUT_FILE;
    const cacheManifestPath = path.join(PUBLISH_DIR, cacheManifestFileName);
    console.log('Saving cache file manifest for debugging...');
    const files = await utils.cache.list();
    await fse.mkdirp(PUBLISH_DIR);
    await fse.writeJSON(cacheManifestPath, files, { spaces: 2 });
    console.log(`Cache file count: ${files.length}`);
    console.log(`Cache manifest saved to ${cacheManifestPath}`);
    console.log(`Please download the build files to inspect ${cacheManifestFileName}.`);
    console.log('Instructions => http://bit.ly/netlify-dl-cache');
  },
};
