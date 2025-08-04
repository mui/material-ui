import fs from 'fs';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import { getHeaders, getTitle } from '@mui/internal-markdown';
import {
  ComponentInfo,
  extractPackageFile,
  fixPathname,
  getMuiName,
  getSystemComponents,
  parseFile,
} from '@mui-internal/api-docs-builder/buildApiUtils';
import findPagesMarkdown from '@mui-internal/api-docs-builder/utils/findPagesMarkdown';

export function getJoyUiComponentInfo(filename: string): ComponentInfo {
  const { name } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the component name from: ${filename}`);
  }
  return {
    filename,
    name,
    muiName: getMuiName(name),
    apiPathname: `/joy-ui/api/${kebabCase(name)}/`,
    apiPagesDirectory: path.join(process.cwd(), `docs/pages/joy-ui/api`),
    isSystemComponent: getSystemComponents().includes(name),
    readFile: () => {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getInheritance: (inheritedComponent = srcInfo?.inheritedComponent) => {
      if (!inheritedComponent || inheritedComponent.match(/unstyled/i)) {
        return null;
      }

      const urlComponentName = kebabCase(inheritedComponent.replace(/unstyled/i, ''));

      // `inheritedComponent` node is coming from test files.
      // `inheritedComponent` must include `Unstyled` suffix for parser to recognise that the component inherits Base UI component
      // e.g., Joy UI Menu inherits Base UI Popper, and its test file uses the name `PopperUnstyled` so that we can recognise here that
      // Joy UI Menu is inheriting a base component. In terms of documentation, we should no longer use the name `PopperUnstyled`, and hence
      // we remove the suffix here.
      return {
        name: inheritedComponent,
        apiPathname: `/joy-ui/api/${urlComponentName}/`,
      };
    },
    getDemos: () => {
      const allMarkdowns = findPagesMarkdown().map((markdown) => {
        const markdownContent = fs.readFileSync(markdown.filename, 'utf8');
        const markdownHeaders = getHeaders(markdownContent);

        return {
          ...markdown,
          markdownContent,
          components: markdownHeaders.components,
        };
      });
      return allMarkdowns
        .filter((page) => page.pathname.startsWith('/joy') && page.components.includes(name))
        .map((page) => ({
          filePath: page.filename, // pathname of the markdown file
          demoPageTitle: getTitle(page.markdownContent),
          demoPathname: fixPathname(page.pathname),
        }));
    },
  };
}
