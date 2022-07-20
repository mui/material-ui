/* eslint-disable no-console */
/**
 * Given the specific react verion fetch the corresponding related dependencies
 * snd make sure this version is used throughout the repository.
 *
 * If you work on this file:
 * WARNING: This script can only use built-in modules since it has to run before
 * `yarn install`
 */
const fs = require('fs');
const os = require('os');
const path = require('path');

// packages published from the react monorepo per version
const versionsSupported = {
  '17.0.2': {
    react: '17.0.2',
    'react-dom': '17.0.2',
    'react-is': '17.0.2',
    'react-test-renderer': '17.0.2',
    scheduler: '0.20.2',
  },
};

const devDependencies = {
  '17.0.2': {
    '@mnajdova/enzyme-adapter-react-18': 'npm:@eps1lon/enzyme-adapter-react-17',
    '@testing-library/react': '12.1.5',
  },
};

async function main(options) {
  const { reactVersion } = options;

  if (typeof reactVersion !== 'string') {
    throw new TypeError(`expected reactVersion: string but got '${reactVersion}'`);
  }

  if (reactVersion === '') {
    // do nothing
    return;
  }

  if (!versionsSupported[reactVersion]) {
    console.log(
      `This version is not supported. This is the list of all supported versions: ${Object.keys(
        versionsSupported,
      )}`,
    );
    return;
  }

  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf8' }));

  const reactPackageNames = versionsSupported[reactVersion];

  await Promise.all(
    Object.keys(reactPackageNames).map(async (reactPackageName) => {
      packageJson.resolutions[reactPackageName] = reactPackageNames[reactPackageName];
    }),
  );

  packageJson.devDependencies['@mnajdova/enzyme-adapter-react-18'] =
    devDependencies[reactVersion]['@mnajdova/enzyme-adapter-react-18'];
  packageJson.devDependencies['@testing-library/react'] =
    devDependencies[reactVersion]['@testing-library/react'];

  // add newline for clean diff
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}${os.EOL}`);
}

const [reactVersion = process.env.REACT_SPECIFIC_VERSION] = process.argv.slice(2);
main({ reactVersion }).catch((error) => {
  console.error(error);
  process.exit(1);
});
