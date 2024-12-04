import fs from 'fs';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import { getHeaders, getTitle } from '@mui/internal-markdown';
import {
  ComponentInfo,
  extractPackageFile,
  fixPathname,
  getApiPath,
  getSystemComponents,
  parseFile,
} from '@mui-internal/api-docs-builder/buildApiUtils';
import findPagesMarkdown from '@mui-internal/api-docs-builder/utils/findPagesMarkdown';
import { migratedBaseComponents } from './migratedBaseComponents';

export function getBaseUiDemos(name: string, filename?: string) {
  // resolve demos, so that we can getch the API url
  const allMarkdowns = findPagesMarkdown()
    .filter((markdown) => {
      if (migratedBaseComponents.some((component) => (filename ?? name).includes(component))) {
        return markdown.filename.match(/[\\/]data[\\/]base[\\/]/);
      }
      return true;
    })
    .map((markdown) => {
      const markdownContent = fs.readFileSync(markdown.filename, 'utf8');
      const markdownHeaders = getHeaders(markdownContent);

      return {
        ...markdown,
        markdownContent,
        components: markdownHeaders.components,
      };
    });

  return allMarkdowns
    .filter((page) => page.components.includes(name))
    .map((page) => ({
      demoPageTitle: getTitle(page.markdownContent),
      demoPathname: fixPathname(page.pathname),
    }));
}

export function getBaseUiComponentInfo(filename: string): ComponentInfo {
  const { name } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the component name from: ${filename}`);
  }

  const demos = getBaseUiDemos(name, filename);
  const apiPath = getApiPath(demos, name) || '';

  return {
    filename,
    name,
    muiName: name,
    apiPathname: apiPath,
    apiPagesDirectory: path.join(process.cwd(), `docs/pages/base-ui/api`),
    isSystemComponent: getSystemComponents().includes(name),
    readFile: () => {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getInheritance: (inheritedComponent = srcInfo?.inheritedComponent) => {
      if (!inheritedComponent) {
        return null;
      }
      return {
        name: inheritedComponent,
        apiPathname:
          inheritedComponent === 'Transition'
            ? 'https://reactcommunity.org/react-transition-group/transition/#Transition-props'
            : `/base-ui/api/${kebabCase(inheritedComponent)}/`,
      };
    },
    getDemos: () => demos,
  };
}
