import path from 'path';

export const getComponentUrl = (filename: string) => {
  return filename
    .replace(new RegExp(`\\${path.sep}`, 'g'), '/')
    .replace(/^.*\/(products|pages)/, '')
    .replace(/\/[^/]+\.(md|js|ts|tsx)/, '');
};

export const getApiUrl = (filename: string) => {
  return getComponentUrl(filename).replace('components', 'api');
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
