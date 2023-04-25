import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import * as astTypes from 'ast-types';
import * as babel from '@babel/core';
import traverse from '@babel/traverse';
import * as _ from 'lodash';
import kebabCase from 'lodash/kebabCase';
import remark from 'remark';
import remarkVisit from 'unist-util-visit';
import { Link } from 'mdast';
import { defaultHandlers, parse as docgenParse, ReactDocgenApi } from 'react-docgen';
import { unstable_generateUtilityClass as generateUtilityClass } from '@mui/utils';
import { renderInline as renderMarkdownInline } from '@mui/markdown';
import { LANGUAGES } from 'docs/config';
import { ComponentInfo, writePrettifiedFile } from '../buildApiUtils';
import muiDefaultPropsHandler from '../utils/defaultPropsHandler';
import parseTest from '../utils/parseTest';
import generatePropTypeDescription, { getChained } from '../utils/generatePropTypeDescription';
import createDescribeableProp, {
  DescribeablePropDescriptor,
} from '../utils/createDescribeableProp';
import generatePropDescription from '../utils/generatePropDescription';
import parseStyles, { Classes, Styles } from '../utils/parseStyles';
import { TypeScriptProject } from '../utils/createTypeScriptProject';
import parseSlotsAndClasses, { Slot } from '../utils/parseSlotsAndClasses';

export interface ReactApi extends ReactDocgenApi {
  demos: ReturnType<ComponentInfo['getDemos']>;
  EOL: string;
  filename: string;
  apiPathname: string;
  forwardsRefTo: string | undefined;
  inheritance: ReturnType<ComponentInfo['getInheritance']>;
  /**
   * react component name
   * @example 'Accordion'
   */
  name: string;
  muiName: string;
  description: string;
  spread: boolean | undefined;
  /**
   * If `true`, the component supports theme default props customization.
   * If `null`, we couldn't infer this information.
   * If `undefined`, it's not applicable in this context, e.g. Base UI components.
   */
  themeDefaultProps: boolean | undefined | null;
  /**
   * result of path.readFileSync from the `filename` in utf-8
   */
  src: string;
  styles: Styles;
  classes: Classes;
  slots: Slot[];
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
    slotDescriptions?: { [key: string]: string };
  };
}

const cssComponents = ['Box', 'Grid', 'Typography', 'Stack'];

/**
 * Produces markdown of the description that can be hosted anywhere.
 *
 * By default we assume that the markdown is hosted on mui.com which is
 * why the source includes relative url. We transform them to absolute urls with
 * this method.
 */
export async function computeApiDescription(
  api: { description: ReactApi['description'] },
  options: { host: string },
): Promise<string> {
  const { host } = options;
  const file = await remark()
    .use(function docsLinksAttacher() {
      return function transformer(tree) {
        remarkVisit(tree, 'link', (linkNode: Link) => {
          if ((linkNode.url as string).startsWith('/')) {
            linkNode.url = `${host}${linkNode.url}`;
          }
        });
      };
    })
    .process(api.description);

  return file.contents.toString().trim();
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
            node = binding.path.parentPath!.node;
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
      if (jsdocBlock?.start != null && jsdocBlock?.end != null) {
        start = jsdocBlock.start;
        end = jsdocBlock.end;
      } else if (node.start != null) {
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
    inheritanceAPILink = `[${api.inheritance.name} API](${
      api.inheritance.apiPathname.startsWith('http')
        ? api.inheritance.apiPathname
        : `${HOST}${api.inheritance.apiPathname}`
    })`;
  }

  const markdownLines = (await computeApiDescription(api, { host: HOST })).split('\n');
  // Ensure a newline between manual and generated description.
  if (markdownLines[markdownLines.length - 1] !== '') {
    markdownLines.push('');
  }
  markdownLines.push(
    'Demos:',
    '',
    ...api.demos.map((demo) => {
      return `- [${demo.demoPageTitle}](${
        demo.demoPathname.startsWith('http') ? demo.demoPathname : `${HOST}${demo.demoPathname}`
      })`;
    }),
    '',
  );

  markdownLines.push(
    'API:',
    '',
    `- [${api.name} API](${
      api.apiPathname.startsWith('http') ? api.apiPathname : `${HOST}${api.apiPathname}`
    })`,
  );
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
 * @param filepath - absolute path
 * @example toGitHubPath('/home/user/material-ui/packages/Accordion') === '/packages/Accordion'
 * @example toGitHubPath('C:\\Development\material-ui\packages\Accordion') === '/packages/Accordion'
 */
export function toGitHubPath(filepath: string): string {
  return `/${path.relative(process.cwd(), filepath).replace(/\\/g, '/')}`;
}

const generateApiTranslations = (outputDirectory: string, reactApi: ReactApi) => {
  const componentName = reactApi.name;
  const apiDocsTranslationPath = path.resolve(outputDirectory, kebabCase(componentName));
  function resolveApiDocsTranslationsComponentLanguagePath(
    language: (typeof LANGUAGES)[0],
  ): string {
    const languageSuffix = language === 'en' ? '' : `-${language}`;

    return path.join(apiDocsTranslationPath, `${kebabCase(componentName)}${languageSuffix}.json`);
  }

  mkdirSync(apiDocsTranslationPath, {
    mode: 0o777,
    recursive: true,
  });

  writePrettifiedFile(
    resolveApiDocsTranslationsComponentLanguagePath('en'),
    JSON.stringify(reactApi.translations),
  );

  LANGUAGES.forEach((language) => {
    if (language !== 'en') {
      try {
        writePrettifiedFile(
          resolveApiDocsTranslationsComponentLanguagePath(language),
          JSON.stringify(reactApi.translations),
          undefined,
          { flag: 'wx' },
        );
      } catch (error) {
        // File exists
      }
    }
  });
};

const generateApiPage = (
  apiPagesDirectory: string,
  translationPagesDirectory: string,
  reactApi: ReactApi,
  onlyJsonFile: boolean = false,
) => {
  /**
   * Gather the metadata needed for the component's API page.
   */
  const pageContent = {
    // Sorted by required DESC, name ASC
    props: _.fromPairs(
      Object.entries(reactApi.propsTable).sort(([aName, aData], [bName, bData]) => {
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
    ...(reactApi.slots?.length > 0 && { slots: reactApi.slots }),
    ...((reactApi.classes?.classes.length > 0 ||
      (reactApi.classes?.globalClasses &&
        Object.keys(reactApi.classes.globalClasses).length > 0)) && {
      classes: {
        classes: reactApi.classes.classes,
        globalClasses: reactApi.classes.globalClasses,
      },
    }),
    spread: reactApi.spread,
    themeDefaultProps: reactApi.themeDefaultProps,
    muiName: reactApi.apiPathname.startsWith('/joy-ui')
      ? reactApi.muiName.replace('Mui', 'Joy')
      : reactApi.muiName,
    forwardsRefTo: reactApi.forwardsRefTo,
    filename: toGitHubPath(reactApi.filename),
    inheritance: reactApi.inheritance
      ? {
          component: reactApi.inheritance.name,
          pathname: reactApi.inheritance.apiPathname,
        }
      : null,
    demos: `<ul>${reactApi.demos
      .map((item) => `<li><a href="${item.demoPathname}">${item.demoPageTitle}</a></li>`)
      .join('\n')}</ul>`,
    cssComponent: cssComponents.indexOf(reactApi.name) >= 0,
  };

  writePrettifiedFile(
    path.resolve(apiPagesDirectory, `${kebabCase(reactApi.name)}.json`),
    JSON.stringify(pageContent),
  );

  if (!onlyJsonFile) {
    writePrettifiedFile(
      path.resolve(apiPagesDirectory, `${kebabCase(reactApi.name)}.js`),
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
      '${translationPagesDirectory}/${kebabCase(reactApi.name)}',
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
  }
};

const attachTranslations = (reactApi: ReactApi) => {
  const translations: ReactApi['translations'] = {
    componentDescription: reactApi.description,
    propDescriptions: {},
    classDescriptions: {},
  };
  Object.entries(reactApi.props!).forEach(([propName, propDescriptor]) => {
    let prop: DescribeablePropDescriptor | null;
    try {
      prop = createDescribeableProp(propDescriptor, propName);
    } catch (error) {
      prop = null;
    }
    if (prop) {
      let description = generatePropDescription(prop, propName);
      description = renderMarkdownInline(description);

      if (propName === 'classes') {
        description += ' See <a href="#css">CSS API</a> below for more details.';
      } else if (propName === 'sx') {
        description +=
          ' See the <a href="/system/getting-started/the-sx-prop/">`sx` page</a> for more details.';
      } else if (propName === 'slots' && !reactApi.apiPathname.startsWith('/material-ui')) {
        description += ' See <a href="#slots">Slots API</a> below for more details.';
      } else if (reactApi.apiPathname.startsWith('/joy-ui')) {
        switch (propName) {
          case 'size':
            description +=
              ' To learn how to add custom sizes to the component, check out <a href="/joy-ui/customization/themed-components/#extend-sizes">Themed components—Extend sizes</a>.';
            break;
          case 'color':
            description +=
              ' To learn how to add your own colors, check out <a href="/joy-ui/customization/themed-components/#extend-colors">Themed components—Extend colors</a>.';
            break;
          case 'variant':
            description +=
              ' To learn how to add your own variants, check out <a href="/joy-ui/customization/themed-components/#extend-variants">Themed components—Extend variants</a>.';
            break;
          default:
        }
      }
      translations.propDescriptions[propName] = description.replace(/\n@default.*$/, '');
    }
  });

  /**
   * Slot descriptions.
   */
  if (reactApi.slots?.length > 0) {
    translations.slotDescriptions = {};
    reactApi.slots.forEach((slot: Slot) => {
      const { name, description } = slot;
      translations.slotDescriptions![name] = description;
    });
  }

  /**
   * CSS class descriptions.
   */
  translations.classDescriptions = extractClassConditions(
    reactApi.styles.classes.length || Object.keys(reactApi.styles.globalClasses).length
      ? reactApi.styles.descriptions
      : reactApi.classes.descriptions,
  );

  reactApi.translations = translations;
};

const attachPropsTable = (reactApi: ReactApi) => {
  const propErrors: Array<[propName: string, error: Error]> = [];
  const componentProps: ReactApi['propsTable'] = _.fromPairs(
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

      const defaultValue = propDescriptor.jsdocDefaultValue?.value;

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

  reactApi.propsTable = componentProps;
};

/**
 * - Build react component (specified filename) api by lookup at its definition (.d.ts or ts)
 *   and then generate the API page + json data
 * - Generate the translations
 * - Add the comment in the component filename with its demo & API urls (including the inherited component).
 *   this process is done by sourcing markdown files and filter matched `components` in the frontmatter
 */
export default async function generateComponentApi(
  componentInfo: ComponentInfo,
  project: TypeScriptProject,
) {
  const {
    filename,
    name,
    muiName,
    apiPathname,
    apiPagesDirectory,
    getInheritance,
    getDemos,
    readFile,
    skipApiGeneration,
    isSystemComponent,
  } = componentInfo;

  const { shouldSkip, spread, EOL, src } = readFile();

  if (shouldSkip) {
    return null;
  }

  let reactApi: ReactApi;

  if (isSystemComponent) {
    try {
      reactApi = docgenParse(
        src,
        (ast) => {
          let node;
          astTypes.visit(ast, {
            visitVariableDeclaration: (variablePath) => {
              const definitions: any[] = [];
              if (variablePath.node.declarations) {
                variablePath
                  .get('declarations')
                  .each((declarator: any) => definitions.push(declarator.get('init')));
              }

              definitions.forEach((definition) => {
                // definition.value.expression is defined when the source is in TypeScript.
                const expression = definition.value.expression
                  ? definition.get('expression')
                  : definition;
                if (expression.value?.callee) {
                  const definitionName = expression.value.callee.name;

                  if (definitionName === `create${name}`) {
                    node = expression;
                  }
                }
              });

              return false;
            },
          });

          return node;
        },
        defaultHandlers,
        { filename },
      );
    } catch (error) {
      // fallback to default logic if there is no `create*` definition.
      if ((error as Error).message === 'No suitable component definition found.') {
        reactApi = docgenParse(src, null, defaultHandlers.concat(muiDefaultPropsHandler), {
          filename,
        });
      } else {
        throw error;
      }
    }
  } else {
    reactApi = docgenParse(src, null, defaultHandlers.concat(muiDefaultPropsHandler), { filename });
  }

  // Ignore what we might have generated in `annotateComponentDefinition`
  const annotatedDescriptionMatch = reactApi.description.match(/(Demos|API):\r?\n\r?\n/);
  if (annotatedDescriptionMatch !== null) {
    reactApi.description = reactApi.description.slice(0, annotatedDescriptionMatch.index).trim();
  }
  reactApi.filename = filename;
  reactApi.name = name;
  reactApi.muiName = muiName;
  reactApi.apiPathname = apiPathname;
  reactApi.EOL = EOL;
  reactApi.demos = getDemos();
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
  reactApi.themeDefaultProps = testInfo.themeDefaultProps;
  reactApi.inheritance = getInheritance(testInfo.inheritComponent);

  // Both `slots` and `classes` are empty if
  // interface `${componentName}Slots` wasn't found.
  // Currently, Base UI and Joy UI components support this interface
  const { slots, classes } = parseSlotsAndClasses({
    project,
    componentName: reactApi.name,
    muiName: reactApi.muiName,
  });
  reactApi.slots = slots;
  reactApi.classes = classes;

  reactApi.styles = parseStyles({ project, componentName: reactApi.name });

  if (reactApi.styles.classes.length > 0 && !filename.includes('mui-base')) {
    reactApi.styles.name = reactApi.muiName;
  }
  reactApi.styles.classes.forEach((key) => {
    const globalClass = generateUtilityClass(reactApi.styles.name || reactApi.muiName, key);
    reactApi.styles.globalClasses[key] = globalClass;
  });

  // if `reactApi.classes` and `reactApi.styles` both exist,
  // API documentation includes both "CSS" Section and "State classes" Section;
  // we either want (1) "Slots" section and "State classes" section, or (2) "CSS" section
  if (
    (reactApi.styles.classes?.length || Object.keys(reactApi.styles.globalClasses || {})?.length) &&
    (reactApi.classes.classes?.length || Object.keys(reactApi.classes.globalClasses || {})?.length)
  ) {
    reactApi.styles.classes = [];
    reactApi.styles.globalClasses = {};
  }

  attachPropsTable(reactApi);
  attachTranslations(reactApi);

  // eslint-disable-next-line no-console
  console.log('Built API docs for', reactApi.name);

  if (!skipApiGeneration) {
    // Generate pages, json and translations
    let translationPagesDirectory = 'docs/translations/api-docs';
    if (reactApi.apiPathname.startsWith('/joy-ui') && reactApi.filename.includes('mui-joy/src')) {
      translationPagesDirectory = 'docs/translations/api-docs-joy';
    } else if (
      reactApi.apiPathname.startsWith('/base') &&
      reactApi.filename.includes('mui-base/src')
    ) {
      translationPagesDirectory = 'docs/translations/api-docs-base';
    }

    generateApiTranslations(path.join(process.cwd(), translationPagesDirectory), reactApi);

    // Once we have the tabs API in all projects, we can make this default
    const generateOnlyJsonFile = reactApi.apiPathname.startsWith('/base');
    generateApiPage(apiPagesDirectory, translationPagesDirectory, reactApi, generateOnlyJsonFile);

    // Add comment about demo & api links (including inherited component) to the component file
    await annotateComponentDefinition(reactApi);
  }

  return reactApi;
}
