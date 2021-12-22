import fs from 'fs';
import path from 'path';
import kebabCase from 'lodash/kebabCase';

export function findComponentDemos(
  componentName: string,
  pagesMarkdown: ReadonlyArray<{ pathname: string; components: readonly string[] }>,
) {
  const demos = pagesMarkdown
    .filter((page) => {
      return page.components.includes(componentName);
    })
    .map((page) => {
      return page.pathname;
    });

  return Array.from(new Set(demos));
}

export function getMuiName(name: string) {
  return `Mui${name.replace('Unstyled', '').replace('Styled', '')}`;
}

function normalizeFilePath(filename: string) {
  return filename.replace(new RegExp(`\\${path.sep}`, 'g'), '/');
}

/**
 * Provide information from the filename, can be component or markdown. (will be removed once migration is done)
 * component example: /Users/siriwatknp/Personal-Repos/material-ui/packages/mui-material/src/Button/Button.js
 * markdown example: /Users/siriwatknp/Personal-Repos/material-ui/docs/src/pages/components/buttons/buttons.md
 */
export const getGeneralPathInfo = (filename: string) => {
  filename = normalizeFilePath(filename);
  const componentName = filename.match(/.*\/([^/]+)\.(tsx|js)/)?.[1];
  return {
    apiUrl: `/api/${kebabCase(componentName)}`,
    demoUrl: filename.replace(/^.*\/pages/, '').replace(/\/[^/]+\.(md|js|ts|tsx)/, ''),
  };
};

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

export const getMaterialPathInfo = (filename: string) => {
  filename = normalizeFilePath(filename);
  const componentName = filename.match(/.*\/([^/]+)\.(tsx|js)/)?.[1];
  const componentPkg = componentPackageMapping.material?.[componentName ?? ''];
  return {
    apiUrl: `/material/api/${componentPkg}/${kebabCase(componentName)}`,
    demoUrl: filename
      .replace(/^.*\/data/, '')
      .replace('components/', 'react-')
      .replace(/\/[^/]+\.(md|js|ts|tsx)/, ''),
  };
};

export const getBasePathInfo = (filename: string) => {
  filename = normalizeFilePath(filename);
  const componentName = filename.match(/.*\/([^/]+)\.(tsx|js)/)?.[1];
  const componentPkg = componentPackageMapping.base?.[componentName ?? ''];
  return {
    apiUrl: `/base/api/${componentPkg}/${kebabCase(componentName)}`,
    demoUrl: filename
      .replace(/^.*\/data/, '')
      .replace('components/', 'react-')
      .replace(/\/[^/]+\.(md|js|ts|tsx)/, ''),
  };
};
