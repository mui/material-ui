import chalk from 'chalk';
import ora from 'ora';
import { InstallerOptions, PkgInstallerMap } from 'src/installers';

import { logger } from './logger';

type InstallPackagesOptions = InstallerOptions & { packages: PkgInstallerMap };

export default function installPackages(options: InstallPackagesOptions) {
  const { packages } = options;
  logger.info('Installing packages...');

  Object.entries(packages).forEach(([name, packageOptions]) => {
    if (packageOptions.inUse) {
      const spinner = ora(`Boilerplating ${name}...`).start();
      packageOptions.installer(options);
      spinner.succeed(chalk.green(`Successfully setup boilerplate for ${chalk.green.bold(name)}`));
    }
  });
}
