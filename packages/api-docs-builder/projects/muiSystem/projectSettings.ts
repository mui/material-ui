import path from 'path';
import { LANGUAGES } from 'docs/config';
import { ProjectSettings } from '../../buildApi';
import findApiPages from '../../utils/findApiPages';
import getSystemComponentInfo from './getSystemComponentInfo';

const muiSystemSettings: ProjectSettings = {
  output: {
    apiManifestPath: path.join(process.cwd(), 'docs/data/system/pagesApi.js'),
  },
  typeScriptProjects: [
    {
      name: 'system',
      rootPath: path.join(process.cwd(), 'packages/mui-system'),
      entryPointPath: 'src/index.d.ts',
    },
  ],
  getApiPages: () => findApiPages('docs/pages/system/api'),
  getComponentInfo: getSystemComponentInfo,
  languages: LANGUAGES,
};

export default muiSystemSettings;
