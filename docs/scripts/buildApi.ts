import { mkdirSync, readFileSync } from 'fs';
import * as fse from 'fs-extra';
import path from 'path';
import * as _ from 'lodash';
import kebabCase from 'lodash/kebabCase';
import * as yargs from 'yargs';
import { ReactDocgenApi } from 'react-docgen';
import { findPages, findPagesMarkdown, findComponents } from 'docs/src/modules/utils/find';
import { getHeaders } from '@mui/markdown';
import { Styles } from 'docs/src/modules/utils/parseStyles';
import * as ttp from 'typescript-to-proptypes';
import { getGeneralPathInfo, getMaterialPathInfo, getBasePathInfo } from './buildApiUtils';
import buildComponentApi, { writePrettifiedFile } from './ApiBuilders/ComponentApiBuilder';

const apiDocsTranslationsDirectory = path.resolve('docs', 'translations', 'api-docs');

interface ReactApi extends ReactDocgenApi {
  /**
   * list of page pathnames
   * @example ['/components/Accordion']
   */
  demos: readonly string[];
  EOL: string;
  filename: string;
  apiUrl: string;
  forwardsRefTo: string | undefined;
  inheritance: { component: string; pathname: string } | null;
  /**
   * react component name
   * @example 'Accordion'
   */
  name: string;
  description: string;
  spread: boolean | undefined;
  /**
   * result of path.readFileSync from the `filename` in utf-8
   */
  src: string;
  styles: Styles;
  propsTable: _.Dictionary<{
    default: string | undefined;
    required: boolean | undefined;
    type: { name: string | undefined; description: string | undefined };
    deprecated: true | undefined;
    deprecationInfo: string | undefined;
  }>;
  translations: {
    componentDescription: string;
    propDescriptions: { [key: string]: string | undefined };
    classDescriptions: { [key: string]: { description: string; conditions?: string } };
  };
}

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

interface Settings {
  input: {
    /**
     * Component directories to be used to generate API
     */
    libDirectory: string[];
    /**
     * The directory to get api pathnames to generate pagesApi
     */
    pageDirectory: string;
    /**
     * The directory that contains markdown files to be used to find demos
     * related to the processed component
     */
    markdownDirectory: string;
  };
  output: {
    /**
     * API page + json content output directory
     */
    pagesDirectory: string;
    /**
     * The output path of `pagesApi` generated from `input.pageDirectory`
     */
    apiManifestPath: string;
  };
  productUrlPrefix: string;
  getPathInfo: (filename: string) => { apiUrl: string; demoUrl: string };
}

/**
 * This is the refactored version of the current API building process, nothing's changed.
 */
const BEFORE_MIGRATION_SETTINGS: Settings[] = [
  {
    input: {
      libDirectory: [
        path.join(process.cwd(), 'packages/mui-base/src'),
        path.join(process.cwd(), 'packages/mui-material/src'),
        path.join(process.cwd(), 'packages/mui-lab/src'),
      ],
      pageDirectory: path.join(process.cwd(), 'docs/pages'),
      markdownDirectory: path.join(process.cwd(), 'docs/src/pages'),
    },
    output: {
      pagesDirectory: path.join(process.cwd(), 'docs/pages/api-docs'),
      apiManifestPath: path.join(process.cwd(), 'docs/src/pagesApi.js'),
    },
    productUrlPrefix: '',
    getPathInfo: getGeneralPathInfo,
  },
];

/**
 * Once the preparation is done (as described in https://github.com/mui-org/material-ui/issues/30091), swithc to this settings.
 * It will generate API for the current & `/material` paths, then set the redirect to link `/api/*` to `/material/api/*`
 * At this point, `mui-base` content is still live in with `mui-material`.
 */
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MIGRATION_SETTINGS: Settings[] = [
  ...BEFORE_MIGRATION_SETTINGS,
  {
    input: {
      libDirectory: [
        path.join(process.cwd(), 'packages/mui-base/src'),
        path.join(process.cwd(), 'packages/mui-material/src'),
        path.join(process.cwd(), 'packages/mui-lab/src'),
      ],
      pageDirectory: path.join(process.cwd(), 'docs/pages/material'),
      markdownDirectory: path.join(process.cwd(), 'docs/data'),
    },
    output: {
      pagesDirectory: path.join(process.cwd(), 'docs/pages/material/api-docs'),
      apiManifestPath: path.join(process.cwd(), 'docs/data/material/pagesApi.js'),
    },
    productUrlPrefix: '/material',
    getPathInfo: getMaterialPathInfo,
  },
];

/**
 * Once redirects are stable
 * - Create `mui-base` content in `docs/pages/base/*` and switch to this settings.
 * - Remove old content directories, eg. `docs/pages/components/*`, ...etc
 */
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const POST_MIGRATION_SETTINGS: Settings[] = [
  {
    input: {
      libDirectory: [
        path.join(process.cwd(), 'packages/mui-material/src'),
        path.join(process.cwd(), 'packages/mui-lab/src'),
      ],
      pageDirectory: path.join(process.cwd(), 'docs/pages/material'),
      markdownDirectory: path.join(process.cwd(), 'docs/data'),
    },
    output: {
      pagesDirectory: path.join(process.cwd(), 'docs/pages/material/api-docs'),
      apiManifestPath: path.join(process.cwd(), 'docs/data/material/pagesApi.js'),
    },
    productUrlPrefix: '/material',
    getPathInfo: getMaterialPathInfo,
  },
  {
    input: {
      libDirectory: [path.join(process.cwd(), 'packages/mui-base/src')],
      pageDirectory: path.join(process.cwd(), 'docs/pages/base'),
      markdownDirectory: path.join(process.cwd(), 'docs/data'),
    },
    output: {
      pagesDirectory: path.join(process.cwd(), 'docs/pages/base/api-docs'),
      apiManifestPath: path.join(process.cwd(), 'docs/data/base/pagesApi.js'),
    },
    productUrlPrefix: '/base',
    getPathInfo: getBasePathInfo,
  },
  // add other products, eg. joy, data-grid, ...etc
];

const ACTIVE_SETTINGS = BEFORE_MIGRATION_SETTINGS;

async function run(argv: { grep?: string }) {
  const grep = argv.grep == null ? null : new RegExp(argv.grep);
  let allBuilds: Array<PromiseSettledResult<ReactApi | null>> = [];
  await ACTIVE_SETTINGS.reduce(async (resolvedPromise, setting) => {
    const workspaceRoot = path.resolve(__dirname, '../../');
    /**
     * @type {string[]}
     */
    const componentDirectories = setting.input.libDirectory;
    const apiPagesManifestPath = setting.output.apiManifestPath;
    const pagesDirectory = setting.output.pagesDirectory;

    mkdirSync(pagesDirectory, { mode: 0o777, recursive: true });
    const manifestDir = apiPagesManifestPath.match(/(.*)\/[^/]+\./)?.[1];
    if (manifestDir) {
      mkdirSync(manifestDir, { recursive: true });
    }

    /**
     * pageMarkdown: Array<{ components: string[]; filename: string; pathname: string }>
     *
     * e.g.:
     * [{
     *   pathname: '/components/accordion',
     *   filename: '/Users/user/Projects/material-ui/docs/src/pages/components/badges/accordion-ja.md',
     *   components: [ 'Accordion', 'AccordionActions', 'AccordionDetails', 'AccordionSummary' ]
     * }, ...]
     */
    const pagesMarkdown = findPagesMarkdown(setting.input.markdownDirectory)
      .map((markdown) => {
        const markdownSource = readFileSync(markdown.filename, 'utf8');
        return {
          ...markdown,
          pathname: setting.getPathInfo(markdown.filename).demoUrl,
          components: getHeaders(markdownSource).components,
        };
      })
      .filter((markdown) => markdown.components.length > 0);

    /**
     * components: Array<{ filename: string }>
     * e.g.
     * [{ filename: '/Users/user/Projects/material-ui/packages/mui-material/src/Accordion/Accordion.js'}, ...]
     */
    const components = componentDirectories
      .reduce((directories, componentDirectory) => {
        return directories.concat(findComponents(componentDirectory));
      }, [] as ReadonlyArray<{ filename: string }>)
      .filter((component) => {
        if (component.filename.includes('ThemeProvider')) {
          return false;
        }
        if (grep === null) {
          return true;
        }
        return grep.test(component.filename);
      });

    const tsconfig = ttp.loadConfig(path.resolve(workspaceRoot, './tsconfig.json'));
    const program = ttp.createTSProgram(
      components.map((component) => {
        if (component.filename.endsWith('.tsx')) {
          return component.filename;
        }
        if (component.filename.endsWith('.js')) {
          return component.filename.replace(/\.js$/, '.d.ts');
        }
        throw new TypeError(
          `Unexpected component filename '${component.filename}'. Expected either a .tsx or .js file.`,
        );
      }),
      tsconfig,
    );

    const componentBuilds = components.map(async (component) => {
      try {
        const { filename } = component;
        const pathInfo = setting.getPathInfo(filename);

        return buildComponentApi(filename, {
          ttpProgram: program,
          pagesMarkdown,
          apiUrl: pathInfo.apiUrl,
          productUrlPrefix: setting.productUrlPrefix,
          outputPagesDirectory: setting.output.pagesDirectory,
        });
      } catch (error: any) {
        error.message = `${path.relative(process.cwd(), component.filename)}: ${error.message}`;
        throw error;
      }
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

    const pages = findPages({ front: true }, setting.input.pageDirectory);
    const apiPages = pages.find(({ pathname }) => pathname.indexOf('api') !== -1)?.children;
    if (apiPages === undefined) {
      throw new TypeError('Unable to find pages under /api');
    }

    const source = `module.exports = ${JSON.stringify(apiPages)}`;
    writePrettifiedFile(apiPagesManifestPath, source);

    await resolvedPromise;
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
