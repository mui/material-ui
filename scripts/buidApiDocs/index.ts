import yargs, { ArgumentsCamelCase } from 'yargs';
import { ProjectSettings, buildApi } from '@mui-internal/api-docs-builder';
import {
  baseUiProjectSettings,
  joyUiProjectSettings,
  materialUiProjectSettings,
  muiSystemProjectSettings,
} from '@mui-internal/api-docs-builder-core';

const projectSettings: ProjectSettings[] = [
  materialUiProjectSettings,
  baseUiProjectSettings,
  joyUiProjectSettings,
  muiSystemProjectSettings,
];

type CommandOptions = { grep?: string };

async function run(argv: ArgumentsCamelCase<CommandOptions>) {
  const grep = argv.grep == null ? null : new RegExp(argv.grep);
  return buildApi(projectSettings, grep);
}

yargs(process.argv.slice(2))
  .command({
    command: '$0',
    describe: 'Generates API documentation for the MUI packages.',
    builder: (command) => {
      return command.option('grep', {
        description:
          'Only generate files for component filenames matching the pattern. The string is treated as a RegExp.',
        type: 'string',
      });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
