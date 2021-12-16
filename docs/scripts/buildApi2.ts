import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as fse from 'fs-extra';
import path from 'path';
import * as babel from '@babel/core';
import traverse from '@babel/traverse';
import * as _ from 'lodash';
import kebabCase from 'lodash/kebabCase';
import * as prettier from 'prettier';
import remark from 'remark';
import remarkVisit from 'unist-util-visit';
import * as yargs from 'yargs';
import { defaultHandlers, parse as docgenParse, ReactDocgenApi } from 'react-docgen';
import muiDefaultPropsHandler from 'docs/src/modules/utils/defaultPropsHandler';
import { LANGUAGES } from 'docs/src/modules/constants';
import parseTest from 'docs/src/modules/utils/parseTest';
import generatePropTypeDescription, {
  getChained,
} from 'docs/src/modules/utils/generatePropTypeDescription';
import { findPages, findPagesMarkdown, findComponents } from 'docs/src/modules/utils/find';
import { getHeaders, renderInline as renderMarkdownInline } from '@mui/markdown';
import { pageToTitle } from 'docs/src/modules/utils/helpers';
import createDescribeableProp, {
  DescribeablePropDescriptor,
} from 'docs/src/modules/utils/createDescribeableProp';
import generatePropDescription from 'docs/src/modules/utils/generatePropDescription';
import parseStyles, { Styles } from 'docs/src/modules/utils/parseStyles';
import generateUtilityClass from '@mui/base/generateUtilityClass';
import * as ttp from 'typescript-to-proptypes';
import { getLineFeed } from './helpers';
import { findComponentDemos, getApiUrl, getComponentUrl, getMuiName } from './buildApiUtils';

const DEFAULT_PRETTIER_CONFIG_PATH = path.join(process.cwd(), 'prettier.config.js');
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
}

const cssComponents = ['Box', 'Grid', 'Typography', 'Stack'];

function writePrettifiedFile(
  filename: string,
  data: string,
  prettierConfigPath: string = DEFAULT_PRETTIER_CONFIG_PATH,
  options: object = {},
) {
  const prettierConfig = prettier.resolveConfig.sync(filename, {
    config: prettierConfigPath,
  });
  if (prettierConfig === null) {
    throw new Error(
      `Could not resolve config for '${filename}' using prettier config path '${prettierConfigPath}'.`,
    );
  }

  writeFileSync(filename, prettier.format(data, { ...prettierConfig, filepath: filename }), {
    encoding: 'utf8',
    ...options,
  });
}

/**
 * Produces markdown of the description that can be hosted anywhere.
 *
 * By default we assume that the markdown is hosted on mui.com which is
 * why the source includes relative url. We transform them to absolute urls with
 * this method.
 */
async function computeApiDescription(api: ReactApi, options: { host: string }): Promise<string> {
  const { host } = options;
  const file = await remark()
    .use(function docsLinksAttacher() {
      return function transformer(tree) {
        remarkVisit(tree, 'link', (linkNode) => {
          if ((linkNode.url as string).startsWith('/')) {
            linkNode.url = `${host}${linkNode.url}`;
          }
        });
      };
    })
    .process(api.description);

  return file.contents.toString('utf-8').trim();
}

/**
 * Add demos & API comment block to type definitions, e.g.:
 * /**
 *  * Demos:
 *  *
 *  * - [Icons](https://mui.com/components/icons/)
 *  * - [Material Icons](https://mui.com/components/material-icons/)
 *  *
 *  * API:
 *  *
 *  * - [Icon API](https://mui.com/api/icon/)
 */
async function annotateComponentDefinition(api: ReactApi) {
  const HOST = 'https://mui.com';

  const typesFilename = api.filename.replace(/\.js$/, '.d.ts');
  const typesSource = readFileSync(typesFilename, { encoding: 'utf8' });
  const typesAST = await babel.parseAsync(typesSource, {
    configFile: false,
    filename: typesFilename,
    presets: [require.resolve('@babel/preset-typescript')],
  });
  if (typesAST === null) {
    throw new Error('No AST returned from babel.');
  }

  let start = 0;
  let end = null;
  traverse(typesAST, {
    ExportDefaultDeclaration(babelPath) {
      /**
       * export default function Menu() {}
       */
      let node: babel.Node = babelPath.node;
      if (node.declaration.type === 'Identifier') {
        // declare const Menu: {};
        // export default Menu;
        if (babel.types.isIdentifier(babelPath.node.declaration)) {
          const bindingId = babelPath.node.declaration.name;
          const binding = babelPath.scope.bindings[bindingId];

          // The JSDoc MUST be located at the declaration
          if (babel.types.isFunctionDeclaration(binding.path.node)) {
            // For function declarations the binding is equal to the declaration
            // /**
            //  */
            // function Component() {}
            node = binding.path.node;
          } else {
            // For variable declarations the binding points to the declarator.
            // /**
            //  */
            // const Component = () => {}
            node = binding.path.parentPath.node;
          }
        }
      }

      const { leadingComments } = node;
      const leadingCommentBlocks =
        leadingComments != null
          ? leadingComments.filter(({ type }) => type === 'CommentBlock')
          : null;
      const jsdocBlock = leadingCommentBlocks != null ? leadingCommentBlocks[0] : null;
      if (leadingCommentBlocks != null && leadingCommentBlocks.length > 1) {
        throw new Error(
          `Should only have a single leading jsdoc block but got ${
            leadingCommentBlocks.length
          }:\n${leadingCommentBlocks
            .map(({ type, value }, index) => `#${index} (${type}): ${value}`)
            .join('\n')}`,
        );
      }
      if (jsdocBlock != null) {
        start = jsdocBlock.start;
        end = jsdocBlock.end;
      } else if (node.start !== null) {
        start = node.start - 1;
        end = start;
      }
    },
  });

  if (end === null || start === 0) {
    throw new TypeError(
      "Don't know where to insert the jsdoc block. Probably no `default export` found",
    );
  }

  let inheritanceAPILink = null;
  if (api.inheritance !== null) {
    const url = api.inheritance.pathname.startsWith('/')
      ? `${HOST}${api.inheritance.pathname}`
      : api.inheritance.pathname;

    inheritanceAPILink = `[${api.inheritance.component} API](${url})`;
  }

  const markdownLines = (await computeApiDescription(api, { host: HOST })).split('\n');
  // Ensure a newline between manual and generated description.
  if (markdownLines[markdownLines.length - 1] !== '') {
    markdownLines.push('');
  }
  markdownLines.push(
    'Demos:',
    '',
    ...api.demos.map((demoPathname) => {
      return `- [${pageToTitle({ pathname: demoPathname })}](${HOST}${demoPathname}/)`;
    }),
    '',
  );

  markdownLines.push('API:', '', `- [${api.name} API](${HOST}/api/${kebabCase(api.name)}/)`);
  if (api.inheritance !== null) {
    markdownLines.push(`- inherits ${inheritanceAPILink}`);
  }

  const jsdoc = `/**\n${markdownLines
    .map((line) => (line.length > 0 ? ` * ${line}` : ` *`))
    .join('\n')}\n */`;
  const typesSourceNew = typesSource.slice(0, start) + jsdoc + typesSource.slice(end);
  writeFileSync(typesFilename, typesSourceNew, { encoding: 'utf8' });
}

/**
 * Substitute CSS class description conditions with placeholder
 */
function extractClassConditions(descriptions: any) {
  const classConditions: {
    [key: string]: { description: string; conditions?: string; nodeName?: string };
  } = {};
  const stylesRegex =
    /((Styles|State class|Class name) applied to )(.*?)(( if | unless | when |, ){1}(.*))?\./;

  Object.entries(descriptions).forEach(([className, description]: any) => {
    if (className) {
      const conditions = description.match(stylesRegex);

      if (conditions && conditions[6]) {
        classConditions[className] = {
          description: description.replace(stylesRegex, '$1{{nodeName}}$5{{conditions}}.'),
          nodeName: conditions[3],
          conditions: conditions[6].replace(/`(.*?)`/g, '<code>$1</code>'),
        };
      } else if (conditions && conditions[3] && conditions[3] !== 'the root element') {
        classConditions[className] = {
          description: description.replace(stylesRegex, '$1{{nodeName}}$5.'),
          nodeName: conditions[3],
        };
      } else {
        classConditions[className] = { description };
      }
    }
  });
  return classConditions;
}

/**
 * Generate list of component demos
 */
function generateDemoList(reactAPI: ReactApi): string {
  return `<ul>${reactAPI.demos
    .map(
      (demoPathname) =>
        `<li><a href="${demoPathname}/">${pageToTitle({ pathname: demoPathname })}</a></li>`,
    )
    .join('\n')}</ul>`;
}

/**
 * @param filepath - absolute path
 * @example toGithubPath('/home/user/material-ui/packages/Accordion') === '/packages/Accordion'
 * @example toGithubPath('C:\\Development\material-ui\packages\Accordion') === '/packages/Accordion'
 */
function toGithubPath(filepath: string): string {
  return `/${path.relative(process.cwd(), filepath).replace(/\\/g, '/')}`;
}

const generateTranslationsApiJson = (componentName: string, componentApi: object) => {
  const apiDocsTranslationPath = path.resolve(
    apiDocsTranslationsDirectory,
    kebabCase(componentName),
  );
  function resolveApiDocsTranslationsComponentLanguagePath(language: typeof LANGUAGES[0]): string {
    const languageSuffix = language === 'en' ? '' : `-${language}`;

    return path.join(apiDocsTranslationPath, `${kebabCase(componentName)}${languageSuffix}.json`);
  }

  mkdirSync(apiDocsTranslationPath, {
    mode: 0o777,
    recursive: true,
  });

  writePrettifiedFile(
    resolveApiDocsTranslationsComponentLanguagePath('en'),
    JSON.stringify(componentApi),
  );

  LANGUAGES.forEach((language) => {
    if (language !== 'en') {
      try {
        writePrettifiedFile(
          resolveApiDocsTranslationsComponentLanguagePath(language),
          JSON.stringify(componentApi),
          undefined,
          { flag: 'wx' },
        );
      } catch (error) {
        // File exists
      }
    }
  });
};

const generateApiPage = (outputDirectory: string, reactApi: ReactApi, componentProps: object) => {
  /**
   * Gather the metadata needed for the component's API page.
   */
  const pageContent = {
    // Sorted by required DESC, name ASC
    props: _.fromPairs(
      Object.entries(componentProps).sort(([aName, aData], [bName, bData]) => {
        if ((aData.required && bData.required) || (!aData.required && !bData.required)) {
          return aName.localeCompare(bName);
        }
        if (aData.required) {
          return -1;
        }
        return 1;
      }),
    ),
    name: reactApi.name,
    styles: {
      classes: reactApi.styles.classes,
      globalClasses: _.fromPairs(
        Object.entries(reactApi.styles.globalClasses).filter(([className, globalClassName]) => {
          // Only keep "non-standard" global classnames
          return globalClassName !== `Mui${reactApi.name}-${className}`;
        }),
      ),
      name: reactApi.styles.name,
    },
    spread: reactApi.spread,
    forwardsRefTo: reactApi.forwardsRefTo,
    filename: toGithubPath(reactApi.filename),
    inheritance: reactApi.inheritance,
    demos: generateDemoList(reactApi),
    cssComponent: cssComponents.indexOf(reactApi.name) >= 0,
  };

  writePrettifiedFile(
    path.resolve(outputDirectory, `${kebabCase(reactApi.name)}.json`),
    JSON.stringify(pageContent),
  );

  writePrettifiedFile(
    path.resolve(outputDirectory, `${kebabCase(reactApi.name)}.js`),
    `import * as React from 'react';
import ApiPage from 'docs/src/modules/components/ApiPage';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import jsonPageContent from './${kebabCase(reactApi.name)}.json';

export default function Page(props) {
  const { descriptions, pageContent } = props;
  return <ApiPage descriptions={descriptions} pageContent={pageContent} />;
}

Page.getInitialProps = () => {
  const req = require.context(
    'docs/translations/api-docs/${kebabCase(reactApi.name)}',
    false,
    /${kebabCase(reactApi.name)}.*.json$/,
  );
  const descriptions = mapApiPageTranslations(req);

  return {
    descriptions,
    pageContent: jsonPageContent,
  };
};
`.replace(/\r?\n/g, reactApi.EOL),
  );
};

const getComponentData = (reactApi: ReactDocgenApi) => {
  const componentApi: {
    componentDescription: string;
    propDescriptions: { [key: string]: string | undefined };
    classDescriptions: { [key: string]: { description: string; conditions?: string } };
  } = {
    componentDescription: reactApi.description,
    propDescriptions: {},
    classDescriptions: {},
  };
  const propErrors: Array<[propName: string, error: Error]> = [];
  const componentProps = _.fromPairs<{
    default: string | undefined;
    required: boolean | undefined;
    type: { name: string | undefined; description: string | undefined };
    deprecated: true | undefined;
    deprecationInfo: string | undefined;
  }>(
    Object.entries(reactApi.props!).map(([propName, propDescriptor]) => {
      let prop: DescribeablePropDescriptor | null;
      try {
        prop = createDescribeableProp(propDescriptor, propName);
      } catch (error) {
        propErrors.push([propName, error as Error]);
        prop = null;
      }
      if (prop === null) {
        // have to delete `componentProps.undefined` later
        return [] as any;
      }

      let description = generatePropDescription(prop, propName);
      description = renderMarkdownInline(description);

      if (propName === 'classes') {
        description += ' See <a href="#css">CSS API</a> below for more details.';
      } else if (propName === 'sx') {
        description += ' See the <a href="/system/the-sx-prop/">`sx` page</a> for more details.';
      }
      componentApi.propDescriptions[propName] = description.replace(/\n@default.*$/, '');

      // Only keep `default` for bool props if it isn't 'false'.
      let defaultValue: string | undefined;
      if (
        propDescriptor.type.name !== 'bool' ||
        propDescriptor.jsdocDefaultValue?.value !== 'false'
      ) {
        defaultValue = propDescriptor.jsdocDefaultValue?.value;
      }

      const propTypeDescription = generatePropTypeDescription(propDescriptor.type);
      const chainedPropType = getChained(prop.type);

      const requiredProp =
        prop.required ||
        /\.isRequired/.test(prop.type.raw) ||
        (chainedPropType !== false && chainedPropType.required);

      const deprecation = (propDescriptor.description || '').match(/@deprecated(\s+(?<info>.*))?/);

      return [
        propName,
        {
          type: {
            name: propDescriptor.type.name,
            description:
              propTypeDescription !== propDescriptor.type.name ? propTypeDescription : undefined,
          },
          default: defaultValue,
          // undefined values are not serialized => saving some bytes
          required: requiredProp || undefined,
          deprecated: !!deprecation || undefined,
          deprecationInfo:
            renderMarkdownInline(deprecation?.groups?.info || '').trim() || undefined,
        },
      ];
    }),
  );
  if (propErrors.length > 0) {
    throw new Error(
      `There were errors creating prop descriptions:\n${propErrors
        .map(([propName, error]) => {
          return `  - ${propName}: ${error}`;
        })
        .join('\n')}`,
    );
  }

  // created by returning the `[]` entry
  delete componentProps.undefined;

  return { componentProps, componentApi };
};

const parseFile = (filename: string) => {
  const src = readFileSync(filename, 'utf8');
  return {
    src,
    shouldSkip:
      filename.indexOf('internal') !== -1 ||
      !!src.match(/@ignore - internal component\./) ||
      !!src.match(/@ignore - do not document\./),
    spread: !src.match(/ = exactProp\(/),
    name: path.parse(filename).name,
    EOL: getLineFeed(src),
    inheritedComponent: src.match(/\/\/ @inheritedComponent (.*)/)?.[1],
  };
};

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

  // outdatedComponentDirectories = currentComponentDirectories.difference(componentDirectories)
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

const SETTINGS = [
  {
    input: {
      libDirectory: path.join(process.cwd(), 'packages/mui-material/src'),
      pageDirectory: path.join(process.cwd(), 'docs/pages/material'),
      markdownDirectory: path.join(process.cwd(), 'docs/products/material/components'),
    },
    output: {
      pagesDirectory: path.join(process.cwd(), 'docs/pages/material/api-docs'),
      apiManifestPath: path.join(process.cwd(), 'docs/products/material/pagesApi.js'),
    },
  },
];

async function run(argv: { grep?: string }) {
  await Promise.allSettled(
    SETTINGS.map(async (setting) => {
      const workspaceRoot = path.resolve(__dirname, '../../');
      /**
       * @type {string[]}
       */
      const componentDirectories = [setting.input.libDirectory];
      const apiPagesManifestPath = setting.output.apiManifestPath;
      const outputDirectory = setting.output.pagesDirectory;
      const grep = argv.grep == null ? null : new RegExp(argv.grep);

      mkdirSync(outputDirectory, { mode: 0o777, recursive: true });

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
            pathname: getComponentUrl(markdown.filename),
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
          const { shouldSkip, name, spread, EOL, inheritedComponent } = parseFile(filename);

          if (shouldSkip) {
            return null;
          }

          const reactApi: ReactApi = docgenParse(
            readFileSync(filename, 'utf8'),
            null,
            defaultHandlers.concat(muiDefaultPropsHandler),
            { filename },
          );

          // Ignore what we might have generated in `annotateComponentDefinition`
          const annotatedDescriptionMatch = reactApi.description.match(/(Demos|API):\r?\n\r?\n/);
          if (annotatedDescriptionMatch !== null) {
            reactApi.description = reactApi.description
              .slice(0, annotatedDescriptionMatch.index)
              .trim();
          }
          reactApi.filename = filename;
          reactApi.name = name;
          reactApi.apiUrl = getApiUrl(filename);
          reactApi.EOL = EOL;
          reactApi.demos = findComponentDemos(name, pagesMarkdown);
          if (reactApi.demos.length === 0) {
            throw new Error(
              'Unable to find demos. \n' +
                `Be sure to include \`components: ${reactApi.name}\` in the markdown pages where the \`${reactApi.name}\` component is relevant. ` +
                'Every public component should have a demo. ',
            );
          }

          const testInfo = await parseTest(filename);
          // no Object.assign to visually check for collisions
          reactApi.forwardsRefTo = testInfo.forwardsRefTo;
          reactApi.spread = testInfo.spread ?? spread;

          const inheritedComponentName = testInfo.inheritComponent || inheritedComponent;
          if (inheritedComponentName) {
            reactApi.inheritance = {
              component: inheritedComponentName,
              pathname:
                inheritedComponentName === 'Transition'
                  ? 'http://reactcommunity.org/react-transition-group/transition/#Transition-props'
                  : `/api/${kebabCase(inheritedComponentName)}/`,
            };
          } else {
            reactApi.inheritance = null;
          }

          reactApi.styles = await parseStyles(reactApi, program);

          if (reactApi.styles.classes.length > 0 && !reactApi.name.endsWith('Unstyled')) {
            reactApi.styles.name = getMuiName(reactApi.name);
          }
          reactApi.styles.classes.forEach((key) => {
            const globalClass = generateUtilityClass(
              reactApi.styles.name || getMuiName(reactApi.name),
              key,
            );
            reactApi.styles.globalClasses[key] = globalClass;
          });

          const { componentApi, componentProps } = getComponentData(reactApi);

          /**
           * CSS class descriptiohs.
           */
          componentApi.classDescriptions = extractClassConditions(reactApi.styles.descriptions);

          generateTranslationsApiJson(reactApi.name, componentApi);

          // docs/pages/component-name.json
          generateApiPage(outputDirectory, reactApi, componentProps);

          // eslint-disable-next-line no-console
          console.log('Built API docs for', reactApi.name);

          await annotateComponentDefinition(reactApi);

          return reactApi;
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

      const [{ children: apiPages }] = findPages({ front: true }, setting.input.pageDirectory);
      if (apiPages === undefined) {
        throw new TypeError('Unable to find pages under /api');
      }

      const source = `module.exports = ${JSON.stringify(apiPages)}`;
      writePrettifiedFile(apiPagesManifestPath, source);

      if (grep === null) {
        const componentApis = builds
          .filter((build): build is PromiseFulfilledResult<ReactApi> => {
            return build.status === 'fulfilled' && build.value !== null;
          })
          .map((build) => {
            return build.value;
          });
        await removeOutdatedApiDocsTranslations(componentApis);
      }
    }),
  );
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
