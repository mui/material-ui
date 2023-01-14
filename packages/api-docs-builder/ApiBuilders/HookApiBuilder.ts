import { defaultHandlers, parse as docgenParse, ReactDocgenApi } from 'react-docgen';
import { mkdirSync } from 'fs';
import * as astTypes from 'ast-types';
import path from 'path';
import * as _ from 'lodash';
import kebabCase from 'lodash/kebabCase';
import { renderInline as renderMarkdownInline } from '@mui/markdown';
import { LANGUAGES } from 'docs/config';
import generatePropDescription from '../utils/generatePropDescription';
import { toGitHubPath, writePrettifiedFile } from './ComponentApiBuilder';
import { HookInfo } from '../buildApiUtils';
import { TypeScriptProject } from '../utils/createTypeScriptProject';
import createDescribeableProp, {
  DescribeablePropDescriptor,
} from '../utils/createDescribeableProp';
import muiDefaultParamsHandler from '../utils/defaultParamsHandler';

export interface ReactApi extends ReactDocgenApi {
  demos: ReturnType<HookInfo['getDemos']>;
  EOL: string;
  filename: string;
  apiPathname: string;
  inputParams?: ReactDocgenApi['props'];
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

const attachParamsTable = (reactApi: ReactApi) => {
  const propErrors: Array<[propName: string, error: Error]> = [];
  const inputParams: ReactApi['inputParamsTable'] = reactApi.props
    ? _.fromPairs(
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

          // Only keep `default` for bool props if it isn't 'false'.
          let defaultValue: string | undefined;
          if (
            propDescriptor.type?.name !== 'bool' ||
            propDescriptor.jsdocDefaultValue?.value !== 'false'
          ) {
            defaultValue = propDescriptor.jsdocDefaultValue?.value;
          }

          const requiredProp = prop.required;

          const deprecation = (propDescriptor.description || '').match(
            /@deprecated(\s+(?<info>.*))?/,
          );

          return [
            propName,
            {
              type: {
                name: propDescriptor.type?.name,
                // TODO: Check if this should be changed
                description: propDescriptor.description ?? undefined,
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
      )
    : {};
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

  Object.entries(reactApi.props! ?? reactApi.inputParams ?? {}).forEach(
    ([propName, propDescriptor]) => {
      let prop: DescribeablePropDescriptor | null;
      try {
        prop = createDescribeableProp(propDescriptor, propName);
      } catch (error) {
        prop = null;
      }
      if (prop && prop.type) {
        let description = generatePropDescription(prop, propName);
        description = renderMarkdownInline(description);

        if (propName === 'classes') {
          description += ' See <a href="#css">CSS API</a> below for more details.';
        } else if (propName === 'sx') {
          description +=
            ' See the <a href="/system/getting-started/the-sx-prop/">`sx` page</a> for more details.';
        }
        translations.inputParamsDescriptions[propName] = description.replace(/\n@default.*$/, '');
      }
    },
  );

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

  let reactApi: ReactApi;

  reactApi = docgenParse(
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
      if (!node) {
        console.log(filename);
      }
      return node;
    },
    defaultHandlers.concat(muiDefaultParamsHandler),
    { filename },
  );

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

  attachParamsTable(reactApi);
  reactApi.inputParams = reactApi.props;
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
