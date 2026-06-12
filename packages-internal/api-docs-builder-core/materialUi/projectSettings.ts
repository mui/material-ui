import path from 'path';
import { LANGUAGES } from '@mui/internal-core-docs/constants';
import { ProjectSettings, findApiPages, toGitHubPath } from '@mui/internal-api-docs-builder';
import generateUtilityClass, { isGlobalState } from '@mui/utils/generateUtilityClass';
import { getMaterialUiComponentInfo } from './getMaterialUiComponentInfo';

const generateClassName = (componentName: string, slot: string, globalStatePrefix = 'Mui') => {
  if (componentName === 'MuiSwipeableDrawer') {
    // SwipeableDrawer uses Drawer classes without modifying them
    return generateUtilityClass('MuiDrawer', slot, globalStatePrefix);
  }

  return generateUtilityClass(componentName, slot, globalStatePrefix);
};

const getComponentImports = (name: string, filename: string) => {
  const githubPath = toGitHubPath(filename);
  const directory = githubPath.match(/\/packages\/mui-material\/src\/([^/]+)\//)?.[1];

  if (directory?.startsWith('MenuPreview')) {
    return [`import ${name} from '@mui/material/${directory}';`];
  }

  const rootImportPath = githubPath.replace(
    /\/packages\/mui(?:-(.+?))?\/src\/.*/,
    (match, pkg) => `@mui/${pkg}`,
  );

  const subdirectoryImportPath = githubPath.replace(
    /\/packages\/mui(?:-(.+?))?\/src\/([^\\/]+)\/.*/,
    (match, pkg, subdirectory) => `@mui/${pkg}/${subdirectory}`,
  );

  let namedImportName = name;
  const defaultImportName = name;

  if (githubPath.includes('Unstable_')) {
    namedImportName = `Unstable_${name} as ${name}`;
  }

  const useNamedImports = rootImportPath === '@mui/base';

  const subpathImport = useNamedImports
    ? `import { ${namedImportName} } from '${subdirectoryImportPath}';`
    : `import ${defaultImportName} from '${subdirectoryImportPath}';`;

  const rootImport = `import { ${namedImportName} } from '${rootImportPath}';`;

  return [subpathImport, rootImport];
};

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
        'src/MenuPreview/apiDocs.d.ts',
        'src/PigmentStack/PigmentStack.tsx',
        'src/PigmentContainer/PigmentContainer.tsx',
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
    return filename.match(/(ThemeProvider|CssVarsProvider|DefaultPropsProvider)/) !== null;
  },
  translationPagesDirectory: 'docs/translations/api-docs',
  getComponentImports,
  generateClassName,
  isGlobalClassName: isGlobalState,
  // #host-reference
  baseApiUrl: 'https://mui.com',
  pagesManifestPath: path.join(process.cwd(), 'docs/data/material/pages.ts'),
  nonComponentFolders: [
    'material/getting-started',
    'material/customization',
    'material/experimental-api',
    'material/guides',
    'material/integrations',
    'material/migration',
  ],
};
