import path from 'path';
import * as yargs from 'yargs';
import * as fse from 'fs-extra';
import findComponents from '../api-docs-builder/utils/findComponents';
import findHooks from '../api-docs-builder/utils/findHooks';

type CommandOptions = { grep?: string };

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
    name: 'material-next',
    rootPath: path.join(process.cwd(), 'packages/mui-material-next'),
  },
  {
    name: 'joy',
    rootPath: path.join(process.cwd(), 'packages/mui-joy'),
  },
  {
    name: 'system',
    rootPath: path.join(process.cwd(), 'packages/mui-system'),
  },
  {
    name: 'styled-engine',
    rootPath: path.join(process.cwd(), 'packages/mui-styled-engine'),
  },
  {
    name: 'utils',
    rootPath: path.join(process.cwd(), 'packages/mui-utils'),
  },
];

async function processFile(
  filename: string,
  options: {
    lineToPrepend?: string;
  } = {},
) {
  const { lineToPrepend = `'use client';` } = options;
  const contents = await fse.readFile(filename, 'utf8');

  const lines = contents.split(/\r?\n/);
  if (lines[0] === lineToPrepend) {
    return;
  }

  const newContents = `${lineToPrepend}\n${contents}`;

  await fse.writeFile(filename, newContents);
}

function getIndexFile(directory: string) {
  const items = fse.readdirSync(directory);

  const indexFile = items.reduce((prev, curr) => {
    if (!/^index.(js|ts)/.test(curr)) {
      return prev;
    }
    return curr;
  }, '');

  return {
    filename: path.join(directory, indexFile),
  };
}

async function run(argv: yargs.ArgumentsCamelCase<CommandOptions>) {
  const grep = argv.grep == null ? null : new RegExp(argv.grep);

  await PROJECTS.reduce(async (resolvedPromise, project) => {
    await resolvedPromise;

    const projectSrc = path.join(project.rootPath, 'src');

    const indexFile = getIndexFile(projectSrc);

    try {
      processFile(indexFile.filename);
    } catch (error: any) {
      error.message = `${path.relative(process.cwd(), indexFile.filename)}: ${error.message}`;
      throw error;
    }

    const components = findComponents(projectSrc).filter((component) => {
      if (grep === null) {
        return true;
      }
      return grep.test(component.filename);
    });

    components.forEach(async (component) => {
      try {
        processFile(component.filename);

        if (component.indexFilename) {
          processFile(component.indexFilename);
        }
      } catch (error: any) {
        error.message = `${path.relative(process.cwd(), component.filename)}: ${error.message}`;
        throw error;
      }
    });

    const hooks = findHooks(projectSrc).filter((hook) => {
      if (grep === null) {
        return true;
      }
      return grep.test(hook.filename);
    });

    hooks.forEach(async (hook) => {
      try {
        processFile(hook.filename);

        if (hook.indexFilename) {
          processFile(hook.indexFilename);
        }
      } catch (error: any) {
        error.message = `${path.relative(process.cwd(), hook.filename)}: ${error.message}`;
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
