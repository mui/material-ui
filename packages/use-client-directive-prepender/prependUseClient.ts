import * as yargs from 'yargs';
import * as fse from 'fs-extra';
import os from 'os';
import path from 'path';
import findComponents from '../api-docs-builder/utils/findComponents';
import findHooks from '../api-docs-builder/utils/findHooks';

type CommandOptions = { grep?: string };

const { EOL } = os;

const PROJECTS = [
  {
    name: 'base',
    rootPath: path.join(process.cwd(), 'packages/mui-base'),
  },
  {
    name: 'material',
    rootPath: path.join(process.cwd(), 'packages/mui-material'),
  },
  {
    name: 'joy',
    rootPath: path.join(process.cwd(), 'packages/mui-joy'),
  },
];

async function processFile(component: { filename: string }, lineToPrepend = `'use client';${EOL}`) {
  const { filename } = component;

  const contents = await fse.readFile(filename, 'utf8');

  const truncatedContents = contents.split(EOL).slice(1).join(EOL);

  const newContents = `${lineToPrepend}${truncatedContents}`;

  await fse.writeFile(filename, newContents);
}

async function run(argv: yargs.ArgumentsCamelCase<CommandOptions>) {
  const grep = argv.grep == null ? null : new RegExp(argv.grep);

  await PROJECTS.reduce(async (resolvedPromise, project) => {
    await resolvedPromise;

    const components = findComponents(path.join(project.rootPath, 'src')).filter((component) => {
      if (grep === null) {
        return true;
      }
      return grep.test(component.filename);
    });

    components.forEach(async (component) => {
      try {
        processFile(component);
      } catch (error: any) {
        error.message = `${path.relative(process.cwd(), component.filename)}: ${error.message}`;
        throw error;
      }
    });

    const hooks = findHooks(path.join(project.rootPath, 'src')).filter((hook) => {
      if (grep === null) {
        return true;
      }
      return grep.test(hook.filename);
    });

    hooks.forEach(async (component) => {
      try {
        processFile(component);
      } catch (error: any) {
        error.message = `${path.relative(process.cwd(), component.filename)}: ${error.message}`;
        throw error;
      }
    });
    return Promise.resolve();
  }, Promise.resolve());
}

yargs
  .command({
    command: '$0',
    describe: 'prepends the use client directive to components',
    builder: (command) => {
      return command.option('grep', {
        description:
          'Only process files for component filenames matching the pattern. The string is treated as a RegExp.',
        type: 'string',
      });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
