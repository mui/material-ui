/* eslint-disable import/extensions */
/* eslint-disable no-console */
import * as fs from 'node:fs/promises';
import path from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';

function formatDate(date: Date) {
  // yyMMddHHMMSS
  return date
    .toISOString()
    .replace(/[-:TZ]/g, '')
    .slice(2, 14);
}

async function updateVersion(packagePath: string) {
  const packageJsonPath = path.join(packagePath, 'package.json');
  try {
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, { encoding: 'utf8' }));

    const version = packageJson.version;
    const dashIndex = version.indexOf('-');
    let newVersion = version;
    if (dashIndex !== -1) {
      newVersion = version.slice(0, dashIndex);
    }

    newVersion = `${newVersion}-dev.${formatDate(new Date())}`;
    packageJson.version = newVersion;

    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`${chalk.green(`✅ ${packageJson.name}`)}: ${version} → ${newVersion}`);
  } catch (error) {
    console.error(`${chalk.red(`❌ ${packageJsonPath}`)}: ${error.message}`);
    process.exit(1);
  }
}

interface HandlerArgv {
  packagePath: string;
}

yargs(hideBin(process.argv))
  .command<HandlerArgv>(
    '$0 [packagePath]',
    'Update package version to *-dev.<timestamp>',
    (command) => {
      return command.positional('packagePath', {
        description: 'Path to the package directory',
        type: 'string',
      });
    },
    (argv) => {
      updateVersion(argv.packagePath ?? process.cwd());
    },
  )
  .help()
  .strict(true)
  .version(false)
  .parse();
