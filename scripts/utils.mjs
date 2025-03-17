import path from 'path';
import url from 'url';

/**
 * Returns the full path of the root directory of this repository.
 */
// eslint-disable-next-line import/prefer-default-export
export function getWorkspaceRoot() {
  const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
  const workspaceRoot = path.resolve(currentDirectory, '..');
  return workspaceRoot;
}

/**
 * Returns the version and destructured values of the version as env variables to be replaced.
 */
export function getVersionEnvVariables(pkgJson) {
  const version = pkgJson.version;
  if (!version) {
    throw new Error('No version found in package.json');
  }

  const [versionNumber, prerelease] = version.split('-');
  const [major, minor, patch] = versionNumber.split('.');

  if (!major || !minor || !patch) {
    throw new Error(`Couldn't parse version from package.json`);
  }

  return {
    MUI_VERSION: version,
    MUI_MAJOR_VERSION: major,
    MUI_MINOR_VERSION: minor,
    MUI_PATCH_VERSION: patch,
    MUI_PRERELEASE: prerelease,
  };
}
