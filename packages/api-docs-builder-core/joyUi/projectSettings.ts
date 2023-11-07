import path from 'path';
import { LANGUAGES } from 'docs/config';
import { ProjectSettings } from '@mui-internal/api-docs-builder';
import findApiPages from '@mui-internal/api-docs-builder/utils/findApiPages';
import { getJoyUiComponentInfo } from './getJoyUiComponentInfo';

export const projectSettings: ProjectSettings = {
  output: {
    apiManifestPath: path.join(process.cwd(), 'docs/data/joy/pagesApi.js'),
  },
  typeScriptProjects: [
    {
      name: 'joy',
      rootPath: path.join(process.cwd(), 'packages/mui-joy'),
      entryPointPath: 'src/index.ts',
    },
  ],
  getApiPages: () => findApiPages('docs/pages/joy-ui/api'),
  getComponentInfo: getJoyUiComponentInfo,
  translationLanguages: LANGUAGES,
  skipComponent(filename: string) {
    // Box's demo isn't ready
    // Container's demo isn't ready
    // GlobalStyles's demo isn't ready
    // Grid has problem with react-docgen
    return (
      filename.match(
        /(ThemeProvider|CssVarsProvider|Box|Container|ColorInversion|Grid|GlobalStyles)/,
      ) !== null
    );
  },
};
