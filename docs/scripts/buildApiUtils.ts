import fs from 'fs';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import { getHeaders } from '@mui/markdown';
import { findPagesMarkdown, findPagesMarkdownNew } from 'docs/src/modules/utils/find';
import { getLineFeed } from 'docs/scripts/helpers';
import { pageToTitle } from 'docs/src/modules/utils/helpers';

function findComponentDemos(
  componentName: string,
  pagesMarkdown: ReadonlyArray<{ pathname: string; components: readonly string[] }>,
) {
  const filteredMarkdowns = pagesMarkdown
    .filter((page) => page.components.includes(componentName))
    .map((page) => page.pathname);
  return Array.from(new Set(filteredMarkdowns)) // get unique filenames
    .map((pathname) => ({
      name: pageToTitle({ pathname }) || '',
      demoPathname: `${pathname}/`,
    }));
}

function getMuiName(name: string) {
  return `Mui${name.replace('Unstyled', '').replace('Styled', '')}`;
}

const componentPackageMapping = {
  material: {} as Record<string, string | undefined>,
  base: {} as Record<string, string | undefined>,
};

const packages = [
  {
    name: 'mui-material',
    product: 'material',
    paths: [
      path.join(__dirname, '../../packages/mui-lab/src'),
      path.join(__dirname, '../../packages/mui-material/src'),
      path.join(__dirname, '../../packages/mui-base/src'),
    ],
  },
  {
    name: 'mui-base',
    product: 'base',
    paths: [path.join(__dirname, '../../packages/mui-base/src')],
  },
];

packages.forEach((pkg) => {
  pkg.paths.forEach((pkgPath) => {
    const packageName = pkgPath.match(/packages\/([^/]+)\/src/)?.[1];
    if (!packageName) {
      throw new Error(`cannot find package name from path: ${pkgPath}`);
    }
    const filePaths = fs.readdirSync(pkgPath);
    filePaths.forEach((folder) => {
      if (folder.match(/^[A-Z]/)) {
        // @ts-ignore
        componentPackageMapping[pkg.product][folder] = packageName;
      }
    });
  });
});

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
};

export const getGenericComponentInfo = (filename: string): ComponentInfo => {
  const { name } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the component name from: ${filename}`);
  }
  return {
    filename,
    name,
    muiName: getMuiName(name),
    apiPathname: `/api/${kebabCase(name)}/`,
    apiPagesDirectory: path.join(process.cwd(), 'docs/pages/api-docs'),
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
            : `/api/${kebabCase(inheritedComponent)}/`,
      };
    },
    getDemos: () => {
      const allMarkdowns = findPagesMarkdown().map((markdown) => ({
        ...markdown,
        components: getHeaders(fs.readFileSync(markdown.filename, 'utf8')).components as string[],
      }));
      return findComponentDemos(name, allMarkdowns);
    },
  };
};

export const getMaterialComponentInfo = (filename: string): ComponentInfo => {
  const { name, muiPackage } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the component name from: ${filename}`);
  }
  const componentPkg = componentPackageMapping.material?.[name ?? ''];
  return {
    filename,
    name,
    muiName: getMuiName(name),
    apiPathname: `/material/api/${componentPkg}/${kebabCase(name)}/`,
    apiPagesDirectory: path.join(process.cwd(), `docs/pages/material/api/${muiPackage}`),
    readFile() {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getInheritance(inheritedComponent = srcInfo?.inheritedComponent) {
      if (!inheritedComponent) {
        return null;
      }
      const inheritedPkg = componentPackageMapping.material?.[inheritedComponent ?? ''];
      return {
        name: inheritedComponent,
        apiPathname:
          inheritedComponent === 'Transition'
            ? 'http://reactcommunity.org/react-transition-group/transition/#Transition-props'
            : `/material/api/${inheritedPkg}/${kebabCase(inheritedComponent)}/`,
      };
    },
    getDemos: () => {
      const allMarkdowns = findPagesMarkdownNew().map((markdown) => ({
        ...markdown,
        components: getHeaders(fs.readFileSync(markdown.filename, 'utf8')).components as string[],
      }));
      return findComponentDemos(name, allMarkdowns);
    },
  };
};

export const getBaseComponentInfo = (filename: string): ComponentInfo => {
  const { name, muiPackage } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the component name from: ${filename}`);
  }
  const componentPkg = componentPackageMapping.base?.[name ?? ''];
  return {
    filename,
    name,
    muiName: getMuiName(name),
    apiPathname: `/base/api/${componentPkg}/${kebabCase(name)}/`,
    apiPagesDirectory: path.join(process.cwd(), `docs/pages/base/api/${muiPackage}`),
    readFile() {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getInheritance(inheritedComponent = srcInfo?.inheritedComponent) {
      if (!inheritedComponent) {
        return null;
      }
      const inheritedPkg = componentPackageMapping.base?.[inheritedComponent ?? ''];
      return {
        name: inheritedComponent,
        apiPathname:
          inheritedComponent === 'Transition'
            ? 'http://reactcommunity.org/react-transition-group/transition/#Transition-props'
            : `/base/api/${inheritedPkg}/${kebabCase(inheritedComponent)}/`,
      };
    },
    getDemos: () => {
      const allMarkdowns = findPagesMarkdownNew().map((markdown) => ({
        ...markdown,
        components: getHeaders(fs.readFileSync(markdown.filename, 'utf8')).components as string[],
      }));
      return findComponentDemos(name, allMarkdowns);
    },
  };
};
