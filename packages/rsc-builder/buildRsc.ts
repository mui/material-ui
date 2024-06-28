import path from 'path';
import * as yargs from 'yargs';
import * as fse from 'fs-extra';
import findComponents from '../api-docs-builder/utils/findComponents';
import findHooks from '../api-docs-builder/utils/findHooks';

type CommandOptions = { grep?: string };

type Project = {
  name: string;
  rootPath: string;
  additionalPaths?: string[];
  additionalFiles?: string[];
  ignorePaths?: string[];
};

const PROJECTS: Project[] = [
  {
    name: 'base',
    rootPath: path.join(process.cwd(), 'packages/mui-base'),
  },
  {
    name: 'material',
    rootPath: path.join(process.cwd(), 'packages/mui-material'),
    ignorePaths: [
      'packages/mui-material/src/InitColorSchemeScript/InitColorSchemeScript.tsx', // RSC compatible
      'packages/mui-material/src/PigmentContainer/PigmentContainer.tsx', // RSC compatible
      'packages/mui-material/src/PigmentGrid/PigmentGrid.tsx', // RSC compatible
      'packages/mui-material/src/PigmentStack/PigmentStack.tsx', // RSC compatible
    ],
  },
  {
    name: 'joy',
    rootPath: path.join(process.cwd(), 'packages/mui-joy'),
    ignorePaths: [
      'packages/mui-joy/src/InitColorSchemeScript/InitColorSchemeScript.tsx', // no need 'use client' because of `styles/index` export
    ],
  },
  {
    name: 'system',
    rootPath: path.join(process.cwd(), 'packages/mui-system'),
    ignorePaths: [
      'packages/mui-system/src/InitColorSchemeScript/InitColorSchemeScript.tsx', // no need 'use client' because of `styles/index` export
    ],
  },
  {
    name: 'styled-engine',
    rootPath: path.join(process.cwd(), 'packages/mui-styled-engine'),
  },
  {
    name: 'utils',
    rootPath: path.join(process.cwd(), 'packages/mui-utils'),
  },
  {
    name: 'icons-material',
    rootPath: path.join(process.cwd(), 'packages/mui-icons-material'),
    additionalPaths: ['custom'],
    additionalFiles: ['src/utils/createSvgIcon.js'],
  },
  {
    name: 'lab',
    rootPath: path.join(process.cwd(), 'packages/mui-lab'),
  },
];

async function processFile(
  filename: string,
  options: {
    lineToPrepend?: string;
  } = {},
) {
  if (!fse.statSync(filename).isFile()) {
    return;
  }

  const { lineToPrepend = `'use client';` } = options;
  const contents = await fse.readFile(filename, 'utf8');

  const lines = contents.split(/\r?\n/);
  if (lines[0] === lineToPrepend) {
    return;
  }

  const newContents = `${lineToPrepend}\n${contents}`;

  await fse.writeFile(filename, newContents);
}

async function findAll(
  directories: string[],
  grep: RegExp | null,
  findFn: typeof findComponents | typeof findHooks,
) {
  const result = await Promise.all(
    directories.map((dir) => {
      return findFn(dir).filter((item) => {
        if (grep === null) {
          return true;
        }
        return grep.test(item.filename);
      });
    }),
  );

  return result.flat();
}

async function run(argv: yargs.ArgumentsCamelCase<CommandOptions>) {
  const grep = argv.grep == null ? null : new RegExp(argv.grep);

  await PROJECTS.reduce(async (resolvedPromise, project) => {
    await resolvedPromise;

    const projectSrc = path.join(project.rootPath, 'src');

    let directories = [projectSrc];

    if (Array.isArray(project?.additionalPaths)) {
      directories = [
        ...directories,
        ...project.additionalPaths.map((p) => path.join(project.rootPath, p)),
      ];
    }

    const components = await findAll(directories, grep, findComponents);

    components.forEach(async (component) => {
      try {
        if (!project.ignorePaths?.some((p) => component.filename.includes(p))) {
          processFile(component.filename);
        }
      } catch (error: any) {
        error.message = `${path.relative(process.cwd(), component.filename)}: ${error.message}`;
        throw error;
      }
    });

    const hooks = await findAll(directories, grep, findHooks);

    hooks.forEach(async (hook) => {
      try {
        processFile(hook.filename);
      } catch (error: any) {
        error.message = `${path.relative(process.cwd(), hook.filename)}: ${error.message}`;
        throw error;
      }
    });

    if (Array.isArray(project?.additionalFiles)) {
      project.additionalFiles.forEach(async (file) => {
        const fullPath = path.join(project.rootPath, file);
        processFile(fullPath);
      });
    }

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
