import startCase from 'lodash/startCase';
import camelCase from 'lodash/camelCase';
import { replaceComponentLinks } from '../src/modules/utils/replaceUrl';

export const productPathnames = {
  'material-ui': ['/getting-started', '/components', '/customization', '/guides', '/discover-more'],
  system: ['/system'],
  styles: ['/styles'],
} as const;

export const markdown = {
  removeDemoRelativePath: (content: string) =>
    content.replace(/"pages\/?[^"]*\/([^"]+\.js)"/gm, `"$1"`),
  updateMaterialTitle: (filePath: string, content: string) => {
    const match = filePath.match(/\/([^/]+).(ts|js|tsx|md|json|tsx\.preview)$/);
    if (!match) {
      return null;
    }
    let title = '';
    const component = match[1];
    if (component.startsWith('use')) {
      title = `${camelCase(component)} React Hook`;
    } else if (component === 'pickers') {
      title = `React Date,Time Pickers`;
    } else if (component === 'progress') {
      title = `React Circular,Linear Progress`;
    } else if (component.match(/^(material-icons|about-the-lab)$/)) {
      title = startCase(component);
    } else if (component.match(/(tabs|breadcrumbs|trap-focus)/)) {
      title = startCase(`React ${component}`);
    } else if (component.match(/(x|ch)es$/)) {
      title = startCase(`React ${component.replace(/(x|ch)es$/, '$1')}`);
    } else {
      title = startCase(`React ${component.replace(/s$/, '')}`);
    }

    return content.replace(/^title:[^\n]*$/, `title: ${title}`);
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
    directory: match[1].replace(
      'src/pages',
      product === 'material-ui' ? `data/${product}` : 'data',
    ),
    path: filePath.replace('src/pages', product === 'material-ui' ? `data/${product}` : 'data'),
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
      directory: match[1].replace('docs/pages/components', 'docs/pages/material-ui'),
      path: replaceComponentLinks(filePath),
    };
  }
  return {
    directory: match[1].replace('docs/pages', 'docs/pages/material-ui'),
    path: filePath.replace('docs/pages', 'docs/pages/material-ui'),
  };
};
