import * as ts from 'typescript';
import * as astTypes from 'ast-types';
import * as _ from 'lodash';
import * as babel from '@babel/core';
import traverse from '@babel/traverse';
import { defaultHandlers, parse as docgenParse, ReactDocgenApi } from 'react-docgen';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import upperFirst from 'lodash/upperFirst';
import { renderInline as renderMarkdownInline } from '@mui/markdown';
import { LANGUAGES } from 'docs/config';
import { toGitHubPath, computeApiDescription } from './ComponentApiBuilder';
import {
  getSymbolDescription,
  getSymbolJSDocTags,
  HookInfo,
  stringifySymbol,
  writePrettifiedFile,
} from '../buildApiUtils';
import { TypeScriptProject } from '../utils/createTypeScriptProject';
import muiDefaultParamsHandler from '../utils/defaultParamsHandler';

interface ParsedProperty {
  name: string;
  description: string;
  tags: { [tagName: string]: ts.JSDocTagInfo };
  required: boolean;
  typeStr: string;
}

const parseProperty = (propertySymbol: ts.Symbol, project: TypeScriptProject): ParsedProperty => ({
  name: propertySymbol.name,
  description: getSymbolDescription(propertySymbol, project),
  tags: getSymbolJSDocTags(propertySymbol),
  required: !propertySymbol.declarations?.find(ts.isPropertySignature)?.questionToken,
  typeStr: stringifySymbol(propertySymbol, project),
});

export interface ReactApi extends ReactDocgenApi {
  demos: ReturnType<HookInfo['getDemos']>;
  EOL: string;
  filename: string;
  apiPathname: string;
  parameters?: ParsedProperty[];
  returnValue?: ParsedProperty[];
  /**
   * hook name
   * @example 'useButton'
   */
  name: string;
  description: string;
  /**
   * result of path.readFileSync from the `filename` in utf-8
   */
  src: string;
  parametersTable: _.Dictionary<{
    default: string | undefined;
    required: boolean | undefined;
    type: { name: string | undefined; description: string | undefined };
    deprecated: true | undefined;
    deprecationInfo: string | undefined;
  }>;
  returnValueTable: _.Dictionary<{
    default: string | undefined;
    required: boolean | undefined;
    type: { name: string | undefined; description: string | undefined };
    deprecated: true | undefined;
    deprecationInfo: string | undefined;
  }>;
  translations: {
    hookDescription: string;
    parametersDescriptions: { [key: string]: string | undefined };
    returnValueDescriptions: { [key: string]: string | undefined };
  };
}

/**
 * Add demos & API comment block to type definitions, e.g.:
 * /**
 * * Demos:
 * *
 * * - [Button](https://mui.com/base/react-button/)
 * *
 * * API:
 * *
 * * - [useButton API](https://mui.com/base/api/use-button/)
 */
async function annotateHookDefinition(api: ReactApi) {
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

  const markdownLines = (await computeApiDescription(api, { host: HOST })).split('\n');
  // Ensure a newline between manual and generated description.
  if (markdownLines[markdownLines.length - 1] !== '') {
    markdownLines.push('');
  }

  if (api.demos && api.demos.length > 0) {
    markdownLines.push(
      'Demos:',
      '',
      ...api.demos.map((item) => {
        return `- [${item.demoPageTitle}](${
          item.demoPathname.startsWith('http') ? item.demoPathname : `${HOST}${item.demoPathname}`
        })`;
      }),
      '',
    );
  }

  markdownLines.push(
    'API:',
    '',
    `- [${api.name} API](${
      api.apiPathname.startsWith('http') ? api.apiPathname : `${HOST}${api.apiPathname}`
    })`,
  );

  const jsdoc = `/**\n${markdownLines
    .map((line) => (line.length > 0 ? ` * ${line}` : ` *`))
    .join('\n')}\n */`;
  const typesSourceNew = typesSource.slice(0, start) + jsdoc + typesSource.slice(end);
  writeFileSync(typesFilename, typesSourceNew, { encoding: 'utf8' });
}

const attachTable = (
  reactApi: ReactApi,
  params: ParsedProperty[],
  tableName: 'parametersTable' | 'returnValueTable',
) => {
  const propErrors: Array<[propName: string, error: Error]> = [];
  const parameters: ReactApi[typeof tableName] = params
    .map((p) => {
      const { name: propName, ...propDescriptor } = p;
      let prop: Omit<ParsedProperty, 'name'> | null;
      try {
        prop = propDescriptor;
      } catch (error) {
        propErrors.push([propName, error as Error]);
        prop = null;
      }
      if (prop === null) {
        // have to delete `componentProps.undefined` later
        return [] as any;
      }

      const defaultTag = propDescriptor.tags?.default;
      const defaultValue: string | undefined = defaultTag?.text?.[0]?.text;
      const requiredProp = prop.required;

      const deprecation = (propDescriptor.description || '').match(/@deprecated(\s+(?<info>.*))?/);
      const typeDescription = (propDescriptor.typeStr ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
      return {
        [propName]: {
          type: {
            // The docgen generates this structure for the components. For consistency in the structure
            // we are adding the same value in both the name and the description
            name: typeDescription,
            description: typeDescription,
          },
          default: defaultValue,
          // undefined values are not serialized => saving some bytes
          required: requiredProp || undefined,
          deprecated: !!deprecation || undefined,
          deprecationInfo:
            renderMarkdownInline(deprecation?.groups?.info || '').trim() || undefined,
        },
      };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {}) as unknown as ReactApi['parametersTable'];
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
  delete parameters.undefined;

  reactApi[tableName] = parameters;
};

const generateTranslationDescription = (description: string) => {
  return description
    .replace(/\n@default.*$/, '')
    .replace(/`([a-z]|[A-Z]|\()/g, '<code>$1')
    .replace(/`/g, '</code>');
};

const attachTranslations = (reactApi: ReactApi) => {
  const translations: ReactApi['translations'] = {
    hookDescription: reactApi.description,
    parametersDescriptions: {},
    returnValueDescriptions: {},
  };

  (reactApi.parameters ?? []).forEach(({ name: propName, description }) => {
    if (description) {
      translations.parametersDescriptions[propName] = generateTranslationDescription(description);
    }
  });

  (reactApi.returnValue ?? []).forEach(({ name: propName, description }) => {
    if (description) {
      translations.returnValueDescriptions[propName] = generateTranslationDescription(description);
    }
  });

  reactApi.translations = translations;
};

const generateApiJson = (outputDirectory: string, reactApi: ReactApi) => {
  /**
   * Gather the metadata needed for the component's API page.
   */
  const pageContent = {
    // Sorted by required DESC, name ASC
    parameters: _.fromPairs(
      Object.entries(reactApi.parametersTable).sort(([aName, aData], [bName, bData]) => {
        if ((aData.required && bData.required) || (!aData.required && !bData.required)) {
          return aName.localeCompare(bName);
        }
        if (aData.required) {
          return -1;
        }
        return 1;
      }),
    ),
    returnValue: _.fromPairs(
      Object.entries(reactApi.returnValueTable).sort(([aName, aData], [bName, bData]) => {
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
    filename: toGitHubPath(reactApi.filename),
    demos: `<ul>${reactApi.demos
      .map((item) => `<li><a href="${item.demoPathname}">${item.demoPageTitle}</a></li>`)
      .join('\n')}</ul>`,
  };

  writePrettifiedFile(
    path.resolve(outputDirectory, `${kebabCase(reactApi.name)}.json`),
    JSON.stringify(pageContent),
  );
};

const generateApiTranslations = (outputDirectory: string, reactApi: ReactApi) => {
  const hookName = reactApi.name;
  const apiDocsTranslationPath = path.resolve(outputDirectory, kebabCase(hookName));
  function resolveApiDocsTranslationsComponentLanguagePath(
    language: (typeof LANGUAGES)[0],
  ): string {
    const languageSuffix = language === 'en' ? '' : `-${language}`;

    return path.join(apiDocsTranslationPath, `${kebabCase(hookName)}${languageSuffix}.json`);
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

const extractInfoFromInterface = (
  interfaceName: string,
  project: TypeScriptProject,
): ParsedProperty[] => {
  // Generate the params
  let result: ParsedProperty[] = [];

  try {
    const exportedSymbol = project.exports[interfaceName];
    const type = project.checker.getDeclaredTypeOfSymbol(exportedSymbol);
    // @ts-ignore
    const typeDeclaration = type?.symbol?.declarations?.[0];
    if (!typeDeclaration || !ts.isInterfaceDeclaration(typeDeclaration)) {
      return [];
    }

    const properties: Record<string, ParsedProperty> = {};
    // @ts-ignore
    const propertiesOnProject = type.getProperties();

    // @ts-ignore
    propertiesOnProject.forEach((propertySymbol) => {
      properties[propertySymbol.name] = parseProperty(propertySymbol, project);
    });

    result = Object.values(properties)
      .filter((property) => !property.tags.ignore)
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (e) {
    console.error(`No declaration for ${interfaceName}`);
  }

  return result;
};

export default async function generateHookApi(hooksInfo: HookInfo, project: TypeScriptProject) {
  const { filename, name, apiPathname, apiPagesDirectory, getDemos, readFile, skipApiGeneration } =
    hooksInfo;

  const { shouldSkip, EOL, src } = readFile();

  if (shouldSkip) {
    return null;
  }

  const reactApi: ReactApi = docgenParse(
    src,
    (ast) => {
      let node;
      astTypes.visit(ast, {
        visitFunctionDeclaration: (functionPath) => {
          if (functionPath.node?.id?.name === name) {
            node = functionPath;
          }
          return false;
        },
      });
      return node;
    },
    defaultHandlers.concat(muiDefaultParamsHandler),
    { filename },
  );

  const parameters = extractInfoFromInterface(`${upperFirst(name)}Parameters`, project);
  const returnValue = extractInfoFromInterface(`${upperFirst(name)}ReturnValue`, project);

  // Ignore what we might have generated in `annotateHookDefinition`
  const annotatedDescriptionMatch = reactApi.description.match(/(Demos|API):\r?\n\r?\n/);
  if (annotatedDescriptionMatch !== null) {
    reactApi.description = reactApi.description.slice(0, annotatedDescriptionMatch.index).trim();
  }
  reactApi.filename = filename;
  reactApi.name = name;
  reactApi.apiPathname = apiPathname;
  reactApi.EOL = EOL;
  reactApi.demos = getDemos();
  if (reactApi.demos.length === 0) {
    // TODO: Enable this error once all public hooks are documented
    // throw new Error(
    //   'Unable to find demos. \n' +
    //     `Be sure to include \`hooks: ${reactApi.name}\` in the markdown pages where the \`${reactApi.name}\` hook is relevant. ` +
    //     'Every public hook should have a demo. ',
    // );
  }

  attachTable(reactApi, parameters, 'parametersTable');
  reactApi.parameters = parameters;

  attachTable(reactApi, returnValue, 'returnValueTable');
  reactApi.returnValue = returnValue;

  attachTranslations(reactApi);

  // eslint-disable-next-line no-console
  console.log('Built API docs for', reactApi.name);

  if (!skipApiGeneration) {
    // Generate pages, json and translations
    generateApiTranslations(path.join(process.cwd(), 'docs/translations/api-docs'), reactApi);
    generateApiJson(apiPagesDirectory, reactApi);

    // Add comment about demo & api links to the component hook file
    await annotateHookDefinition(reactApi);
  }

  return reactApi;
}
