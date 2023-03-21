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
  return `Mui${name.replace('Unstyled', '').replace('Styled', '')}`;
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
  'BadgeUnstyled',
  'ButtonUnstyled',
  'ClickAwayListener',
  'FocusTrap',
  'InputUnstyled',
  'MenuItemUnstyled',
  'MenuUnstyled',
  'ModalUnstyled',
  'NoSsr',
  'OptionGroupUnstyled',
  'OptionUnstyled',
  'PopperUnstyled',
  'Portal',
  'SelectUnstyled',
  'SliderUnstyled',
  'SwitchUnstyled',
  'TablePaginationUnstyled',
  'TabPanelUnstyled',
  'TabsListUnstyled',
  'TabsUnstyled',
  'TabUnstyled',
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
      return {
        name: inheritedComponent,
        apiPathname:
          inheritedComponent === 'Transition'
            ? 'http://reactcommunity.org/react-transition-group/transition/#Transition-props'
            : `/${inheritedComponent.match(/unstyled/i) ? 'base' : 'material-ui'}/api/${kebabCase(
                inheritedComponent,
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
        .filter(
          (page) => page.pathname.indexOf('/material/') === 0 && page.components.includes(name),
        )
        .map((page) => ({
          demoPageTitle: getTitle(page.markdownContent),
          demoPathname: replaceComponentLinks(`${page.pathname.replace(/^\/material/, '')}/`),
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
  if (page.pathname.match(/material\//)) {
    return `${defaultTitle} (Material UI)`;
  }
  if (page.pathname.match(/system\//)) {
    return `${defaultTitle} (MUI System)`;
  }
  if (page.pathname.match(/joy\//)) {
    return `${defaultTitle} (Joy UI)`;
  }
  return defaultTitle;
}

export function getBaseComponentInfo(filename: string): ComponentInfo {
  const { name } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the component name from: ${filename}`);
  }
  return {
    filename,
    name,
    muiName: getMuiName(name),
    apiPathname: `/base/api/${kebabCase(name)}/`,
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
    getDemos: () => {
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
      return allMarkdowns
        .filter((page) => page.components.includes(name))
        .map((page) => ({
          demoPageTitle: getTitle(page.markdownContent),
          demoPathname: page.pathname.match(/material\//)
            ? replaceComponentLinks(`${page.pathname.replace(/^\/material/, '')}/`)
            : `${page.pathname.replace('/components/', '/react-')}/`,
        }));
    },
  };
}

export function getBaseHookInfo(filename: string): HookInfo {
  const { name } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the hook name from: ${filename}`);
  }
  const result = {
    filename,
    name,
    apiPathname: `/base/api/${kebabCase(name)}/`,
    apiPagesDirectory: path.join(process.cwd(), `docs/pages/base/api`),
    readFile: () => {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getDemos: () => {
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
      return allMarkdowns
        .filter((page) => page.hooks && page.hooks.includes(name))
        .map((page) => ({
          demoPageTitle: getTitle(page.markdownContent),
          demoPathname: page.pathname.match(/material\//)
            ? replaceComponentLinks(`${page.pathname.replace(/^\/material/, '')}/`)
            : `${page.pathname.replace('/components/', '/react-')}/#hook${
                page.hooks?.length > 1 ? 's' : ''
              }`,
        }));
    },
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
      return {
        name: inheritedComponent,
        apiPathname: `/${inheritedComponent.match(/unstyled/i) ? 'base' : 'joy-ui'}/api/${kebabCase(
          inheritedComponent,
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
        .filter((page) => page.pathname.indexOf('/joy/') === 0 && page.components.includes(name))
        .map((page) => ({
          demoPageTitle: getTitle(page.markdownContent),
          demoPathname: replaceComponentLinks(`${page.pathname.replace(/^\/joy/, '')}/`).replace(
            'material-ui',
            'joy-ui',
          ),
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
          demoPathname: page.pathname.match(/material\//)
            ? replaceComponentLinks(`${page.pathname.replace(/^\/material/, '')}/`)
            : `${page.pathname.replace('/components/', '/react-')}/`,
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
