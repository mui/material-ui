import { mkdirSync } from 'fs';
import * as fse from 'fs-extra';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import * as yargs from 'yargs';
import findComponents from './utils/findComponents';
import {
  ComponentInfo,
  getMaterialComponentInfo,
  getBaseComponentInfo,
  getSystemComponentInfo,
  extractApiPage,
} from './buildApiUtils';
import generateComponentApi, {
  writePrettifiedFile,
  ReactApi,
} from './ApiBuilders/ComponentApiBuilder';
import { createTypeScriptProject, TypeScriptProject } from './utils/createTypeScriptProject';

const apiDocsTranslationsDirectory = path.resolve('docs', 'translations', 'api-docs');

async function removeOutdatedApiDocsTranslations(components: readonly ReactApi[]): Promise<void> {
  const componentDirectories = new Set<string>();
  const files = await fse.readdir(apiDocsTranslationsDirectory);
  await Promise.all(
    files.map(async (filename) => {
      const filepath = path.join(apiDocsTranslationsDirectory, filename);
      const stats = await fse.stat(filepath);
      if (stats.isDirectory()) {
        componentDirectories.add(filepath);
      }
    }),
  );

  const currentComponentDirectories = new Set(
    components.map((component) => {
      return path.resolve(apiDocsTranslationsDirectory, kebabCase(component.name));
    }),
  );

  const outdatedComponentDirectories = new Set(componentDirectories);
  currentComponentDirectories.forEach((componentDirectory) => {
    outdatedComponentDirectories.delete(componentDirectory);
  });

  await Promise.all(
    Array.from(outdatedComponentDirectories, (outdatedComponentDirectory) => {
      return fse.remove(outdatedComponentDirectory);
    }),
  );
}

const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []) => {
  const files = fse.readdirSync(dirPath);

  files.forEach((file) => {
    if (fse.statSync(`${dirPath}/${file}`).isDirectory()) {
      arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, '/', file));
    }
  });

  return arrayOfFiles;
};

function findApiPages(relativeFolder: string) {
  let pages: Array<{ pathname: string }> = [];
  let filePaths: string[] = [];
  try {
    filePaths = getAllFiles(path.join(process.cwd(), relativeFolder));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return [];
  }
  filePaths.forEach((itemPath) => {
    if (itemPath.endsWith('.js')) {
      const data = extractApiPage(itemPath);

      pages.push({ pathname: data.apiPathname });
    }
  });

  // sort by pathnames without '-' so that e.g. card comes before card-action
  pages = pages.sort((a, b) => {
    const pathnameA = a.pathname.replace(/-/g, '');
    const pathnameB = b.pathname.replace(/-/g, '');
    if (pathnameA < pathnameB) {
      return -1;
    }
    if (pathnameA > pathnameB) {
      return 1;
    }
    return 0;
  });

  return pages;
}

interface Settings {
  output: {
    /**
     * The output path of `pagesApi` generated from `input.pageDirectory`
     */
    apiManifestPath: string;
  };
  /**
   * Component directories to be used to generate API
   */
  getProjects: () => TypeScriptProject[];
  getApiPages: () => Array<{ pathname: string }>;
  getComponentInfo: (filename: string) => ComponentInfo;
}

const SETTINGS: Settings[] = [
  {
    output: {
      apiManifestPath: path.join(process.cwd(), 'docs/data/material/pagesApi.js'),
    },
    getProjects: () => [
      createTypeScriptProject({
        name: 'material',
        rootPath: path.join(process.cwd(), 'packages/mui-material'),
        entryPointPath: 'src/index.d.ts',
      }),
      createTypeScriptProject({
        name: 'lab',
        rootPath: path.join(process.cwd(), 'packages/mui-lab'),
        entryPointPath: 'src/index.d.ts',
      }),
    ],
    getApiPages: () => findApiPages('docs/pages/material-ui/api'),
    getComponentInfo: getMaterialComponentInfo,
  },
  {
    output: {
      apiManifestPath: path.join(process.cwd(), 'docs/data/base/pagesApi.js'),
    },
    getProjects: () => [
      createTypeScriptProject({
        name: 'base',
        rootPath: path.join(process.cwd(), 'packages/mui-base'),
        entryPointPath: 'src/index.d.ts',
      }),
    ],
    getApiPages: () => findApiPages('docs/pages/base/api'),
    getComponentInfo: getBaseComponentInfo,
  },
  {
    output: {
      apiManifestPath: path.join(process.cwd(), 'docs/data/system/pagesApi.js'),
    },
    getProjects: () => [
      createTypeScriptProject({
        name: 'system',
        rootPath: path.join(process.cwd(), 'packages/mui-system'),
        entryPointPath: 'src/index.d.ts',
      }),
    ],
    getApiPages: () => findApiPages('docs/pages/system/api'),
    getComponentInfo: getSystemComponentInfo,
  },
];

type CommandOptions = { grep?: string };

async function run(argv: yargs.ArgumentsCamelCase<CommandOptions>) {
  const grep = argv.grep == null ? null : new RegExp(argv.grep);
  let allBuilds: Array<PromiseSettledResult<ReactApi | null>> = [];
  await SETTINGS.reduce(async (resolvedPromise, setting) => {
    await resolvedPromise;
    /**
     * @type {string[]}
     */
    const projects = setting.getProjects();
    const apiPagesManifestPath = setting.output.apiManifestPath;

    const manifestDir = apiPagesManifestPath.match(/(.*)\/[^/]+\./)?.[1];
    if (manifestDir) {
      mkdirSync(manifestDir, { recursive: true });
    }

    const componentBuilds = projects.flatMap((project) => {
      const projectComponents = findComponents(path.join(project.rootPath, 'src')).filter(
        (component) => {
          if (
            component.filename.includes('ThemeProvider') ||
            (component.filename.includes('mui-material') &&
              component.filename.includes('CssVarsProvider'))
          ) {
            return false;
          }
          if (grep === null) {
            return true;
          }
          return grep.test(component.filename);
        },
      );

      return projectComponents.map(async (component) => {
        try {
          const { filename } = component;
          const componentInfo = setting.getComponentInfo(filename);

          mkdirSync(componentInfo.apiPagesDirectory, { mode: 0o777, recursive: true });

          return generateComponentApi(componentInfo, project);
        } catch (error: any) {
          error.message = `${path.relative(process.cwd(), component.filename)}: ${error.message}`;
          throw error;
        }
      });
    });

    const builds = await Promise.allSettled(componentBuilds);

    const fails = builds.filter(
      (promise): promise is PromiseRejectedResult => promise.status === 'rejected',
    );

    fails.forEach((build) => {
      console.error(build.reason);
    });
    if (fails.length > 0) {
      process.exit(1);
    }

    allBuilds = [...allBuilds, ...builds];

    const source = `module.exports = ${JSON.stringify(setting.getApiPages())}`;
    writePrettifiedFile(apiPagesManifestPath, source);
    return Promise.resolve();
  }, Promise.resolve());

  if (grep === null) {
    const componentApis = allBuilds
      .filter((build): build is PromiseFulfilledResult<ReactApi> => {
        return build.status === 'fulfilled' && build.value !== null;
      })
      .map((build) => {
        return build.value;
      });
    await removeOutdatedApiDocsTranslations(componentApis);
  }
}

yargs
  .command({
    command: '$0',
    describe: 'formats codebase',
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
