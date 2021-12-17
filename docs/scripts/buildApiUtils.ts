import path from 'path';
import kebabCase from 'lodash/kebabCase';

export const getProductName = (filename: string) => {
  const normalized = filename.replace(new RegExp(`\\${path.sep}`, 'g'), '/');
  const packageMatch = normalized.match(/packages\/([^/]+)\//);
  const packageName = packageMatch?.[1] ?? '';
  return packageName.replace('mui-', '');
};

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

/**
 * Provide information from the filename, can be component or markdown. (will be removed once migration is done)
 * component example: /Users/siriwatknp/Personal-Repos/material-ui/packages/mui-material/src/Button/Button.js
 * markdown example: /Users/siriwatknp/Personal-Repos/material-ui/docs/src/pages/components/buttons/buttons.md
 */
export const getGeneralPathInfo = (filename: string) => {
  filename = filename.replace(new RegExp(`\\${path.sep}`, 'g'), '/');
  const componentName = filename.match(/.*\/([^/]+)\.(tsx|js)/)?.[1];
  return {
    productUrlPrefix: '',
    apiUrl: `/api/${kebabCase(componentName)}`,
    demoUrl: filename.replace(/^.*\/pages/, '').replace(/\/[^/]+\.(md|js|ts|tsx)/, ''),
  };
};

export const getMaterialPathInfo = (filename: string) => {
  filename = filename.replace(new RegExp(`\\${path.sep}`, 'g'), '/');
  const componentName = filename.match(/.*\/([^/]+)\.(tsx|js)/)?.[1];
  return {
    productUrlPrefix: `/material`,
    apiUrl: `/material/api/${kebabCase(componentName)}`,
    demoUrl: filename.replace(/^.*\/products/, '').replace(/\/[^/]+\.(md|js|ts|tsx)/, ''),
  };
};

export const getBasePathInfo = (filename: string) => {
  filename = filename.replace(new RegExp(`\\${path.sep}`, 'g'), '/');
  const componentName = filename.match(/.*\/([^/]+)\.(tsx|js)/)?.[1];
  return {
    productUrlPrefix: `/base`,
    apiUrl: `/base/api/${kebabCase(componentName)}`,
    demoUrl: filename.replace(/^.*\/products/, '').replace(/\/[^/]+\.(md|js|ts|tsx)/, ''),
  };
};
