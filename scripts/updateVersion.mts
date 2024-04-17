/* eslint-disable import/extensions */
/* eslint-disable no-console */
import * as fs from 'node:fs/promises';
import path from 'node:path';
import * as yargs from 'yargs';
import { getWorkspaceRoot } from './utils.mjs';

async function updateVersion(packageName: string) {
  const packageJsonPath = path.join(getWorkspaceRoot(), packageName, 'package.json');

  console.log(`Updating version in ${packageJsonPath}...`);

  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, { encoding: 'utf8' }));
}

interface HandlerArgv {
  package: string;
}

yargs.command<HandlerArgv>({
    command: '$0 <package>',
    description: 'update package version',
    builder: (command) => {
      return command.positional('package', {
        description: 'Path to the package. Example: "packages/mui-material"',
        type: 'string',
      });
    },
    handler: (argv) => {
      updateVersion(argv.package);
    },
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
