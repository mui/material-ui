import { replaceComponentLinks } from '../src/modules/utils/replaceUrl';

export const productPathnames = {
  material: ['/getting-started', '/components', '/customization', '/guides', '/discover-more'],
  system: ['/system'],
  styles: ['/styles'],
} as const;

export const markdown = {
  removeDemoRelativePath: (content: string) =>
    content.replace(/"pages\/?[^"]*\/([^"]+\.js)"/gm, `"$1"`),
  addMaterialPrefixToLinks: (content: string) => {
    productPathnames.material.forEach((path) => {
      content = content.replace(
        new RegExp(`\\(${path}`, 'g'),
        `(/material${path.replace('/components/', '/react-')}`,
      );
    });
    return content;
  },
  addProductFrontmatter: (content: string, product: string) =>
    content.replace('---', `---\nproduct: ${product}`),
};

export const getNewDataLocation = (
  filePath: string,
  product: string,
): { directory: string; path: string } | null => {
  const match = filePath.match(/^(.*)\/[^/]+\.(ts|js|tsx|md|json|tsx\.preview)$/);
  if (!match) {
    return null;
  }
  return {
    directory: match[1].replace('src/pages', product === 'material' ? `data/${product}` : 'data'),
    path: filePath.replace('src/pages', product === 'material' ? `data/${product}` : 'data'),
  };
};

export const getNewPageLocation = (
  filePath: string,
): { directory: string; path: string } | null => {
  const match = filePath.match(/^(.*)\/[^/]+\.(ts|js|tsx|md|json|tsx\.preview)$/);
  if (!match) {
    return null;
  }
  if (filePath.match('pages/components')) {
    return {
      directory: match[1].replace('docs/pages/components', 'docs/pages/material'),
      path: replaceComponentLinks(filePath),
    };
  }
  return {
    directory: match[1].replace('docs/pages', 'docs/pages/material'),
    path: filePath.replace('docs/pages', 'docs/pages/material'),
  };
};
