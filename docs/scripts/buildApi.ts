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
import { getLineFeed, getUnstyledFilename } from './helpers';

const apiDocsTranslationsDirectory = path.resolve('docs', 'translations', 'api-docs');
function resolveApiDocsTranslationsComponentDirectory(component: ReactApi): string {
  return path.resolve(apiDocsTranslationsDirectory, kebabCase(component.name));
}
function resolveApiDocsTranslationsComponentLanguagePath(
  component: ReactApi,
  language: typeof LANGUAGES[0],
): string {
  const languageSuffix = language === 'en' ? '' : `-${language}`;

  return path.join(
    resolveApiDocsTranslationsComponentDirectory(component),
    `${kebabCase(component.name)}${languageSuffix}.json`,
  );
}

interface ReactApi extends ReactDocgenApi {
  /**
   * list of page pathnames
   * @example ['/components/Accordion']
   */
  demos: readonly string[];
  EOL: string;
  filename: string;
  forwardsRefTo: string | undefined;
  inheritance: { component: string; pathname: string } | null;
  name: string;
  spread: boolean | undefined;
  src: string;
  styles: Styles;
}

const cssComponents = ['Box', 'Grid', 'Typography'];

function writePrettifiedFile(
  filename: string,
  data: string,
  prettierConfigPath: string,
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
 * Receives a component's test information and source code and return's an object
 * containing the inherited component's name and pathname.
 * @param testInfo Information retrieved from the component's describeConformance() in its test.js file.
 * @param src The component's source code.
 */
function getInheritance(
  testInfo: {
    /** The name of the component functionality is inherited from. */
    inheritComponent: string | undefined;
  },
  src: string,
) {
  let inheritedComponentName = testInfo.inheritComponent;

  if (inheritedComponentName == null) {
    const match = src.match(/\/\/ @inheritedComponent (.*)/);
    if (match !== null) {
      inheritedComponentName = match[1];
    }
  }

  if (inheritedComponentName == null) {
    return null;
  }

  let pathname;

  switch (inheritedComponentName) {
    case 'Transition':
      pathname = 'http://reactcommunity.org/react-transition-group/transition/#Transition-props';
      break;

    default:
      pathname = `/api/${kebabCase(inheritedComponentName)}/`;
      break;
  }

  return {
    component: inheritedComponentName,
    pathname,
  };
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
async function annotateComponentDefinition(context: {
  component: { filename: string };
  api: ReactApi;
}) {
  const { api, component } = context;
  const HOST = 'https://mui.com';

  const typesFilename = component.filename.replace(/\.js$/, '.d.ts');
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

function generateMuiName(name: string) {
  return `Mui${name.replace('Unstyled', '').replace('Styled', '')}`;
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
function toGithubPath(filepath: string, workspaceRoot: string): string {
  return `/${path.relative(workspaceRoot, filepath).replace(/\\/g, '/')}`;
}

async function parseComponentSource(
  src: string,
  componentObject: { filename: string },
): Promise<ReactApi> {
  const reactAPI: ReactApi = docgenParse(
    src,
    null,
    defaultHandlers.concat(muiDefaultPropsHandler),
    {
      filename: componentObject.filename,
    },
  );

  const fullDescription = reactAPI.description;
  // Ignore what we might have generated in `annotateComponentDefinition`
  const annotatedDescriptionMatch = fullDescription.match(/(Demos|API):\r?\n\r?\n/);
  if (annotatedDescriptionMatch !== null) {
    reactAPI.description = fullDescription.slice(0, annotatedDescriptionMatch.index).trim();
  }

  return reactAPI;
}

function findComponentDemos(
  api: ReactApi,
  pagesMarkdown: ReadonlyArray<{ pathname: string; components: readonly string[] }>,
): ReactApi['demos'] {
  const demos = pagesMarkdown
    .filter((page) => {
      return page.components.includes(api.name);
    })
    .map((page) => {
      return page.pathname;
    });

  return Array.from(new Set(demos));
}

async function buildDocs(options: {
  component: { filename: string };
  pagesMarkdown: ReadonlyArray<{
    components: readonly string[];
    filename: string;
    pathname: string;
  }>;
  prettierConfigPath: string;
  program: ttp.ts.Program;
  outputDirectory: string;
  workspaceRoot: string;
}): Promise<ReactApi | null> {
  const {
    component: componentObject,
    outputDirectory,
    workspaceRoot,
    pagesMarkdown,
    prettierConfigPath,
    program,
  } = options;

  if (componentObject.filename.indexOf('internal') !== -1) {
    return null;
  }

  const src = readFileSync(componentObject.filename, 'utf8');

  if (src.match(/@ignore - internal component\./) || src.match(/@ignore - do not document\./)) {
    return null;
  }

  const spread = !src.match(/ = exactProp\(/);

  const name = path.parse(componentObject.filename).name;

  const reactApi: ReactApi = await parseComponentSource(src, componentObject);
  reactApi.filename = componentObject.filename;

  const componentApi: {
    componentDescription: string;
    propDescriptions: { [key: string]: string | undefined };
    classDescriptions: { [key: string]: { description: string; conditions?: string } };
  } = {
    componentDescription: reactApi.description,
    propDescriptions: {},
    classDescriptions: {},
  };

  const unstyledFileName = getUnstyledFilename(componentObject.filename);
  let unstyledSrc;

  // Try to get data for the unstyled component
  try {
    unstyledSrc = readFileSync(unstyledFileName, 'utf8');
  } catch (err) {
    // Unstyled component does not exist
  }

  if (unstyledSrc) {
    const unstyledReactAPI = docgenParse(
      unstyledSrc,
      null,
      defaultHandlers.concat(muiDefaultPropsHandler),
      {
        filename: unstyledFileName,
      },
    );

    Object.keys(unstyledReactAPI.props).forEach((prop) => {
      if (
        unstyledReactAPI.props[prop].defaultValue &&
        reactApi.props &&
        (!reactApi.props[prop] || !reactApi.props[prop].defaultValue)
      ) {
        if (reactApi.props[prop]) {
          reactApi.props[prop].defaultValue = unstyledReactAPI.props[prop].defaultValue;
          reactApi.props[prop].jsdocDefaultValue = unstyledReactAPI.props[prop].jsdocDefaultValue;
        } else {
          reactApi.props[prop] = unstyledReactAPI.props[prop];
        }
      }
    });
  }

  reactApi.name = name;
  reactApi.EOL = getLineFeed(src);

  reactApi.demos = findComponentDemos(reactApi, pagesMarkdown);
  if (reactApi.demos.length === 0) {
    throw new Error(
      'Unable to find demos. \n' +
        `Be sure to include \`components: ${reactApi.name}\` in the markdown pages where the \`${reactApi.name}\` component is relevant. ` +
        'Every public component should have a demo. ',
    );
  }

  const testInfo = await parseTest(componentObject.filename);
  // no Object.assign to visually check for collisions
  reactApi.forwardsRefTo = testInfo.forwardsRefTo;
  reactApi.spread = testInfo.spread ?? spread;

  reactApi.inheritance = getInheritance(testInfo, src);

  reactApi.styles = await parseStyles(reactApi, program);

  if (reactApi.styles.classes.length > 0 && !reactApi.name.endsWith('Unstyled')) {
    reactApi.styles.name = generateMuiName(reactApi.name);
  }
  reactApi.styles.classes.forEach((key) => {
    const globalClass = generateUtilityClass(
      reactApi.styles.name || generateMuiName(reactApi.name),
      key,
    );
    reactApi.styles.globalClasses[key] = globalClass;
  });

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

  /**
   * CSS class descriptiohs.
   */
  componentApi.classDescriptions = extractClassConditions(reactApi.styles.descriptions);

  mkdirSync(resolveApiDocsTranslationsComponentDirectory(reactApi), {
    mode: 0o777,
    recursive: true,
  });

  writePrettifiedFile(
    resolveApiDocsTranslationsComponentLanguagePath(reactApi, 'en'),
    JSON.stringify(componentApi),
    prettierConfigPath,
  );

  LANGUAGES.forEach((language) => {
    if (language !== 'en') {
      try {
        writePrettifiedFile(
          resolveApiDocsTranslationsComponentLanguagePath(reactApi, language),
          JSON.stringify(componentApi),
          prettierConfigPath,
          { flag: 'wx' },
        );
      } catch (error) {
        // File exists
      }
    }
  });

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
    filename: toGithubPath(reactApi.filename, workspaceRoot),
    inheritance: reactApi.inheritance,
    demos: generateDemoList(reactApi),
    cssComponent: cssComponents.indexOf(reactApi.name) >= 0,
  };

  // docs/pages/component-name.json
  writePrettifiedFile(
    path.resolve(outputDirectory, `${kebabCase(reactApi.name)}.json`),
    JSON.stringify(pageContent),
    prettierConfigPath,
  );

  // docs/pages/component-name.js
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
    prettierConfigPath,
  );

  // eslint-disable-next-line no-console
  console.log('Built API docs for', reactApi.name);

  await annotateComponentDefinition({ api: reactApi, component: componentObject });

  return reactApi;
}

/**
 * Creates .js file containing all /api nextjs pages
 */
function generateApiPagesManifest(outputPath: string, prettierConfigPath: string): void {
  const [{ children: apiPages }] = findPages({ front: true });
  if (apiPages === undefined) {
    throw new TypeError('Unable to find pages under /api');
  }

  const source = `module.exports = ${JSON.stringify(apiPages)}`;
  writePrettifiedFile(outputPath, source, prettierConfigPath);
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
      return resolveApiDocsTranslationsComponentDirectory(component);
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

async function run(argv: {
  apiPagesManifestPath?: string;
  componentDirectories?: readonly string[];
  grep?: string;
  outputDirectory?: string;
}) {
  const workspaceRoot = path.resolve(__dirname, '../../');
  /**
   * @type {string[]}
   */
  const componentDirectories = argv.componentDirectories!.map((componentDirectory) => {
    return path.resolve(componentDirectory);
  });
  const apiPagesManifestPath = path.resolve(argv.apiPagesManifestPath!);
  const outputDirectory = path.resolve(argv.outputDirectory!);
  const grep = argv.grep == null ? null : new RegExp(argv.grep);

  const prettierConfigPath = path.join(workspaceRoot, 'prettier.config.js');

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
  const pagesMarkdown = findPagesMarkdown()
    .map((markdown) => {
      const markdownSource = readFileSync(markdown.filename, 'utf8');
      return {
        ...markdown,
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
      return await buildDocs({
        component,
        outputDirectory,
        pagesMarkdown,
        prettierConfigPath,
        program,
        workspaceRoot,
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

  generateApiPagesManifest(apiPagesManifestPath, prettierConfigPath);
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
}

yargs
  .command({
    command: '$0 <outputDirectory> [componentDirectories...]',
    describe: 'formats codebase',
    builder: (command) => {
      return command
        .positional('outputDirectory', {
          description: 'directory where the files are written to',
          type: 'string',
        })
        .positional('componentDirectories', {
          array: true,
          description: 'Directories to component sources',
          type: 'string',
        })
        .option('grep', {
          description:
            'Only generate files for component filenames matching the pattern. The string is treated as a RegExp.',
          type: 'string',
        })
        .option('apiPagesManifestPath', {
          description: 'The path to the file where pages available under /api are written to.',
          requiresArg: true,
          type: 'string',
        });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
