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

export const getMaterialPathInfo = (filename: string) => {
  filename = normalizeFilePath(filename);
  const componentName = filename.match(/.*\/([^/]+)\.(tsx|js)/)?.[1];
  return {
    apiUrl: `/material/api/${kebabCase(componentName)}`,
    demoUrl: filename.replace(/^.*\/data/, '').replace(/\/[^/]+\.(md|js|ts|tsx)/, ''),
  };
};

export const getBasePathInfo = (filename: string) => {
  filename = normalizeFilePath(filename);
  const componentName = filename.match(/.*\/([^/]+)\.(tsx|js)/)?.[1];
  return {
    apiUrl: `/base/api/${kebabCase(componentName)}`,
    demoUrl: filename.replace(/^.*\/data/, '').replace(/\/[^/]+\.(md|js|ts|tsx)/, ''),
  };
};
