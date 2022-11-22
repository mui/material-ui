import fs from 'fs';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import { getHeaders, getTitle } from '@mui/markdown';
import { findPagesMarkdownNew } from 'docs/src/modules/utils/find';
import { getLineFeed } from 'docs/scripts/helpers';
import { replaceComponentLinks } from 'docs/src/modules/utils/replaceUrl';

const systemComponents = fs
  .readdirSync(path.resolve('packages', 'mui-system', 'src'))
  .filter((pathname) => pathname.match(/^[A-Z][a-zA-Z]+$/));

function getMuiName(name: string) {
  return `Mui${name.replace('Unstyled', '').replace('Styled', '')}`;
}

export const extractPackageFile = (filePath: string) => {
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
};

export const extractApiPage = (filePath: string) => {
  filePath = filePath.replace(new RegExp(`\\${path.sep}`, 'g'), '/');
  return {
    apiPathname: filePath
      .replace(/^.*\/pages/, '')
      .replace(/\.(js|tsx)/, '')
      .replace(/^\/index$/, '/') // Replace `index` by `/`.
      .replace(/\/index$/, ''),
  };
};

const parseFile = (filename: string) => {
  const src = fs.readFileSync(filename, 'utf8');
  return {
    src,
    shouldSkip:
      filename.indexOf('internal') !== -1 ||
      !!src.match(/@ignore - internal component\./) ||
      !!src.match(/@ignore - do not document\./),
    spread: !src.match(/ = exactProp\(/),
    EOL: getLineFeed(src),
    inheritedComponent: src.match(/\/\/ @inheritedComponent (.*)/)?.[1],
  };
};

export type ComponentInfo = {
  /**
   * Full path to the file
   */
  filename: string;
  /**
   * Component name
   */
  name: string;
  /**
   * Component name with `Mui` prefix
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
  getDemos: () => Array<{ name: string; demoPathname: string }>;
  apiPagesDirectory: string;
  skipApiGeneration?: boolean;
  /**
   * If `true`, the component's name match one of the system components.
   */
  isSystemComponent?: boolean;
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
  'MultiSelectUnstyled',
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

function findMaterialUIDemos(
  componentName: string,
  pagesMarkdown: ReadonlyArray<{ pathname: string; title: string; components: readonly string[] }>,
) {
  return pagesMarkdown
    .filter(
      (page) =>
        page.pathname.indexOf('/material/') === 0 && page.components.includes(componentName),
    )
    .map((page) => ({
      name: page.title,
      demoPathname: replaceComponentLinks(`${page.pathname.replace(/^\/material/, '')}/`),
    }));
}

export const getMaterialComponentInfo = (filename: string): ComponentInfo => {
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
    isSystemComponent: systemComponents.includes(name),
    readFile() {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getInheritance(inheritedComponent = srcInfo?.inheritedComponent) {
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
      const allMarkdowns = findPagesMarkdownNew().map((markdown) => {
        const markdownContent = fs.readFileSync(markdown.filename, 'utf8');
        const markdownHeaders = getHeaders(markdownContent) as any;

        return {
          ...markdown,
          title: getTitle(markdownContent),
          components: markdownHeaders.components as string[],
        };
      });
      return findMaterialUIDemos(name, allMarkdowns).map((info) => ({
        ...info,
        demoPathname: info.demoPathname,
      }));
    },
  };
};

function findBaseDemos(
  componentName: string,
  pagesMarkdown: ReadonlyArray<{ pathname: string; title: string; components: readonly string[] }>,
) {
  return pagesMarkdown
    .filter((page) => page.components.includes(componentName))
    .map((page) => ({
      name: page.title,
      demoPathname: page.pathname.match(/material\//)
        ? replaceComponentLinks(`${page.pathname.replace(/^\/material/, '')}/`)
        : `${page.pathname.replace('/components/', '/react-')}/`,
    }));
}

interface PageMarkdown {
  pathname: string;
  title: string;
  components: readonly string[];
}

const pathToSystemTitle = (page: PageMarkdown) => {
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
};

function findSystemDemos(componentName: string, pagesMarkdown: ReadonlyArray<PageMarkdown>) {
  return pagesMarkdown
    .filter((page) => page.components.includes(componentName))
    .map((page) => ({
      name: pathToSystemTitle(page),
      demoPathname: page.pathname.match(/material\//)
        ? replaceComponentLinks(`${page.pathname.replace(/^\/material/, '')}/`)
        : `${page.pathname.replace('/components/', '/react-')}/`,
    }));
}

export const getBaseComponentInfo = (filename: string): ComponentInfo => {
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
    isSystemComponent: systemComponents.includes(name),
    readFile() {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getInheritance(inheritedComponent = srcInfo?.inheritedComponent) {
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
      const allMarkdowns = findPagesMarkdownNew()
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
            title: getTitle(markdownContent),
            components: markdownHeaders.components as string[],
          };
        });
      return findBaseDemos(name, allMarkdowns);
    },
  };
};

export const getSystemComponentInfo = (filename: string): ComponentInfo => {
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
    readFile() {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getInheritance() {
      return null;
    },
    getDemos: () => {
      const allMarkdowns = findPagesMarkdownNew()
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
            title: getTitle(markdownContent),
            components: markdownHeaders.components as string[],
          };
        });
      return findSystemDemos(name, allMarkdowns);
    },
  };
};
