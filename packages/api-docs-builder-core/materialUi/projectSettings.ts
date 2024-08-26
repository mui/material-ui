import path from 'path';
import { LANGUAGES } from 'docs/config';
import { ProjectSettings } from '@mui-internal/api-docs-builder';
import findApiPages from '@mui-internal/api-docs-builder/utils/findApiPages';
import {
  unstable_generateUtilityClass as generateUtilityClass,
  unstable_isGlobalState as isGlobalState,
} from '@mui/utils';
import { getMaterialUiComponentInfo } from './getMaterialUiComponentInfo';

export const projectSettings: ProjectSettings = {
  output: {
    apiManifestPath: path.join(process.cwd(), 'docs/data/material/pagesApi.js'),
  },
  typeScriptProjects: [
    {
      name: 'material',
      rootPath: path.join(process.cwd(), 'packages/mui-material'),
      entryPointPath: [
        'src/index.d.ts',
        'src/PigmentStack/PigmentStack.tsx',
        'src/PigmentContainer/PigmentContainer.tsx',
        'src/PigmentHidden/PigmentHidden.tsx',
        'src/PigmentGrid/PigmentGrid.tsx',
      ],
    },
    {
      name: 'lab',
      rootPath: path.join(process.cwd(), 'packages/mui-lab'),
      entryPointPath: 'src/index.d.ts',
    },
  ],
  getApiPages: () => findApiPages('docs/pages/material-ui/api'),
  getComponentInfo: getMaterialUiComponentInfo,
  translationLanguages: LANGUAGES,
  skipComponent(filename: string) {
    return (
      filename.match(
        /(ThemeProvider|CssVarsProvider|DefaultPropsProvider|InitColorSchemeScript)/,
      ) !== null
    );
  },
  translationPagesDirectory: 'docs/translations/api-docs',
  generateClassName: generateUtilityClass,
  isGlobalClassName: isGlobalState,
  // #default-branch-switch
  baseApiUrl: 'https://next.mui.com',
};
