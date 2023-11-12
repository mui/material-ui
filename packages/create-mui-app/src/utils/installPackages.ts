import chalk from 'chalk';
import ora from 'ora';
import { AvailablePackages, InstallerOptions, PkgInstallerMap } from 'src/installers';

import { logger } from './logger';

type InstallPackagesOptions = InstallerOptions & { packages: PkgInstallerMap };

const displayNames: Record<AvailablePackages, string> = {
  mui: 'Material UI',
  joy: 'Joy UI',
  icons: 'Material Design Icons',
  tailwind: 'TailwindCSS',
  system: 'MUI System',
  emotion: 'Emotion',
};

export default function installPackages(options: InstallPackagesOptions) {
  const { packages } = options;
  logger.info('Installing packages...');

  Object.entries(packages).forEach(([name, packageOptions]) => {
    const displayName = displayNames[name as AvailablePackages];
    if (packageOptions.inUse) {
      const spinner = ora(`Boilerplating ${displayName}...`).start();
      packageOptions.installer(options);
      spinner.succeed(
        chalk.green(`Successfully setup boilerplate for ${chalk.green.bold(displayName)}`),
      );
    }
  });
}
