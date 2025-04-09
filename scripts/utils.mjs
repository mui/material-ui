import path from 'path';
import url from 'url';
import fs from 'fs';

function findUpFile(fileName, cwd = process.cwd(), maxIterations = 5) {
  const pathName = path.join(cwd, fileName);
  if (fs.existsSync(pathName)) {
    return pathName;
  }
  if (maxIterations === 0) {
    return null;
  }
  return findUpFile(fileName, path.dirname(cwd), maxIterations - 1);
}

/**
 * Returns the full path of the root directory of the monorepo.
 */
// eslint-disable-next-line import/prefer-default-export
export function getWorkspaceRoot() {
  // Use this when available. Avoids the need to check for the workspace file.
  if (process.env.NX_WORKSPACE_ROOT) {
    return process.env.NX_WORKSPACE_ROOT;
  }

  const workspaceFilePath = findUpFile('pnpm-workspace.yaml', process.cwd());
  if (workspaceFilePath) {
    return path.dirname(workspaceFilePath);
  }

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
