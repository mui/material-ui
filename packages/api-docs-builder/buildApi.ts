import { mkdirSync } from 'fs';
import * as fse from 'fs-extra';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import * as yargs from 'yargs';
import findComponents from './utils/findComponents';
import findHooks from './utils/findHooks';
import {
  ComponentInfo,
  HookInfo,
  getMaterialComponentInfo,
  getBaseComponentInfo,
  getBaseHookInfo,
  getSystemComponentInfo,
  extractApiPage,
  getJoyComponentInfo,
  generateBaseUIApiPages,
  writePrettifiedFile,
} from './buildApiUtils';
import generateComponentApi, { ReactApi } from './ApiBuilders/ComponentApiBuilder';
import generateHookApi from './ApiBuilders/HookApiBuilder';
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
  getHookInfo?: (filename: string) => HookInfo;
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
    getHookInfo: getBaseHookInfo,
  },
  {
    output: {
      apiManifestPath: path.join(process.cwd(), 'docs/data/joy/pagesApi.js'),
    },
    getProjects: () => [
      createTypeScriptProject({
        name: 'joy',
        rootPath: path.join(process.cwd(), 'packages/mui-joy'),
        entryPointPath: 'src/index.ts',
      }),
    ],
    getApiPages: () => findApiPages('docs/pages/joy-ui/api'),
    getComponentInfo: getJoyComponentInfo,
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

    const apiBuilds = projects.flatMap((project) => {
      const projectComponents = findComponents(path.join(project.rootPath, 'src')).filter(
        (component) => {
          if (
            component.filename.includes('ThemeProvider') ||
            component.filename.includes('CssVarsProvider') ||
            (component.filename.includes('mui-joy') &&
              // Box's demo isn't ready
              // Container's demo isn't ready
              // Grid has problem with react-docgen
              component.filename.match(/(Box|Container|ColorInversion|Grid)/)) ||
            (component.filename.includes('mui-system') && component.filename.match(/GlobalStyles/))
          ) {
            return false;
          }
          if (grep === null) {
            return true;
          }
          return grep.test(component.filename);
        },
      );

      const projectHooks = findHooks(path.join(project.rootPath, 'src')).filter((hook) => {
        if (grep === null) {
          return true;
        }
        return grep.test(hook.filename);
      });

      const componentsBuilds = projectComponents.map(async (component) => {
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

      const hooksBuilds = projectHooks.map(async (hook) => {
        if (!setting.getHookInfo) {
          return [];
        }
        try {
          const { filename } = hook;
          const hookInfo = setting.getHookInfo(filename);

          mkdirSync(hookInfo.apiPagesDirectory, { mode: 0o777, recursive: true });
          return generateHookApi(hookInfo, project);
        } catch (error: any) {
          error.message = `${path.relative(process.cwd(), hook.filename)}: ${error.message}`;
          throw error;
        }
      });

      return [...componentsBuilds, ...hooksBuilds];
    });

    const builds = await Promise.allSettled(apiBuilds);

    const fails = builds.filter(
      (promise): promise is PromiseRejectedResult => promise.status === 'rejected',
    );

    fails.forEach((build) => {
      console.error(build.reason);
    });
    if (fails.length > 0) {
      process.exit(1);
    }

    const apiLinks: { pathname: string; title: string }[] = [];

    // Generate the api links, in a format that would point to the appropriate API tab
    // @ts-ignore there are no failed builds at this point
    const baseBuilds = builds.filter((build) => build?.value?.filename?.indexOf('mui-base') >= 0);
    if (baseBuilds.length >= 0) {
      baseBuilds.forEach((build) => {
        // @ts-ignore
        const { value } = build;
        const { name, demos } = value;
        // find a potential # in the pathname
        const hashIdx = demos.length > 0 ? demos[0].demoPathname.indexOf('#') : -1;

        let pathname = null;

        if (demos.length > 0) {
          // make sure the pathname doesn't contain #
          pathname =
            hashIdx >= 0 ? demos[0].demoPathname.substr(0, hashIdx) : demos[0].demoPathname;
        }

        if (pathname !== null) {
          // add the new apiLink, where pathame is in format of /react-component/components-api
          apiLinks.push({
            pathname: `${pathname}${
              name.startsWith('use') ? 'hooks-api' : 'components-api'
            }/#${kebabCase(name)}`,
            title: name,
          });
        }
      });
    }

    // @ts-ignore ignore hooks builds for now
    allBuilds = [...allBuilds, ...builds];

    apiLinks.sort((a, b) => (a.title > b.title ? 1 : -1));
    let source = `module.exports = ${JSON.stringify(setting.getApiPages())}`;
    if (apiLinks.length > 0) {
      // @ts-ignore
      source = `module.exports = ${JSON.stringify(apiLinks)}`;
    }

    writePrettifiedFile(apiPagesManifestPath, source);
    return Promise.resolve();
  }, Promise.resolve());

  // update the component pages to show the API tabs
  generateBaseUIApiPages();

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
