/* eslint-disable no-console */
import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';

import runCreateMuiCli from './cli';
import { renderTitle, showNextSteps } from './cli/render';
import { buildPkgInstallerMap, PackageManager } from './installers';
import createProject, { FrameworkOption } from './utils/createProject';
import installDependencies from './utils/installDependencies';
import { logger } from './utils/logger';

async function main() {
  renderTitle();
  const { appName, flags, packages: pkgs, ...opts } = await runCreateMuiCli();
  const framework = opts.framework as FrameworkOption;
  const packages = buildPkgInstallerMap(pkgs);
  const packageManager = flags.packageManager as PackageManager;

  const projectDir = await createProject({
    projectName: appName,
    packages,
    typescript: flags.typescript,
    framework,
    packageManager,
  });

  const pkgJson = fs.readJSONSync(path.join(projectDir, 'package.json'));
  pkgJson.name = appName;

  // ? Bun doesn't support this field (yet)
  if (packageManager !== 'bun') {
    const { stdout } = await execa(packageManager, ['-v'], {
      cwd: projectDir,
    });
    pkgJson.packageManager = `${packageManager}@${stdout.trim()}`;
  }

  fs.writeJSONSync(path.join(projectDir, 'package.json'), pkgJson, {
    spaces: 2,
  });

  await installDependencies({ projectDir, pkgManager: packageManager });

  showNextSteps(packageManager, framework);
}

main().catch((err) => {
  logger.error('Aborting installation...');
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error('An unknown error has occurred. Please open an issue on github with the below:');
    console.log(err);
  }
  process.exit(1);
});
