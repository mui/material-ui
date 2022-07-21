/* eslint-disable no-console */
/**
 * Given the dist tag fetch the corresponding
 * version and make sure this version is used throughout the repository.
 *
 * If you work on this file:
 * WARNING: This script can only use built-in modules since it has to run before
 * `yarn install`
 */
const childProcess = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { promisify } = require('util');

const exec = promisify(childProcess.exec);

// packages published from the react monorepo using the same version
const reactPackageNames = ['react', 'react-dom', 'react-is', 'react-test-renderer', 'scheduler'];
const devDependenciesPackageNames = ['@mnajdova/enzyme-adapter-react-18', '@testing-library/react'];

// if we need to support more versions we will need to add new mapping here
const additionalVersionsMappings = {
  '17': {
    scheduler: '^0.20.0',
    '@mnajdova/enzyme-adapter-react-18': 'npm:@eps1lon/enzyme-adapter-react-17',
    '@testing-library/react': '^12.1.0',
  },
};

async function main(options) {
  const { distTag } = options;
  if (typeof distTag !== 'string') {
    throw new TypeError(`expected distTag: string but got '${distTag}'`);
  }

  if (distTag === 'stable') {
    console.log('Nothing to do with stable');
    return;
  }

  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf8' }));

  let majorVersion = null;

  if (distTag.startsWith('^') || distTag.startsWith('~') || !isNaN(distTag.charAt(0))) {
    majorVersion = distTag.replace('^', '').replace('~', '').split('.')[0];
  }

  if (majorVersion) {
    if (Object.keys(additionalVersionsMappings).indexOf(majorVersion) < 0) {
      console.log(
        `This version is not supported. This is the list of all supported versions: ${Object.keys(
          additionalVersionsMappings,
        )}`,
      );
      return;
    }
  }

  await Promise.all(
    reactPackageNames.map(async (reactPackageName) => {
      const { stdout: versions } = await exec(`npm dist-tag ls ${reactPackageName} ${distTag}`);
      const tagMapping = versions.split('\n').find((mapping) => {
        return mapping.startsWith(`${distTag}: `);
      });

      let version = null;

      if (tagMapping === undefined) {
        // Some specific version is being requested
        if (majorVersion) {
          version = distTag;
        } else {
          throw new Error(`Could not find '${distTag}' in "${versions}"`);
        }
      } else {
        version = tagMapping.replace(`${distTag}: `, '');
      }

      // the scheduler doesn't follow the versions as the other react packages
      if (majorVersion && reactPackageName === 'scheduler') {
        version = additionalVersionsMappings[majorVersion].scheduler;
      }

      packageJson.resolutions[reactPackageName] = version;
    }),
  );

  // At this moment all dist tags reference React 18 version, so we don't need
  // to update these dependencies unless an older version is used, or when the
  // next/experimental dist tag reference to a future version of React
  // packageJson.devDependencies['@mnajdova/enzyme-adapter-react-18'] =
  //   'npm:@mnajdova/enzyme-adapter-react-next';
  // packageJson.devDependencies['@testing-library/react'] = 'alpha';

  if (majorVersion) {
    devDependenciesPackageNames.map((packageName) => {
      if (!additionalVersionsMappings[majorVersion][packageName]) {
        throw new Error(
          `Version ${majorVersion} does not have version defined for the ${packageName}`,
        );
      }
      packageJson.devDependencies[packageName] =
        additionalVersionsMappings[majorVersion][packageName];
    });
  }

  // add newline for clean diff
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}${os.EOL}`);
}

const [distTag = process.env.REACT_DIST_TAG] = process.argv.slice(2);
main({ distTag }).catch((error) => {
  console.error(error);
  process.exit(1);
});
