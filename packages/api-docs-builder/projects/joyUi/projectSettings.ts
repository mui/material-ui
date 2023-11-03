import path from 'path';
import { ProjectSettings } from 'buildApi';
import findApiPages from '../../utils/findApiPages';
import getJoyUiComponentInfo from './getJoyUiComponentInfo';

const projectSettings: ProjectSettings = {
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
};

export default projectSettings;
