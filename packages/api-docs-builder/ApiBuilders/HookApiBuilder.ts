import { defaultHandlers, parse as docgenParse, ReactDocgenApi } from 'react-docgen';
import * as ts from 'typescript';
import * as prettier from 'prettier';
import { mkdirSync } from 'fs';
import * as astTypes from 'ast-types';
import path from 'path';
import * as _ from 'lodash';
import kebabCase from 'lodash/kebabCase';
import upperFirst from 'lodash/upperFirst';
import { renderInline as renderMarkdownInline } from '@mui/markdown';
import { LANGUAGES } from 'docs/config';
import { toGitHubPath, writePrettifiedFile } from './ComponentApiBuilder';
import { HookInfo } from '../buildApiUtils';
import { TypeScriptProject } from '../utils/createTypeScriptProject';
import muiDefaultParamsHandler from '../utils/defaultParamsHandler';

interface ParsedProperty {
  name: string;
  description: string;
  tags: { [tagName: string]: ts.JSDocTagInfo };
  required: boolean;
  typeStr: string;
}

export const getSymbolDescription = (symbol: ts.Symbol, project: TypeScriptProject) =>
  symbol
    .getDocumentationComment(project.checker)
    .flatMap((comment) => comment.text.split('\n'))
    .filter((line) => !line.startsWith('TODO'))
    .join('\n');

export const formatType = (rawType: string) => {
  if (!rawType) {
    return '';
  }

  const prefix = 'type FakeType = ';
  const signatureWithTypeName = `${prefix}${rawType}`;

  const prettifiedSignatureWithTypeName = prettier.format(signatureWithTypeName, {
    printWidth: 999,
    singleQuote: true,
    semi: false,
    trailingComma: 'none',
    parser: 'typescript',
  });

  return prettifiedSignatureWithTypeName.slice(prefix.length).replace(/\n$/, '');
};

export const getSymbolJSDocTags = (symbol: ts.Symbol) =>
  Object.fromEntries(symbol.getJsDocTags().map((tag) => [tag.name, tag]));

export const stringifySymbol = (symbol: ts.Symbol, project: TypeScriptProject) => {
  let rawType: string;

  const declaration = symbol.declarations?.[0];
  if (declaration && ts.isPropertySignature(declaration)) {
    rawType = declaration.type?.getText() ?? '';
  } else {
    rawType = project.checker.typeToString(
      project.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!),
      symbol.valueDeclaration,
      ts.TypeFormatFlags.NoTruncation,
    );
  }

  return formatType(rawType);
};

// Took from MUI X
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
  inputParams?: ParsedProperty[];
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
  inputParamsTable: _.Dictionary<{
    default: string | undefined;
    required: boolean | undefined;
    type: { name: string | undefined; description: string | undefined };
    deprecated: true | undefined;
    deprecationInfo: string | undefined;
  }>;
  translations: {
    hookDescription: string;
    inputParamsDescriptions: { [key: string]: string | undefined };
  };
}

const attachParamsTable = (reactApi: ReactApi, params: ParsedProperty[]) => {
  const propErrors: Array<[propName: string, error: Error]> = [];
  const inputParams: ReactApi['inputParamsTable'] = params
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

      // Only keep `default` for bool props if it isn't 'false'.
      let defaultValue: string | undefined;
      const defaultTag = propDescriptor.tags?.default;
      const defaultValueText = defaultTag?.text?.[0]?.text;
      if (propDescriptor.typeStr !== 'bool' || defaultValueText !== 'false') {
        defaultValue = defaultValueText;
      }
      const requiredProp = prop.required;

      const deprecation = (propDescriptor.description || '').match(/@deprecated(\s+(?<info>.*))?/);

      return {
        [propName]: {
          type: {
            name: propDescriptor.typeStr,
            description: propDescriptor.description ?? undefined,
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
    .reduce((acc, curr) => ({ ...acc, ...curr }), {}) as unknown as ReactApi['inputParamsTable'];
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
  delete inputParams.undefined;

  reactApi.inputParamsTable = inputParams;
};

const attachTranslations = (reactApi: ReactApi) => {
  const translations: ReactApi['translations'] = {
    hookDescription: reactApi.description,
    inputParamsDescriptions: {},
  };

  (reactApi.inputParams ?? []).forEach(({ name: propName, description }) => {
    if (description) {
      translations.inputParamsDescriptions[propName] = description.replace(/\n@default.*$/, '');
    }
  });

  reactApi.translations = translations;
};

const generateApiPage = (outputDirectory: string, reactApi: ReactApi) => {
  /**
   * Gather the metadata needed for the component's API page.
   */
  const pageContent = {
    // Sorted by required DESC, name ASC
    inputParams: _.fromPairs(
      Object.entries(reactApi.inputParamsTable).sort(([aName, aData], [bName, bData]) => {
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
      .map((item) => `<li><a href="${item.demoPathname}">${item.name}</a></li>`)
      .join('\n')}</ul>`,
  };

  writePrettifiedFile(
    path.resolve(outputDirectory, `${kebabCase(reactApi.name)}.json`),
    JSON.stringify(pageContent),
  );

  writePrettifiedFile(
    path.resolve(outputDirectory, `${kebabCase(reactApi.name)}.js`),
    `import * as React from 'react';
import HooksApiPage from 'docs/src/modules/components/HooksApiPage';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import jsonPageContent from './${kebabCase(reactApi.name)}.json';

export default function Page(props) {
  const { descriptions, pageContent } = props;
  return <HooksApiPage descriptions={descriptions} pageContent={pageContent} />;
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

const generateApiTranslations = (outputDirectory: string, reactApi: ReactApi) => {
  const hookName = reactApi.name;
  const apiDocsTranslationPath = path.resolve(outputDirectory, kebabCase(hookName));
  function resolveApiDocsTranslationsComponentLanguagePath(language: typeof LANGUAGES[0]): string {
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

const generateHookApi = async (hooksInfo: HookInfo, project: TypeScriptProject) => {
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

  let inputParams: ParsedProperty[] = [];
  const interfaceName = `${upperFirst(name)}Parameters`;

  try {
    const exportedSymbol = project.exports[interfaceName];
    const type = project.checker.getDeclaredTypeOfSymbol(exportedSymbol);
    // @ts-ignore
    const typeDeclaration = type?.symbol?.declarations?.[0];
    if (!typeDeclaration || !ts.isInterfaceDeclaration(typeDeclaration)) {
      return null;
    }

    const properties: Record<string, ParsedProperty> = {};
    // @ts-ignore
    const propertiesOnProject = type.getProperties();

    // @ts-ignore
    propertiesOnProject.forEach((propertySymbol) => {
      properties[propertySymbol.name] = parseProperty(propertySymbol, project);
    });

    inputParams = Object.values(properties)
      .filter((property) => !property.tags.ignore)
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (e) {
    console.error(`No declaration for ${interfaceName}`);
  }

  // Ignore what we might have generated in `annotateComponentDefinition`
  // const annotatedDescriptionMatch = reactApi.description.match(/(Demos|API):\r?\n\r?\n/);
  // if (annotatedDescriptionMatch !== null) {
  //   reactApi.description = reactApi.description.slice(0, annotatedDescriptionMatch.index).trim();
  // }
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

  attachParamsTable(reactApi, inputParams);
  reactApi.inputParams = inputParams;
  attachTranslations(reactApi);

  // eslint-disable-next-line no-console
  console.log('Built API docs for', reactApi.name);

  if (!skipApiGeneration) {
    // Generate pages, json and translations
    // TODO: Add translations
    generateApiTranslations(path.join(process.cwd(), 'docs/translations/api-docs'), reactApi);
    generateApiPage(apiPagesDirectory, reactApi);

    // TODO: Add annotation
    // Add comment about demo & api links (including inherited component) to the component file
    // await annotateComponentDefinition(reactApi);
  }

  return reactApi;
};

export default generateHookApi;
