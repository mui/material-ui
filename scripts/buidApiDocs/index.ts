import yargs, { ArgumentsCamelCase } from 'yargs';
import { ProjectSettings, buildApi } from '@mui-internal/api-docs-builder';
import {
  joyUiProjectSettings,
  materialUiProjectSettings,
  muiSystemProjectSettings,
} from '@mui-internal/api-docs-builder-core';

const projectSettings: ProjectSettings[] = [
  materialUiProjectSettings,
  joyUiProjectSettings,
  muiSystemProjectSettings,
];

type CommandOptions = { grep?: string; rawDescriptions?: boolean };

async function run(argv: ArgumentsCamelCase<CommandOptions>) {
  const grep = argv.grep == null ? null : new RegExp(argv.grep);
  const rawDescriptions = argv.rawDescriptions === true;
  return buildApi(projectSettings, grep, rawDescriptions);
}

yargs(process.argv.slice(2))
  .command({
    command: '$0',
    describe: 'Generates API documentation for the MUI packages.',
    builder: (command) => {
      return command
        .option('grep', {
          description:
            'Only generate files for component filenames matching the pattern. The string is treated as a RegExp.',
          type: 'string',
        })
        .option('rawDescriptions', {
          description: 'Whether to output raw JSDoc descriptions or process them as markdown.',
          type: 'boolean',
          default: false,
        });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
