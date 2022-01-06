export const productPathnames = {
  material: ['/getting-started', '/components', '/customization', '/guides', '/discover-more'],
  system: ['/system'],
  styles: ['/styles'],
} as const;

export const markdown = {
  removeDemoRelativePath: (content: string) =>
    content.replace(/"pages\/[/\-a-zA-Z]*\/([a-zA-Z]*\.js)"/gm, `"$1"`),
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

const nonComponents = ['about-the-lab'];

export const getNewPageLocation = (
  filePath: string,
): { directory: string; path: string } | null => {
  const match = filePath.match(/^(.*)\/[^/]+\.(ts|js|tsx|md|json|tsx\.preview)$/);
  if (!match) {
    return null;
  }
  if (filePath.includes('components')) {
    if (nonComponents.some((path) => filePath.includes(path))) {
      return {
        directory: match[1].replace('docs/pages/components', 'docs/pages/material'),
        path: filePath.replace('docs/pages/components/', 'docs/pages/material/'),
      };
    }
    return {
      directory: match[1].replace('docs/pages/components', 'docs/pages/material'),
      path: filePath.replace('docs/pages/components/', 'docs/pages/material/react-'),
    };
  }
  return {
    directory: match[1].replace('docs/pages', 'docs/pages/material'),
    path: filePath.replace('docs/pages', 'docs/pages/material'),
  };
};
