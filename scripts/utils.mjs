import path from 'path';
import url from 'url';
import fs from 'fs/promises';

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
export async function getVersionEnvVariables() {
  const packageJsonData = await fs.readFile(path.resolve('./package.json'), 'utf8');
  const { version = null } = JSON.parse(packageJsonData);

  if (!version) {
    throw new Error('Could not find the version in the package.json');
  }

  const [versionNumber, preReleaseInfo] = version.split('-');
  const [major, minor, patch] = versionNumber.split('.');
  const [preReleaseLabel, preReleaseNumber] = preReleaseInfo ? preReleaseInfo.split('.') : [];

  if (!major || !minor || !patch) {
    throw new Error(`Couldn't parse version from package.json`);
  }

  return {
    MUI_VERSION: version,
    MUI_MAJOR_VERSION: major,
    MUI_MINOR_VERSION: minor,
    MUI_PATCH_VERSION: patch,
    MUI_PRERELEASE_LABEL: preReleaseLabel,
    MUI_PRERELEASE_NUMBER: preReleaseNumber,
  };
}
