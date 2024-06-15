import path from 'path';
import { LANGUAGES } from 'docs/config';
import { ProjectSettings } from '@mui-internal/api-docs-builder';
import findApiPages from '@mui-internal/api-docs-builder/utils/findApiPages';
import {
  unstable_generateUtilityClass as generateUtilityClass,
  unstable_isGlobalState as isGlobalState,
} from '@mui/utils';
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
    // Container's demo isn't ready
    // GlobalStyles's demo isn't ready
    return (
      filename.match(
        /(ThemeProvider|CssVarsProvider|Container|ColorInversion|GlobalStyles|InitColorSchemeScript)/,
      ) !== null
    );
  },
  translationPagesDirectory: 'docs/translations/api-docs-joy',
  generateClassName: generateUtilityClass,
  isGlobalClassName: isGlobalState,
};
