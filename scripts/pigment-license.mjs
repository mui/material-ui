import * as path from 'node:path';
import fse from 'fs-extra';
import { getWorkspaceRoot } from './utils.mjs';

async function run() {
  const licenseFile = path.join(getWorkspaceRoot(), 'LICENSE');
  const cwd = process.cwd();
  await fse.copyFile(licenseFile, path.join(cwd, 'LICENSE'));
}

run();
