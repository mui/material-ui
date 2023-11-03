import * as yargs from 'yargs';
import { ProjectSettings, buildApi } from './buildApi';
import baseUiProjectSettings from './projects/baseUi/projectSettings';
import joyUiProjectSettings from './projects/joyUi/projectSettings';
import muiSystemSettings from './projects/muiSystem/projectSettings';
import materialUiProjectSettings from './projects/materialUi/projectSettings';

const projectSettings: ProjectSettings[] = [
  materialUiProjectSettings,
  baseUiProjectSettings,
  joyUiProjectSettings,
  muiSystemSettings,
];
type CommandOptions = { grep?: string };

async function run(argv: yargs.ArgumentsCamelCase<CommandOptions>) {
  const grep = argv.grep == null ? null : new RegExp(argv.grep);
  return buildApi(projectSettings, grep);
}

yargs
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
