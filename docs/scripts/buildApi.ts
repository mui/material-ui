/* eslint-disable no-console */
import * as babel from '@babel/core';
import traverse from '@babel/traverse';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import uniqBy from 'lodash/uniqBy';
import * as prettier from 'prettier';
import { defaultHandlers, parse as docgenParse } from 'react-docgen';
import remark from 'remark';
import remarkVisit from 'unist-util-visit';
import * as yargs from 'yargs';
import muiDefaultPropsHandler from 'docs/src/modules/utils/defaultPropsHandler';
import generateMarkdown, { ReactApi } from 'docs/src/modules/utils/generateMarkdown';
import parseTest from 'docs/src/modules/utils/parseTest';
import { findPagesMarkdown, findComponents } from 'docs/src/modules/utils/find';
import { getHeaders } from 'docs/src/modules/utils/parseMarkdown';
import { pageToTitle } from 'docs/src/modules/utils/helpers';
import createGenerateClassName from '../../packages/material-ui-styles/src/createGenerateClassName';
import getStylesCreator from '../../packages/material-ui-styles/src/getStylesCreator';
import createMuiTheme from '../../packages/material-ui/src/styles/createMuiTheme';
import { getLineFeed, getUnstyledFilename } from './helpers';

const generateClassName = createGenerateClassName();

const inheritedComponentRegexp = /\/\/ @inheritedComponent (.*)/;

/**
 * Receives a component's test information and source code and return's an object
 * containing the inherited component's name and pathname
 * @param testInfo Information retrieved from the component's describeConformance() in its test.js file
 * @param src The component's source code
 */
function getInheritance(
  testInfo: {
    /** The name of the component functionality is inherited from */
    inheritComponent: string | undefined;
  },
  src: string,
) {
  let inheritedComponentName = testInfo.inheritComponent;

  if (inheritedComponentName == null) {
    const match = src.match(inheritedComponentRegexp);
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
      pathname = 'https://reactcommunity.org/react-transition-group/transition#Transition-props';
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
 * By default we assume that the markdown is hosted on material-ui.com which is
 * why the source includes relative url. We transform them to absolute urls with
 * this method.
 */
function computeApiDescription(api: ReactApi, options: { host: string }): Promise<string> {
  const { host } = options;
  return new Promise((resolve, reject) => {
    remark()
      .use(function docsLinksAttacher() {
        return function transformer(tree) {
          remarkVisit(tree, 'link', (linkNode) => {
            if ((linkNode.url as string).startsWith('/')) {
              linkNode.url = `${host}${linkNode.url}`;
            }
          });
        };
      })
      .process(api.description, (error, file) => {
        if (error) reject(error);

        resolve(file.contents.toString('utf-8').trim());
      });
  });
}

async function annotateComponentDefinition(context: {
  component: { filename: string };
  api: ReactApi;
}) {
  const { api, component } = context;
  const HOST = 'https://material-ui.com';

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
          node = binding.path.parentPath.node;
        }
      }

      const { leadingComments } = node;
      const jsdocBlock = leadingComments != null ? leadingComments[0] : null;
      if (leadingComments != null && leadingComments.length > 1) {
        throw new Error('Should only have a single leading jsdoc block');
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

  const demos = uniqBy<ReactApi['pagesMarkdown'][0]>(
    api.pagesMarkdown.filter((page) => {
      // Testing for Unstyled avoids the need to mention the unstyled components in the
      // `components` key of the markdown header YAML.
      return (
        page.components.includes(api.name) ||
        (api.name.endsWith('Unstyled') &&
          page.components.includes(api.name.replace('Unstyled', '')))
      );
    }, []),
    (page) => page.pathname,
  );

  let inheritanceAPILink = null;
  if (api.inheritance !== null) {
    const url = api.inheritance.pathname.startsWith('/')
      ? `${HOST}${api.inheritance.pathname}`
      : api.inheritance.pathname;

    inheritanceAPILink = `[${api.inheritance.component} API](${url})`;
  }

  const markdownLines = (await computeApiDescription(api, { host: HOST })).split('\n');
  if (demos.length > 0) {
    markdownLines.push(
      'Demos:',
      '',
      ...demos.map((page) => `- [${pageToTitle(page)}](${HOST}${page.pathname}/)`),
      '',
    );
  }

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

const trimComment = (comment: string) => {
  let startIdx = 0;
  while (comment[startIdx] === '*' || comment[startIdx] === ' ') {
    startIdx += 1;
  }

  let endIdx = comment.length - 1;
  while (comment[endIdx] === ' ') {
    endIdx -= 1;
  }

  return comment.substr(startIdx, endIdx - startIdx + 1);
};

function generateMuiName(name: string) {
  return `Mui${name.replace('Unstyled', '').replace('Styled', '')}`;
}

async function updateStylesDefinition(context: {
  styles: ReactApi['styles'];
  component: { filename: string };
}) {
  const { styles, component } = context;

  const typesFilename = component.filename.replace(/\.js$/, '.d.ts');

  const unstyledFileName = getUnstyledFilename(typesFilename, true);

  try {
    // If the JSON file doesn't exists try extracting the info from the TS definition
    const typesSource = readFileSync(unstyledFileName, { encoding: 'utf8' });
    const typesAST = await babel.parseAsync(typesSource, {
      configFile: false,
      filename: unstyledFileName,
      presets: [require.resolve('@babel/preset-typescript')],
    });
    if (typesAST === null) {
      throw new Error('No AST returned from babel.');
    }

    // is not unstyled component
    if (typesFilename !== unstyledFileName) {
      styles.name = generateMuiName(path.parse(component.filename).name);
    }

    traverse(typesAST, {
      TSPropertySignature(babelPath) {
        const { node } = babelPath;
        const possiblyPropName = (node.key as babel.types.Identifier).name;
        if (possiblyPropName === 'classes' && node.typeAnnotation !== null) {
          const members = (node.typeAnnotation.typeAnnotation as babel.types.TSTypeLiteral).members;

          if (members) {
            styles.descriptions = {};
            members.forEach((member) => {
              const className = ((member as babel.types.TSPropertySignature)
                .key as babel.types.Identifier).name;
              styles.classes.push(className);
              if (member.leadingComments) {
                styles.descriptions[className] = trimComment(member.leadingComments[0].value);
              }
            });
          }
        }
      },
    });
  } catch (e) {
    // Do nothing as not every components has an unstyled version
  }
}

async function annotateClassesDefinition(context: {
  api: ReactApi;
  component: { filename: string };
  prettierConfigPath: string;
}) {
  const { api, component, prettierConfigPath } = context;

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
  let end: number | null = null;
  traverse(typesAST, {
    TSPropertySignature(babelPath) {
      const { node } = babelPath;
      const possiblyPropName = (node.key as babel.types.Identifier).name;
      if (possiblyPropName === 'classes' && node.typeAnnotation !== null) {
        if (end !== null) {
          throw new Error('Found multiple possible locations for the `classes` definition.');
        }
        if (node.typeAnnotation.start !== null) {
          start = node.typeAnnotation.start;
          end = node.typeAnnotation.end;
        }
      }
    },
  });

  if (end === null || start === 0) {
    // Some components actually don't implement this prop.
    return;
  }

  // colon is part of TSTypeAnnotation
  let classesDefinitionSource = ': {';
  api.styles.classes.forEach((className) => {
    if (api.styles.descriptions[className] !== undefined) {
      classesDefinitionSource += `\n/** ${api.styles.descriptions[className]} */`;
    }
    classesDefinitionSource += `\n'${className}'?: string;`;
  });
  // semicolon is not part of TSTypeAnnotation
  classesDefinitionSource += `\n}`;

  const typesSourceNew =
    typesSource.slice(0, start) + classesDefinitionSource + typesSource.slice(end);

  const prettierConfig = prettier.resolveConfig.sync(typesFilename, {
    config: prettierConfigPath,
  });
  if (prettierConfig === null) {
    throw new Error(
      `Could not resolve config for '${typesFilename}' using prettier config path '${prettierConfigPath}'.`,
    );
  }

  writeFileSync(
    typesFilename,
    prettier.format(typesSourceNew, { ...prettierConfig, filepath: typesFilename }),
    {
      encoding: 'utf8',
    },
  );
}

async function buildDocs(options: {
  component: { filename: string };
  pagesMarkdown: Array<{ components: string[]; filename: string; pathname: string }>;
  prettierConfigPath: string;
  outputDirectory: string;
  theme: object;
  workspaceRoot: string;
}) {
  const {
    component: componentObject,
    outputDirectory,
    workspaceRoot,
    pagesMarkdown,
    prettierConfigPath,
    theme,
  } = options;
  if (componentObject.filename.indexOf('internal') !== -1) {
    return;
  }

  const src = readFileSync(componentObject.filename, 'utf8');

  if (src.match(/@ignore - internal component\./) || src.match(/@ignore - do not document\./)) {
    return;
  }

  const spread = !src.match(/ = exactProp\(/);

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const component = require(componentObject.filename);
  const name = path.parse(componentObject.filename).name;

  const styles: ReactApi['styles'] = {
    classes: [],
    name: null,
    descriptions: {},
    globalClasses: {},
  };

  // styled components does not have the options static
  const nonJSSComponent = !component?.default?.options;
  if (nonJSSComponent) {
    await updateStylesDefinition({
      styles,
      component: componentObject,
    });
  }

  if (component.styles && component.default.options) {
    // Collect the customization points of the `classes` property.
    styles.classes = Object.keys(getStylesCreator(component.styles).create(theme)).filter(
      (className) => !className.match(/^(@media|@keyframes|@global)/),
    );
    styles.name = component.default.options.name;
    styles.globalClasses = styles.classes.reduce((acc, key) => {
      acc[key] = generateClassName(
        // @ts-expect-error
        {
          key,
        },
        {
          options: {
            name: styles.name,
            theme: {},
          },
        },
      );
      return acc;
    }, {} as Record<string, string>);

    let styleSrc = src;
    // Exception for Select where the classes are imported from NativeSelect
    if (name === 'Select') {
      styleSrc = readFileSync(
        componentObject.filename.replace(
          `Select${path.sep}Select`,
          `NativeSelect${path.sep}NativeSelect`,
        ),
        'utf8',
      );
    }

    /**
     * Collect classes comments from the source
     */
    const stylesRegexp = /export const styles.*[\r\n](.*[\r\n])*};[\r\n][\r\n]/;
    const styleRegexp = /\/\* (.*) \*\/[\r\n]\s*(\w*)/g;
    // Extract the styles section from the source
    const stylesSrc = stylesRegexp.exec(styleSrc);

    if (stylesSrc) {
      // Extract individual classes and descriptions
      stylesSrc[0].replace(styleRegexp, (match: string, desc: string, key: string) => {
        styles.descriptions[key] = desc;
        return match;
      });
    }
  }

  let reactAPI: ReactApi;
  try {
    reactAPI = docgenParse(src, null, defaultHandlers.concat(muiDefaultPropsHandler), {
      filename: componentObject.filename,
    });
  } catch (err) {
    console.log('Error parsing src for', componentObject.filename);
    throw err;
  }

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
      if (unstyledReactAPI.props[prop].defaultValue) {
        reactAPI.props[prop] = unstyledReactAPI.props[prop];
      }
    });
  }

  reactAPI.name = name;
  reactAPI.styles = styles;
  reactAPI.pagesMarkdown = pagesMarkdown;
  reactAPI.src = src;
  reactAPI.spread = spread;
  reactAPI.EOL = getLineFeed(src);

  const testInfo = await parseTest(componentObject.filename);
  // no Object.assign to visually check for collisions
  reactAPI.forwardsRefTo = testInfo.forwardsRefTo;

  // Relative location in the file system.
  reactAPI.filename = componentObject.filename.replace(workspaceRoot, '');
  reactAPI.inheritance = getInheritance(testInfo, src);

  if (reactAPI.styles.classes) {
    reactAPI.styles.globalClasses = reactAPI.styles.classes.reduce((acc, key) => {
      acc[key] = generateClassName(
        // @ts-expect-error
        {
          key,
        },
        {
          options: {
            name: styles.name || generateMuiName(name),
            theme: {},
          },
        },
      );
      return acc;
    }, {} as Record<string, string>);
  }

  let markdown;
  try {
    markdown = generateMarkdown(reactAPI, nonJSSComponent);
  } catch (err) {
    console.log('Error generating markdown for', componentObject.filename);
    throw err;
  }

  writeFileSync(
    path.resolve(outputDirectory, `${kebabCase(reactAPI.name)}.md`),
    markdown.replace(/\r?\n/g, reactAPI.EOL),
  );
  writeFileSync(
    path.resolve(outputDirectory, `${kebabCase(reactAPI.name)}.js`),
    `import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'api/${kebabCase(reactAPI.name)}';
const requireRaw = require.context('!raw-loader!./', false, /\\/${kebabCase(reactAPI.name)}\\.md$/);

export default function Page({ docs }) {
  return <MarkdownDocs docs={docs} />;
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
`.replace(/\r?\n/g, reactAPI.EOL),
  );

  console.log('Built markdown docs for', reactAPI.name);

  await annotateComponentDefinition({ api: reactAPI, component: componentObject });

  if (!nonJSSComponent) {
    await annotateClassesDefinition({
      api: reactAPI,
      component: componentObject,
      prettierConfigPath,
    });
  }
}

function run(argv: { componentDirectories?: string[]; grep?: string; outputDirectory?: string }) {
  const workspaceRoot = path.resolve(__dirname, '../../');
  /**
   * @type {string[]}
   */
  const componentDirectories = argv.componentDirectories!.map((componentDirectory) => {
    return path.resolve(componentDirectory);
  });
  const outputDirectory = path.resolve(argv.outputDirectory!);
  const grep = argv.grep == null ? null : new RegExp(argv.grep);

  const prettierConfigPath = path.join(workspaceRoot, 'prettier.config.js');

  mkdirSync(outputDirectory, { mode: 0o777, recursive: true });

  const theme = createMuiTheme();

  const pagesMarkdown = findPagesMarkdown()
    .map((markdown) => {
      const markdownSource = readFileSync(markdown.filename, 'utf8');
      return {
        ...markdown,
        components: getHeaders(markdownSource).components,
      };
    })
    .filter((markdown) => markdown.components.length > 0);
  const components = componentDirectories
    .reduce((directories, componentDirectory) => {
      return directories.concat(findComponents(componentDirectory));
    }, [] as Array<{ filename: string }>)
    .filter((component) => {
      if (grep === null) {
        return true;
      }
      return grep.test(component.filename);
    });

  const componentBuilds = components.map((component) => {
    // use Promise.allSettled once we switch to node 12
    return buildDocs({
      component,
      outputDirectory,
      pagesMarkdown,
      prettierConfigPath,
      theme,
      workspaceRoot,
    })
      .then((value) => {
        return { status: 'fulfilled' as const, value };
      })
      .catch((error) => {
        error.message = `with component ${component.filename}: ${error.message}`;

        return { status: 'rejected' as const, reason: error };
      });
  });

  Promise.all(componentBuilds).then((builds) => {
    const fails = builds.filter(
      (promise): promise is { status: 'rejected'; reason: string } => promise.status === 'rejected',
    );

    fails.forEach((build) => {
      console.error(build.reason);
    });
    if (fails.length > 0) {
      process.exit(1);
    }
  });
}

yargs
  .command({
    command: '$0 <outputDirectory> [componentDirectories...]',
    describe: 'formats codebase',
    builder: (command) => {
      return command
        .positional('outputDirectory', {
          description: 'directory where the markdown is written to',
          type: 'string',
        })
        .positional('componentDirectories', {
          array: true,
          description: 'Directories to component sources',
          type: 'string',
        })
        .option('grep', {
          description:
            'Only generate markdown for component filenames matching the pattern. The string is treated as a RegExp.',
          type: 'string',
        });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
