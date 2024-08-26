import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import * as astTypes from 'ast-types';
import * as babel from '@babel/core';
import traverse from '@babel/traverse';
import * as _ from 'lodash';
import kebabCase from 'lodash/kebabCase';
import remark from 'remark';
import remarkVisit from 'unist-util-visit';
import type { Link } from 'mdast';
import { defaultHandlers, parse as docgenParse } from 'react-docgen';
import { renderMarkdown } from '@mui/internal-markdown';
import { parse as parseDoctrine, Annotation } from 'doctrine';
import { ProjectSettings, SortingStrategiesType } from '../ProjectSettings';
import { toGitHubPath, writePrettifiedFile } from '../buildApiUtils';
import muiDefaultPropsHandler from '../utils/defaultPropsHandler';
import parseTest from '../utils/parseTest';
import generatePropTypeDescription, { getChained } from '../utils/generatePropTypeDescription';
import createDescribeableProp, {
  CreateDescribeablePropSettings,
  DescribeablePropDescriptor,
} from '../utils/createDescribeableProp';
import generatePropDescription from '../utils/generatePropDescription';
import { TypeScriptProject } from '../utils/createTypeScriptProject';
import parseSlotsAndClasses from '../utils/parseSlotsAndClasses';
import generateApiTranslations from '../utils/generateApiTranslation';
import { sortAlphabetical } from '../utils/sortObjects';
import {
  AdditionalPropsInfo,
  ComponentApiContent,
  ComponentReactApi,
} from '../types/ApiBuilder.types';
import { Slot, ComponentInfo } from '../types/utils.types';

const cssComponents = ['Box', 'Grid', 'Typography', 'Stack'];

/**
 * Produces markdown of the description that can be hosted anywhere.
 *
 * By default we assume that the markdown is hosted on mui.com which is
 * why the source includes relative url. We transform them to absolute urls with
 * this method.
 */
export async function computeApiDescription(
  api: { description: ComponentReactApi['description'] },
  options: { host: string },
): Promise<string> {
  const { host } = options;
  const file = await remark()
    .use(function docsLinksAttacher() {
      return function transformer(tree) {
        remarkVisit(tree, 'link', (linkNode) => {
          const link = linkNode as Link;
          if ((link.url as string).startsWith('/')) {
            link.url = `${host}${link.url}`;
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
async function annotateComponentDefinition(
  api: ComponentReactApi,
  componentJsdoc: Annotation,
  projectSettings: ProjectSettings,
) {
  const HOST = projectSettings.baseApiUrl ?? 'https://mui.com';

  const typesFilename = api.filename.replace(/\.js$/, '.d.ts');
  const fileName = path.parse(api.filename).name;
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

    ExportNamedDeclaration(babelPath) {
      let node: babel.Node = babelPath.node;

      if (node.declaration == null) {
        // export { Menu };
        node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ExportSpecifier' && specifier.local.name === fileName) {
            const binding = babelPath.scope.bindings[specifier.local.name];

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
        });
      } else if (babel.types.isFunctionDeclaration(node.declaration)) {
        // export function Menu() {}
        if (node.declaration.id?.name === fileName) {
          node = node.declaration;
        }
      } else {
        return;
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
      `${api.filename}: Don't know where to insert the jsdoc block. Probably no default export or named export matching the file name was found.`,
    );
  }

  let inheritanceAPILink = null;
  if (api.inheritance) {
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
  if (api.inheritance) {
    markdownLines.push(`- inherits ${inheritanceAPILink}`);
  }

  if (componentJsdoc.tags.length > 0) {
    markdownLines.push('');
  }

  componentJsdoc.tags.forEach((tag) => {
    markdownLines.push(`@${tag.title}${tag.name ? ` ${tag.name} -` : ''} ${tag.description}`);
  });

  const jsdoc = `/**\n${markdownLines
    .map((line) => (line.length > 0 ? ` * ${line}` : ` *`))
    .join('\n')}\n */`;
  const typesSourceNew = typesSource.slice(0, start) + jsdoc + typesSource.slice(end);
  writeFileSync(typesFilename, typesSourceNew, { encoding: 'utf8' });
}

/**
 * Substitute CSS class description conditions with placeholder
 */
function extractClassCondition(description: string) {
  const stylesRegex =
    /((Styles|State class|Class name) applied to )(.*?)(( if | unless | when |, ){1}(.*))?\./;

  const conditions = description.match(stylesRegex);

  if (conditions && conditions[6]) {
    return {
      description: renderMarkdown(
        description.replace(stylesRegex, '$1{{nodeName}}$5{{conditions}}.'),
      ),
      nodeName: renderMarkdown(conditions[3]),
      conditions: renderMarkdown(conditions[6].replace(/`(.*?)`/g, '<code>$1</code>')),
    };
  }

  if (conditions && conditions[3] && conditions[3] !== 'the root element') {
    return {
      description: renderMarkdown(description.replace(stylesRegex, '$1{{nodeName}}$5.')),
      nodeName: renderMarkdown(conditions[3]),
    };
  }

  return { description: renderMarkdown(description) };
}

const generateApiPage = async (
  apiPagesDirectory: string,
  importTranslationPagesDirectory: string,
  reactApi: ComponentReactApi,
  sortingStrategies?: SortingStrategiesType,
  onlyJsonFile: boolean = false,
  layoutConfigPath: string = '',
) => {
  const normalizedApiPathname = reactApi.apiPathname.replace(/\\/g, '/');
  /**
   * Gather the metadata needed for the component's API page.
   */
  const pageContent: ComponentApiContent = {
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
    imports: reactApi.imports,
    ...(reactApi.slots?.length > 0 && { slots: reactApi.slots }),
    classes: reactApi.classes,
    spread: reactApi.spread,
    themeDefaultProps: reactApi.themeDefaultProps,
    muiName: normalizedApiPathname.startsWith('/joy-ui')
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
    deprecated: reactApi.deprecated,
  };

  const { classesSort = sortAlphabetical('key'), slotsSort = null } = {
    ...sortingStrategies,
  };

  if (classesSort) {
    pageContent.classes = [...pageContent.classes].sort(classesSort);
  }
  if (slotsSort && pageContent.slots) {
    pageContent.slots = [...pageContent.slots].sort(slotsSort);
  }

  await writePrettifiedFile(
    path.resolve(apiPagesDirectory, `${kebabCase(reactApi.name)}.json`),
    JSON.stringify(pageContent),
  );

  if (!onlyJsonFile) {
    await writePrettifiedFile(
      path.resolve(apiPagesDirectory, `${kebabCase(reactApi.name)}.js`),
      `import * as React from 'react';
  import ApiPage from 'docs/src/modules/components/ApiPage';
  import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';${
    layoutConfigPath === ''
      ? ''
      : `
  import layoutConfig from '${layoutConfigPath}';`
  }
  import jsonPageContent from './${kebabCase(reactApi.name)}.json';

  export default function Page(props) {
    const { descriptions, pageContent } = props;
    return <ApiPage ${layoutConfigPath === '' ? '' : '{...layoutConfig} '}descriptions={descriptions} pageContent={pageContent} />;
  }

  Page.getInitialProps = () => {
    const req = require.context(
      '${importTranslationPagesDirectory}/${kebabCase(reactApi.name)}',
      false,
      /\\.\\/${kebabCase(reactApi.name)}.*.json$/,
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

const attachTranslations = (
  reactApi: ComponentReactApi,
  deprecationInfo: string | undefined,
  settings?: CreateDescribeablePropSettings,
) => {
  const translations: ComponentReactApi['translations'] = {
    componentDescription: reactApi.description,
    deprecationInfo: deprecationInfo ? renderMarkdown(deprecationInfo) : undefined,
    propDescriptions: {},
    classDescriptions: {},
  };
  Object.entries(reactApi.props!).forEach(([propName, propDescriptor]) => {
    let prop: DescribeablePropDescriptor | null;
    try {
      prop = createDescribeableProp(propDescriptor, propName, settings);
    } catch (error) {
      prop = null;
    }
    if (prop) {
      const { deprecated, seeMore, jsDocText, signatureArgs, signatureReturn, requiresRef } =
        generatePropDescription(prop, propName);
      // description = renderMarkdownInline(`${description}`);

      const typeDescriptions: { [t: string]: string } = {};
      (signatureArgs || []).concat(signatureReturn || []).forEach(({ name, description }) => {
        typeDescriptions[name] = renderMarkdown(description);
      });

      translations.propDescriptions[propName] = {
        description: renderMarkdown(jsDocText),
        requiresRef: requiresRef || undefined,
        deprecated: renderMarkdown(deprecated) || undefined,
        typeDescriptions: Object.keys(typeDescriptions).length > 0 ? typeDescriptions : undefined,
        seeMoreText: seeMore?.description,
      };
    }
  });

  /**
   * Slot descriptions.
   */
  if (reactApi.slots?.length > 0) {
    translations.slotDescriptions = {};
    [...reactApi.slots]
      .sort(sortAlphabetical('name')) // Sort to ensure consistency of object key order
      .forEach((slot: Slot) => {
        const { name, description } = slot;
        translations.slotDescriptions![name] = renderMarkdown(description);
      });
  }

  /**
   * CSS class descriptions and deprecations.
   */
  [...reactApi.classes]
    .sort(sortAlphabetical('key')) // Sort to ensure consistency of object key order
    .forEach((classDefinition) => {
      translations.classDescriptions[classDefinition.key] = {
        ...extractClassCondition(classDefinition.description),
        deprecationInfo: classDefinition.deprecationInfo,
      };
    });
  reactApi.classes.forEach((classDefinition, index) => {
    delete reactApi.classes[index].deprecationInfo; // store deprecation info in translations only
  });

  reactApi.translations = translations;
};

const attachPropsTable = (
  reactApi: ComponentReactApi,
  settings?: CreateDescribeablePropSettings,
) => {
  const propErrors: Array<[propName: string, error: Error]> = [];
  type Pair = [string, ComponentReactApi['propsTable'][string]];
  const componentProps: ComponentReactApi['propsTable'] = _.fromPairs(
    Object.entries(reactApi.props!).map(([propName, propDescriptor]): Pair => {
      let prop: DescribeablePropDescriptor | null;
      try {
        prop = createDescribeableProp(propDescriptor, propName, settings);
      } catch (error) {
        propErrors.push([`[${reactApi.name}] \`${propName}\``, error as Error]);
        prop = null;
      }
      if (prop === null) {
        // have to delete `componentProps.undefined` later
        return [] as any;
      }

      const defaultValue = propDescriptor.jsdocDefaultValue?.value;

      const {
        signature: signatureType,
        signatureArgs,
        signatureReturn,
        seeMore,
      } = generatePropDescription(prop, propName);
      const propTypeDescription = generatePropTypeDescription(propDescriptor.type);
      const chainedPropType = getChained(prop.type);

      const requiredProp =
        prop.required ||
        /\.isRequired/.test(prop.type.raw) ||
        (chainedPropType !== false && chainedPropType.required);

      const deprecation = (propDescriptor.description || '').match(/@deprecated(\s+(?<info>.*))?/);

      const additionalPropsInfo: AdditionalPropsInfo = {};

      const normalizedApiPathname = reactApi.apiPathname.replace(/\\/g, '/');

      if (propName === 'classes') {
        additionalPropsInfo.cssApi = true;
      } else if (propName === 'sx') {
        additionalPropsInfo.sx = true;
      } else if (propName === 'slots' && !normalizedApiPathname.startsWith('/material-ui')) {
        additionalPropsInfo.slotsApi = true;
      } else if (normalizedApiPathname.startsWith('/joy-ui')) {
        switch (propName) {
          case 'size':
            additionalPropsInfo['joy-size'] = true;
            break;
          case 'color':
            additionalPropsInfo['joy-color'] = true;
            break;
          case 'variant':
            additionalPropsInfo['joy-variant'] = true;
            break;
          default:
        }
      }

      let signature: ComponentReactApi['propsTable'][string]['signature'];
      if (signatureType !== undefined) {
        signature = {
          type: signatureType,
          describedArgs: signatureArgs?.map((arg) => arg.name),
          returned: signatureReturn?.name,
        };
      }
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
          deprecationInfo: renderMarkdown(deprecation?.groups?.info || '').trim() || undefined,
          signature,
          additionalInfo:
            Object.keys(additionalPropsInfo).length === 0 ? undefined : additionalPropsInfo,
          seeMoreLink: seeMore?.link,
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
 * Helper to get the import options
 * @param name The name of the component
 * @param filename The filename where its defined (to infer the package)
 * @returns an array of import command
 */
const defaultGetComponentImports = (name: string, filename: string) => {
  const githubPath = toGitHubPath(filename);
  const rootImportPath = githubPath.replace(
    /\/packages\/mui(?:-(.+?))?\/src\/.*/,
    (match, pkg) => `@mui/${pkg}`,
  );

  const subdirectoryImportPath = githubPath.replace(
    /\/packages\/mui(?:-(.+?))?\/src\/([^\\/]+)\/.*/,
    (match, pkg, directory) => `@mui/${pkg}/${directory}`,
  );

  let namedImportName = name;
  const defaultImportName = name;

  if (/Unstable_/.test(githubPath)) {
    namedImportName = `Unstable_${name} as ${name}`;
  }

  const useNamedImports = rootImportPath === '@mui/base';

  const subpathImport = useNamedImports
    ? `import { ${namedImportName} } from '${subdirectoryImportPath}';`
    : `import ${defaultImportName} from '${subdirectoryImportPath}';`;

  const rootImport = `import { ${namedImportName} } from '${rootImportPath}';`;

  return [subpathImport, rootImport];
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
  projectSettings: ProjectSettings,
) {
  const { shouldSkip, spread, EOL, src } = componentInfo.readFile();

  if (shouldSkip) {
    return null;
  }

  const filename = componentInfo.filename;
  let reactApi: ComponentReactApi;

  if (componentInfo.isSystemComponent || componentInfo.name === 'Grid2') {
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
                const expression = definition.value?.expression
                  ? definition.get('expression')
                  : definition;
                if (expression.value?.callee) {
                  const definitionName = expression.value.callee.name;

                  if (definitionName === `create${componentInfo.name}`) {
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
    reactApi = docgenParse(src, null, defaultHandlers.concat(muiDefaultPropsHandler), {
      filename,
    });
  }

  if (!reactApi.props) {
    reactApi.props = {};
  }

  const { getComponentImports = defaultGetComponentImports } = projectSettings;
  const componentJsdoc = parseDoctrine(reactApi.description);

  // We override `reactApi.description` with `componentJsdoc.description` because
  // the former can include JSDoc tags that we don't want to render in the docs.
  reactApi.description = componentJsdoc.description;

  // Ignore what we might have generated in `annotateComponentDefinition`
  const annotatedDescriptionMatch = reactApi.description.match(/(Demos|API):\r?\n\r?\n/);
  if (annotatedDescriptionMatch !== null) {
    reactApi.description = reactApi.description.slice(0, annotatedDescriptionMatch.index).trim();
  }

  reactApi.filename = filename;
  reactApi.name = componentInfo.name;
  reactApi.imports = getComponentImports(componentInfo.name, filename);
  reactApi.muiName = componentInfo.muiName;
  reactApi.apiPathname = componentInfo.apiPathname;
  reactApi.EOL = EOL;
  reactApi.slots = [];
  reactApi.classes = [];
  reactApi.demos = componentInfo.getDemos();
  reactApi.inheritance = null;
  if (reactApi.demos.length === 0) {
    throw new Error(
      'Unable to find demos. \n' +
        `Be sure to include \`components: ${reactApi.name}\` in the markdown pages where the \`${reactApi.name}\` component is relevant. ` +
        'Every public component should have a demo.\nFor internal component, add the name of the component to the `skipComponent` method of the product.',
    );
  }

  try {
    const testInfo = await parseTest(reactApi.filename);
    // no Object.assign to visually check for collisions
    reactApi.forwardsRefTo = testInfo.forwardsRefTo;
    reactApi.spread = testInfo.spread ?? spread;
    reactApi.themeDefaultProps = testInfo.themeDefaultProps;
    reactApi.inheritance = componentInfo.getInheritance(testInfo.inheritComponent);
  } catch (error: any) {
    console.error(error.message);
    if (project.name.includes('grid')) {
      // TODO: Use `describeConformance` for the DataGrid components
      reactApi.forwardsRefTo = 'GridRoot';
    }
  }

  if (!projectSettings.skipSlotsAndClasses) {
    const { slots, classes } = parseSlotsAndClasses({
      typescriptProject: project,
      projectSettings,
      componentName: reactApi.name,
      muiName: reactApi.muiName,
      slotInterfaceName: componentInfo.slotInterfaceName,
    });

    reactApi.slots = slots;
    reactApi.classes = classes;
  }

  const deprecation = componentJsdoc.tags.find((tag) => tag.title === 'deprecated');
  const deprecationInfo = deprecation?.description || undefined;

  reactApi.deprecated = !!deprecation || undefined;

  attachPropsTable(reactApi, projectSettings.propsSettings);
  attachTranslations(reactApi, deprecationInfo, projectSettings.propsSettings);

  // eslint-disable-next-line no-console
  console.log('Built API docs for', reactApi.apiPathname);

  if (!componentInfo.skipApiGeneration) {
    const {
      skipAnnotatingComponentDefinition,
      translationPagesDirectory,
      importTranslationPagesDirectory,
      generateJsonFileOnly,
    } = projectSettings;

    await generateApiTranslations(
      path.join(process.cwd(), translationPagesDirectory),
      reactApi,
      projectSettings.translationLanguages,
    );

    // Once we have the tabs API in all projects, we can make this default
    await generateApiPage(
      componentInfo.apiPagesDirectory,
      importTranslationPagesDirectory ?? translationPagesDirectory,
      reactApi,
      projectSettings.sortingStrategies,
      generateJsonFileOnly,
      componentInfo.layoutConfigPath,
    );

    if (
      typeof skipAnnotatingComponentDefinition === 'function'
        ? !skipAnnotatingComponentDefinition(reactApi.filename)
        : !skipAnnotatingComponentDefinition
    ) {
      // Add comment about demo & api links (including inherited component) to the component file
      await annotateComponentDefinition(reactApi, componentJsdoc, projectSettings);
    }
  }

  return reactApi;
}
