import fs from 'fs';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import { getHeaders, getTitle } from '@mui/markdown';
import {
  ComponentInfo,
  extractPackageFile,
  fixPathname,
  getApiPath,
  getMuiName,
  getSystemComponents,
  parseFile,
} from '@mui-internal/api-docs-builder/buildApiUtils';
import findPagesMarkdown from '@mui-internal/api-docs-builder/utils/findPagesMarkdown';
import { migratedBaseComponents } from './migratedBaseComponents';

function findBaseDemos(
  componentName: string,
  pagesMarkdown: ReadonlyArray<{
    pathname: string;
    components: readonly string[];
    markdownContent: string;
  }>,
) {
  return pagesMarkdown
    .filter((page) => page.components.includes(componentName))
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

  // resolve demos, so that we can getch the API url
  const allMarkdowns = findPagesMarkdown()
    .filter((markdown) => {
      if (migratedBaseComponents.some((component) => filename.includes(component))) {
        return markdown.filename.match(/[\\/]data[\\/]base[\\/]/);
      }
      return true;
    })
    .map((markdown) => {
      const markdownContent = fs.readFileSync(markdown.filename, 'utf8');
      const markdownHeaders = getHeaders(markdownContent) as any;

      return {
        ...markdown,
        markdownContent,
        components: markdownHeaders.components as string[],
      };
    });

  const demos = findBaseDemos(name, allMarkdowns);
  const apiPath = getApiPath(demos, name);

  return {
    filename,
    name,
    muiName: getMuiName(name),
    apiPathname: apiPath ?? `/base-ui/api/${kebabCase(name)}/`,
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
            ? 'http://reactcommunity.org/react-transition-group/transition/#Transition-props'
            : `/base-ui/api/${kebabCase(inheritedComponent)}/`,
      };
    },
    getDemos: () => demos,
  };
}
