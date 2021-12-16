import path from 'path';
import kebabCase from 'lodash/kebabCase';

export const getComponentUrl = (filename: string) => {
  return filename
    .replace(new RegExp(`\\${path.sep}`, 'g'), '/')
    .replace(/^.*\/(products|pages)/, '')
    .replace(/\/[^/]+\.(md|js|ts|tsx)/, '');
};

export const getProductName = (filename: string) => {
  const normalized = filename.replace(new RegExp(`\\${path.sep}`, 'g'), '/');
  const packageMatch = normalized.match(/packages\/([^/]+)\//);
  const packageName = packageMatch?.[1] ?? '';
  return packageName.replace('mui-', '');
};

export const getApiUrl = (filename: string) => {
  const normalized = filename.replace(new RegExp(`\\${path.sep}`, 'g'), '/');
  const componentName = normalized.match(/.*\/([^/]+)\.(tsx|js)/)?.[1];
  return `/${getProductName(filename)}/api/${kebabCase(componentName)}`;
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
