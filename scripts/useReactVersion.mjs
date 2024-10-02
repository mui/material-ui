/* eslint-disable no-console */
/**
 * Given the dist tag fetch the corresponding
 * version and make sure this version is used throughout the repository.
 *
 * If you work on this file:
 * WARNING: This script can only use built-in modules since it has to run before
 * `pnpm install`
 */
import childProcess from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { promisify } from 'util';

const exec = promisify(childProcess.exec);

// packages published from the react monorepo using the same version
const reactPackageNames = ['react', 'react-dom', 'react-is', 'scheduler'];
const devDependenciesPackageNames = ['@testing-library/react'];

// if we need to support more versions we will need to add new mapping here
const additionalVersionsMappings = {
  17: {
    '@testing-library/react': '^12.1.0',
  },
};

async function main(version) {
  if (typeof version !== 'string') {
    throw new TypeError(`expected version: string but got '${version}'`);
  }

  if (version === 'stable') {
    console.log('Nothing to do with stable');
    return;
  }

  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf8' }));

  // the version is something in format: "17.0.0"
  let majorVersion = null;

  if (version.startsWith('^') || version.startsWith('~') || !Number.isNaN(version.charAt(0))) {
    majorVersion = version.replace('^', '').replace('~', '').split('.')[0];
  }

  await Promise.all(
    reactPackageNames.map(async (reactPackageName) => {
      const { stdout: versions } = await exec(`npm dist-tag ls ${reactPackageName} ${version}`);
      const tagMapping = versions.split('\n').find((mapping) => {
        return mapping.startsWith(`${version}: `);
      });

      let packageVersion = null;

      if (tagMapping === undefined) {
        // Some specific version is being requested
        if (majorVersion) {
          packageVersion = version;
          if (reactPackageName === 'scheduler') {
            // get the scheduler version from the react-dom's dependencies entry
            const { stdout: reactDOMDependenciesString } = await exec(
              `npm view --json react-dom@${version} dependencies`,
            );
            packageVersion = JSON.parse(reactDOMDependenciesString).scheduler;
          }
        } else {
          throw new Error(`Could not find '${version}' in "${versions}"`);
        }
      } else {
        packageVersion = tagMapping.replace(`${version}: `, '');
      }

      packageJson.resolutions[reactPackageName] = packageVersion;
    }),
  );

  // At this moment all dist tags reference React 18 version, so we don't need
  // to update these dependencies unless an older version is used, or when the
  // next/experimental dist tag reference to a future version of React
  // packageJson.devDependencies['@testing-library/react'] = 'alpha';

  if (majorVersion && additionalVersionsMappings[majorVersion]) {
    devDependenciesPackageNames.forEach((packageName) => {
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

  console.log('Installing dependencies...');
  const pnpmInstall = childProcess.spawn('pnpm', ['install', '--no-frozen-lockfile'], {
    shell: true,
    stdio: ['inherit', 'inherit', 'inherit'],
  });
  pnpmInstall.on('exit', (exitCode) => {
    if (exitCode !== 0) {
      throw new Error('Failed to install dependencies');
    }
  });
}

const [version = process.env.REACT_VERSION] = process.argv.slice(2);
main(version).catch((error) => {
  console.error(error);
  process.exit(1);
});
