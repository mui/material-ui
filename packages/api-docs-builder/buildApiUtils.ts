import * as ts from 'typescript';
import * as prettier from 'prettier';
import fs from 'fs';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import { getHeaders, getTitle } from '@mui/markdown';
import { getLineFeed } from '@mui-internal/docs-utilities';
import { replaceComponentLinks } from './utils/replaceUrl';
import findPagesMarkdown from './utils/findPagesMarkdown';
import { TypeScriptProject } from './utils/createTypeScriptProject';

/**
 * TODO: this should really be fixed in findPagesMarkdown().
 * Plus replaceComponentLinks() shouldn't exist in the first place,
 * the markdown folder location should match the URLs.
 */
function fixPathname(pathname: string): string {
  let fixedPathname;

  if (pathname.startsWith('/material')) {
    fixedPathname = replaceComponentLinks(`${pathname.replace(/^\/material/, '')}/`);
  } else if (pathname.startsWith('/joy')) {
    fixedPathname = replaceComponentLinks(`${pathname.replace(/^\/joy/, '')}/`).replace(
      'material-ui',
      'joy-ui',
    );
  } else {
    fixedPathname = `${pathname.replace('/components/', '/react-')}/`;
  }

  return fixedPathname;
}

const DEFAULT_PRETTIER_CONFIG_PATH = path.join(process.cwd(), 'prettier.config.js');

export function writePrettifiedFile(
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

  fs.writeFileSync(filename, prettier.format(data, { ...prettierConfig, filepath: filename }), {
    encoding: 'utf8',
    ...options,
  });
}

let systemComponents: string[] | undefined;
// making the resolution lazy to avoid issues when importing something irrelevant from this file (i.e. `getSymbolDescription`)
// the eager resolution results in errors when consuming externally (i.e. `mui-x`)
function getSystemComponents() {
  if (!systemComponents) {
    systemComponents = fs
      .readdirSync(path.resolve('packages', 'mui-system', 'src'))
      .filter((pathname) => pathname.match(/^[A-Z][a-zA-Z]+$/));
  }
  return systemComponents;
}

function getMuiName(name: string) {
  return `Mui${name.replace('Styled', '')}`;
}

export function extractPackageFile(filePath: string) {
  filePath = filePath.replace(new RegExp(`\\${path.sep}`, 'g'), '/');
  const match = filePath.match(
    /.*\/packages.*\/(?<packagePath>[^/]+)\/src\/(.*\/)?(?<name>[^/]+)\.(js|tsx|ts|d\.ts)/,
  );
  const result = {
    packagePath: match ? match.groups?.packagePath! : null,
    name: match ? match.groups?.name! : null,
  };
  return {
    ...result,
    muiPackage: result.packagePath?.replace('x-', 'mui-'),
  };
}

export function extractApiPage(filePath: string) {
  filePath = filePath.replace(new RegExp(`\\${path.sep}`, 'g'), '/');
  return {
    apiPathname: filePath
      .replace(/^.*\/pages/, '')
      .replace(/\.(js|tsx)/, '')
      .replace(/^\/index$/, '/') // Replace `index` by `/`.
      .replace(/\/index$/, ''),
  };
}

function parseFile(filename: string) {
  const src = fs.readFileSync(filename, 'utf8');
  return {
    src,
    shouldSkip:
      filename.indexOf('internal') !== -1 ||
      !!src.match(/@ignore - internal component\./) ||
      !!src.match(/@ignore - internal hook\./) ||
      !!src.match(/@ignore - do not document\./),
    spread: !src.match(/ = exactProp\(/),
    EOL: getLineFeed(src),
    inheritedComponent: src.match(/\/\/ @inheritedComponent (.*)/)?.[1],
  };
}

export type ComponentInfo = {
  /**
   * Full path to the source file.
   */
  filename: string;
  /**
   * Component name as imported in the docs, in the global MUI namespace.
   */
  name: string;
  /**
   * Component name with `Mui` prefix, in the global HTML page namespace.
   */
  muiName: string;
  apiPathname: string;
  readFile: () => {
    src: string;
    spread: boolean;
    shouldSkip: boolean;
    EOL: string;
    inheritedComponent?: string;
  };
  getInheritance: (inheritedComponent?: string) => null | {
    /**
     * Component name
     */
    name: string;
    /**
     * API pathname
     */
    apiPathname: string;
  };
  getDemos: () => Array<{ demoPageTitle: string; demoPathname: string }>;
  apiPagesDirectory: string;
  skipApiGeneration?: boolean;
  /**
   * If `true`, the component's name match one of the system components.
   */
  isSystemComponent?: boolean;
};

export type HookInfo = {
  /**
   * Full path to the source file.
   */
  filename: string;
  /**
   * Hook name as imported in the docs, in the global MUI namespace.
   */
  name: string;
  apiPathname: string;
  readFile: ComponentInfo['readFile'];
  getDemos: ComponentInfo['getDemos'];
  apiPagesDirectory: string;
  skipApiGeneration?: boolean;
};

const migratedBaseComponents = [
  'Badge',
  'Button',
  'ClickAwayListener',
  'FocusTrap',
  'Input',
  'MenuItem',
  'Menu',
  'Modal',
  'NoSsr',
  'OptionGroup',
  'Option',
  'Popper',
  'Portal',
  'Select',
  'Slider',
  'Switch',
  'TablePagination',
  'TabPanel',
  'TabsList',
  'Tabs',
  'Tab',
];

export function getMaterialComponentInfo(filename: string): ComponentInfo {
  const { name } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the component name from: ${filename}`);
  }
  return {
    filename,
    name,
    muiName: getMuiName(name),
    apiPathname: `/material-ui/api/${kebabCase(name)}/`,
    apiPagesDirectory: path.join(process.cwd(), `docs/pages/material-ui/api`),
    isSystemComponent: getSystemComponents().includes(name),
    readFile: () => {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getInheritance: (inheritedComponent = srcInfo?.inheritedComponent) => {
      if (!inheritedComponent) {
        return null;
      }
      // `inheritedComponent` node is coming from test files.
      // `inheritedComponent` must include `Unstyled` suffix for parser to recognise that the component inherits Base UI component
      // e.g., Joy Menu inherits Base UI Popper, and its test file uses the name `PopperUnstyled` so that we can recognise here that
      // Joy Menu is inheriting a base component. In terms of documentation, we should no longer use the name `PopperUnstyled`, and hence
      // we remove the suffix here.
      return {
        name: inheritedComponent.replace(/unstyled/i, ''),
        apiPathname:
          inheritedComponent === 'Transition'
            ? 'http://reactcommunity.org/react-transition-group/transition/#Transition-props'
            : `/${inheritedComponent.match(/unstyled/i) ? 'base' : 'material-ui'}/api/${kebabCase(
                inheritedComponent.replace(/unstyled/i, ''),
              )}/`,
      };
    },
    getDemos: () => {
      const allMarkdowns = findPagesMarkdown().map((markdown) => {
        const markdownContent = fs.readFileSync(markdown.filename, 'utf8');
        const markdownHeaders = getHeaders(markdownContent) as any;

        return {
          ...markdown,
          markdownContent,
          components: markdownHeaders.components as string[],
        };
      });
      return allMarkdowns
        .filter((page) => page.pathname.startsWith('/material') && page.components.includes(name))
        .map((page) => ({
          demoPageTitle: getTitle(page.markdownContent),
          demoPathname: fixPathname(page.pathname),
        }));
    },
  };
}

interface PageMarkdown {
  pathname: string;
  title: string;
  components: readonly string[];
}

function pathToSystemTitle(page: PageMarkdown) {
  const defaultTitle = page.title;
  if (page.pathname.startsWith('/material')) {
    return `${defaultTitle} (Material UI)`;
  }
  if (page.pathname.startsWith('/system')) {
    return `${defaultTitle} (MUI System)`;
  }
  if (page.pathname.startsWith('/joy')) {
    return `${defaultTitle} (Joy UI)`;
  }
  return defaultTitle;
}

function findBaseDemos(
  componentName: string,
  pagesMarkdown: ReadonlyArray<{
    pathname: string;
    components: readonly string[];
    markdownContent: string;
  }>,
) {
  return pagesMarkdown
    .filter((page) => page.components.includes(componentName))
    .map((page) => ({
      demoPageTitle: getTitle(page.markdownContent),
      demoPathname: fixPathname(page.pathname),
    }));
}

function findBaseHooksDemos(
  hookName: string,
  pagesMarkdown: ReadonlyArray<{
    pathname: string;
    hooks: readonly string[];
    markdownContent: string;
  }>,
) {
  return pagesMarkdown
    .filter((page) => page.hooks && page.hooks.includes(hookName))
    .map((page) => ({
      demoPageTitle: getTitle(page.markdownContent),
      demoPathname: `${fixPathname(page.pathname)}#hook${page.hooks?.length > 1 ? 's' : ''}`,
    }));
}

const getApiPath = (
  demos: Array<{ demoPageTitle: string; demoPathname: string }>,
  name: string,
) => {
  let apiPath = null;

  if (demos && demos.length > 0) {
    // remove the hash from the demoPathname, for e.g. "#hooks"
    const cleanedDemosPathname = demos[0].demoPathname.split('#')[0];
    apiPath = `${cleanedDemosPathname}${
      name.startsWith('use') ? 'hooks-api' : 'components-api'
    }/#${kebabCase(name)}`;
  }

  return apiPath;
};

export function getBaseComponentInfo(filename: string): ComponentInfo {
  const { name } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the component name from: ${filename}`);
  }

  // resolve demos, so that we can getch the API url
  const allMarkdowns = findPagesMarkdown()
    .filter((markdown) => {
      if (migratedBaseComponents.some((component) => filename.includes(component))) {
        return markdown.filename.match(/[\\/]data[\\/]base[\\/]/);
      }
      return true;
    })
    .map((markdown) => {
      const markdownContent = fs.readFileSync(markdown.filename, 'utf8');
      const markdownHeaders = getHeaders(markdownContent) as any;

      return {
        ...markdown,
        markdownContent,
        components: markdownHeaders.components as string[],
      };
    });

  const demos = findBaseDemos(name, allMarkdowns);
  const apiPath = getApiPath(demos, name);

  return {
    filename,
    name,
    muiName: getMuiName(name),
    apiPathname: apiPath ?? `/base/api/${kebabCase(name)}/`,
    apiPagesDirectory: path.join(process.cwd(), `docs/pages/base/api`),
    isSystemComponent: getSystemComponents().includes(name),
    readFile: () => {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getInheritance: (inheritedComponent = srcInfo?.inheritedComponent) => {
      if (!inheritedComponent) {
        return null;
      }
      return {
        name: inheritedComponent,
        apiPathname:
          inheritedComponent === 'Transition'
            ? 'http://reactcommunity.org/react-transition-group/transition/#Transition-props'
            : `/base/api/${kebabCase(inheritedComponent)}/`,
      };
    },
    getDemos: () => demos,
  };
}

export function getBaseHookInfo(filename: string): HookInfo {
  const { name } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the hook name from: ${filename}`);
  }

  const allMarkdowns = findPagesMarkdown()
    .filter((markdown) => {
      if (migratedBaseComponents.some((component) => filename.includes(component))) {
        return markdown.filename.match(/[\\/]data[\\/]base[\\/]/);
      }
      return true;
    })
    .map((markdown) => {
      const markdownContent = fs.readFileSync(markdown.filename, 'utf8');
      const markdownHeaders = getHeaders(markdownContent) as any;

      return {
        ...markdown,
        markdownContent,
        hooks: markdownHeaders.hooks as string[],
      };
    });

  const demos = findBaseHooksDemos(name, allMarkdowns);
  const apiPath = getApiPath(demos, name);

  const result = {
    filename,
    name,
    apiPathname: apiPath ?? `/base/api/${kebabCase(name)}/`,
    apiPagesDirectory: path.join(process.cwd(), `docs/pages/base/api`),
    readFile: () => {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getDemos: () => demos,
  };
  return result;
}

export function getJoyComponentInfo(filename: string): ComponentInfo {
  const { name } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the component name from: ${filename}`);
  }
  return {
    filename,
    name,
    muiName: getMuiName(name),
    apiPathname: `/joy-ui/api/${kebabCase(name)}/`,
    apiPagesDirectory: path.join(process.cwd(), `docs/pages/joy-ui/api`),
    isSystemComponent: getSystemComponents().includes(name),
    readFile: () => {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getInheritance: (inheritedComponent = srcInfo?.inheritedComponent) => {
      if (!inheritedComponent) {
        return null;
      }
      // `inheritedComponent` node is coming from test files.
      // `inheritedComponent` must include `Unstyled` suffix for parser to recognise that the component inherits Base UI component
      // e.g., Joy Menu inherits Base UI Popper, and its test file uses the name `PopperUnstyled` so that we can recognise here that
      // Joy Menu is inheriting a base component. In terms of documentation, we should no longer use the name `PopperUnstyled`, and hence
      // we remove the suffix here.
      return {
        name: inheritedComponent.replace(/unstyled/i, ''),
        apiPathname: `/${inheritedComponent.match(/unstyled/i) ? 'base' : 'joy-ui'}/api/${kebabCase(
          inheritedComponent.replace(/unstyled/i, ''),
        )}/`,
      };
    },
    getDemos: () => {
      const allMarkdowns = findPagesMarkdown().map((markdown) => {
        const markdownContent = fs.readFileSync(markdown.filename, 'utf8');
        const markdownHeaders = getHeaders(markdownContent) as any;

        return {
          ...markdown,
          markdownContent,
          components: markdownHeaders.components as string[],
        };
      });
      return allMarkdowns
        .filter((page) => page.pathname.startsWith('/joy') && page.components.includes(name))
        .map((page) => ({
          demoPageTitle: getTitle(page.markdownContent),
          demoPathname: fixPathname(page.pathname),
        }));
    },
  };
}

export function getSystemComponentInfo(filename: string): ComponentInfo {
  const { name } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the component name from: ${filename}`);
  }
  return {
    filename,
    name,
    muiName: getMuiName(name),
    apiPathname: `/system/api/${kebabCase(name)}/`,
    apiPagesDirectory: path.join(process.cwd(), `docs/pages/system/api`),
    isSystemComponent: true,
    readFile: () => {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getInheritance() {
      return null;
    },
    getDemos: () => {
      const allMarkdowns = findPagesMarkdown()
        .filter((markdown) => {
          if (migratedBaseComponents.some((component) => filename.includes(component))) {
            return markdown.filename.match(/[\\/]data[\\/]system[\\/]/);
          }
          return true;
        })
        .map((markdown) => {
          const markdownContent = fs.readFileSync(markdown.filename, 'utf8');
          const markdownHeaders = getHeaders(markdownContent) as any;

          return {
            ...markdown,
            markdownContent,
            components: markdownHeaders.components as string[],
          };
        });
      return allMarkdowns
        .filter((page) => page.components.includes(name))
        .map((page) => ({
          demoPageTitle: pathToSystemTitle({
            ...page,
            title: getTitle(page.markdownContent),
          }),
          demoPathname: fixPathname(page.pathname),
        }));
    },
  };
}

export function formatType(rawType: string) {
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
}

export function getSymbolDescription(symbol: ts.Symbol, project: TypeScriptProject) {
  return symbol
    .getDocumentationComment(project.checker)
    .flatMap((comment) => comment.text.split('\n'))
    .filter((line) => !line.startsWith('TODO'))
    .join('\n');
}

export function getSymbolJSDocTags(symbol: ts.Symbol) {
  return Object.fromEntries(symbol.getJsDocTags().map((tag) => [tag.name, tag]));
}

export function stringifySymbol(symbol: ts.Symbol, project: TypeScriptProject) {
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
}

export function generateBaseUIApiPages() {
  findPagesMarkdown().forEach((markdown) => {
    const markdownContent = fs.readFileSync(markdown.filename, 'utf8');
    const markdownHeaders = getHeaders(markdownContent) as any;
    const pathnameTokens = markdown.pathname.split('/');
    const productName = pathnameTokens[1];
    const componentName = pathnameTokens[3];

    if (
      productName === 'base' &&
      (markdown.filename.indexOf('\\components\\') >= 0 ||
        markdown.filename.indexOf('/components/') >= 0)
    ) {
      const { components, hooks } = markdownHeaders;

      let apiTabImportStatements = '';
      let staticProps = 'export const getStaticProps = () => {';
      let componentsApiDescriptions = '';
      let componentsPageContents = '';
      let hooksApiDescriptions = '';
      let hooksPageContents = '';

      if (components) {
        components.forEach((component: string) => {
          const componentNameKebabCase = kebabCase(component);
          apiTabImportStatements += `import ${component}ApiJsonPageContent from '../../api/${componentNameKebabCase}.json';`;
          staticProps += `
          const ${component}ApiReq = require.context(
            'docs/translations/api-docs-base/${componentNameKebabCase}',
            false,
            /${componentNameKebabCase}.*.json$/,
          );
          const ${component}ApiDescriptions = mapApiPageTranslations(${component}ApiReq);
          `;
          componentsApiDescriptions += `${component} : ${component}ApiDescriptions ,`;
          componentsPageContents += `${component} : ${component}ApiJsonPageContent ,`;
        });
      }

      if (hooks) {
        hooks.forEach((hook: string) => {
          const hookNameKebabCase = kebabCase(hook);
          apiTabImportStatements += `import ${hook}ApiJsonPageContent from '../../api/${hookNameKebabCase}.json';`;
          staticProps += `
          const ${hook}ApiReq = require.context(
            'docs/translations/api-docs/${hookNameKebabCase}',
            false,
            /${hookNameKebabCase}.*.json$/,
          );
          const ${hook}ApiDescriptions = mapApiPageTranslations(${hook}ApiReq);
          `;
          hooksApiDescriptions += `${hook} : ${hook}ApiDescriptions ,`;
          hooksPageContents += `${hook} : ${hook}ApiJsonPageContent ,`;
        });
      }

      staticProps += `
      return { props: { componentsApiDescriptions: {`;
      staticProps += componentsApiDescriptions;

      staticProps += '}, componentsApiPageContents: { ';
      staticProps += componentsPageContents;

      staticProps += '}, hooksApiDescriptions: {';
      staticProps += hooksApiDescriptions;

      staticProps += '}, hooksApiPageContents: {';
      staticProps += hooksPageContents;

      staticProps += ` },},};};`;

      const tokens = markdown.pathname.split('/');
      const name = tokens[tokens.length - 1];
      const importStatement = `docs/data${markdown.pathname}/${name}.md`;
      const demosSource = `
import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from '${importStatement}?@mui/markdown';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};
      `;

      const tabsApiSource = `
import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from '${importStatement}?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
${apiTabImportStatements}

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};

export const getStaticPaths = () => {
  return {
    paths: [{ params: { docsTab: 'components-api' } }, { params: { docsTab: 'hooks-api' } }],
    fallback: false, // can also be true or 'blocking'
  };
};

${staticProps}
      `;

      const componentPageDirectory = `docs/pages/${productName}/react-${componentName}/`;
      if (!fs.existsSync(componentPageDirectory)) {
        fs.mkdirSync(componentPageDirectory, { recursive: true });
      }
      const demosSourcePath = path.join(process.cwd(), `${componentPageDirectory}/index.js`);
      writePrettifiedFile(demosSourcePath, demosSource);

      const docsTabsPagesDirectory = `${componentPageDirectory}/[docsTab]`;
      if (!fs.existsSync(docsTabsPagesDirectory)) {
        fs.mkdirSync(docsTabsPagesDirectory, { recursive: true });
      }
      const tabsApiPath = path.join(process.cwd(), `${docsTabsPagesDirectory}/index.js`);
      writePrettifiedFile(tabsApiPath, tabsApiSource);
    }
  });
}
