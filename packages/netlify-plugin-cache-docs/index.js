/* eslint-disable no-console */
const path = require('path');
const fse = require('fs-extra');

const CACHE_OUTPUT_FILE = 'cache-output.json';

function generateAbsolutePaths(context) {
  const { constants } = context;

  const workspaceRoot = path.dirname(constants.CONFIG_PATH);
  const docsWorkspacePath = path.join(workspaceRoot, 'docs');

  const nextjsBuildDir = path.join(docsWorkspacePath, '.next');
  const digests = [path.join(workspaceRoot, 'pnpm-lock.yaml')];

  return { digests, nextjsBuildDir };
}

module.exports = {
  async onPreBuild(context) {
    const { constants, utils } = context;
    const { nextjsBuildDir } = generateAbsolutePaths({ constants });
    const success = await utils.cache.restore(nextjsBuildDir);

    console.log("'%s' exists: %s", nextjsBuildDir, String(fse.existsSync(nextjsBuildDir)));

    console.log(
      "Restored the cached 'docs/.next' folder at the location '%s': %s",
      nextjsBuildDir,
      String(success),
    );
  },
  async onPostBuild(context) {
    const { constants, utils } = context;
    const { digests, nextjsBuildDir } = generateAbsolutePaths({ constants });

    console.log("'%s' exists: %s", nextjsBuildDir, String(fse.existsSync(nextjsBuildDir)));

    const success = await utils.cache.save(nextjsBuildDir, {
      digests,
    });

    console.log(
      "Cached 'docs/.next' folder at the location '%s': %s",
      nextjsBuildDir,
      String(success),
    );
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
