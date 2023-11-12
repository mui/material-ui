import * as p from '@clack/prompts';
import chalk from 'chalk';
import fs from 'fs-extra';
import ora from 'ora';
import path from 'path';
import { PKG_ROOT } from 'src/constants';
import { type InstallerOptions } from 'src/installers';

export default async function bootstrapProject({
  projectDir,
  projectName,
  typescript,
  framework,
}: InstallerOptions) {
  const srcDir = path.join(PKG_ROOT, `templates${typescript ? '/ts' : '/js'}/${framework}`);

  const spinner = ora(`Bootstrapping your project in: ${projectDir}...\n`).start();

  if (fs.existsSync(projectDir)) {
    if (fs.readdirSync(projectDir).length === 0) {
      if (projectName !== '.') {
        spinner.info(`${chalk.cyan.bold(projectName)} exists but is empty, continuing...\n`);
      }
    } else {
      spinner.stopAndPersist();
      const overwriteDir = await p.select({
        message: `${chalk.redBright.bold('Warning:')} ${chalk.cyan.bold(
          projectName,
        )} already exists and isn't empty. How would you like to proceed?`,
        options: [
          {
            label: 'Abort installation (recommended)',
            value: 'abort',
          },
          {
            label: 'Clear the directory and continue installation',
            value: 'clear',
          },
          {
            label: 'Continue installation and overwrite conflicting files',
            value: 'overwrite',
          },
        ],
        initialValue: 'abort',
      });
      if (overwriteDir === 'abort') {
        spinner.fail('Aborting installation...');
        process.exit(1);
      }

      const overwriteAction =
        overwriteDir === 'clear' ? 'clear the directory' : 'overwrite conflicting files';

      const confirmOverwriteDir = await p.confirm({
        message: `Are you sure you want to ${overwriteAction}?`,
        initialValue: false,
      });

      if (!confirmOverwriteDir) {
        spinner.fail('Aborting installation...');
        process.exit(1);
      }

      if (overwriteDir === 'clear') {
        spinner.info(`Emptying ${chalk.cyan.bold(projectName)} and creating mui app..\n`);
        fs.emptyDirSync(projectDir);
      }
    }
  }

  spinner.start();

  fs.copySync(srcDir, projectDir);

  const scaffoldedName = projectName === '.' ? 'App' : chalk.cyan.bold(projectName);

  spinner.succeed(`${scaffoldedName} ${chalk.green('scaffolded successfully!')}\n`);
}
