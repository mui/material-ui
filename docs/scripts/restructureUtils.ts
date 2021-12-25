export const productPathnames = {
  material: [
    '/getting-started',
    '/components',
    '/api-docs',
    '/customization',
    '/guides',
    '/discover-more',
  ],
  system: ['/system'],
  styles: ['/styles'],
} as const;

export const markdown = {
  removeDemoRelativePath: (content: string) =>
    content.replace(/"pages\/[/\-a-zA-Z]*\/([a-zA-Z]*\.js)"/gm, `"$1"`),
  addMaterialPrefixToLinks: (content: string) => {
    productPathnames.material.forEach((path) => {
      content = content.replace(new RegExp(`\\(${path}`, 'g'), `(/material${path}`);
    });
    return content;
  },
  addProductFrontmatter: (content: string, product: string) =>
    content.replace('---', `---\nproduct: ${product}`),
};

export const refactorJsonContent = (content: string) => {
  let result = content;

  // i. add prefix to "demos" key
  result = result.replace(/href=\\"\/components/g, 'href=\\"/material/components');

  // ii. add prefix to "pathname" value
  result = result.replace(/"pathname": "\/api/g, '"pathname": "/material/api');

  return result;
};

export const getNewDataLocation = (
  filePath: string,
  product: string,
): { directory: string; path: string } | null => {
  const match = filePath.match(/^(.*)\/[^/]+\.(ts|js|tsx|md|json)$/);
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
  const match = filePath.match(/^(.*)\/[^/]+\.(ts|js|tsx|md|json)$/);
  if (!match) {
    return null;
  }
  return {
    directory: match[1].replace('docs/pages', 'docs/pages/material'),
    path: filePath.replace('docs/pages', 'docs/pages/material'),
  };
};
