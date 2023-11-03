import path from 'path';
import { ProjectSettings } from 'buildApi';
import findApiPages from '../../utils/findApiPages';
import getMaterialUiComponentInfo from './getMaterialUiComponentInfo';

const projectSettings: ProjectSettings = {
  output: {
    apiManifestPath: path.join(process.cwd(), 'docs/data/material/pagesApi.js'),
  },
  typeScriptProjects: [
    {
      name: 'material',
      rootPath: path.join(process.cwd(), 'packages/mui-material'),
      entryPointPath: 'src/index.d.ts',
    },
    {
      name: 'lab',
      rootPath: path.join(process.cwd(), 'packages/mui-lab'),
      entryPointPath: 'src/index.d.ts',
    },
  ],
  getApiPages: () => findApiPages('docs/pages/material-ui/api'),
  getComponentInfo: getMaterialUiComponentInfo,
};

export default projectSettings;
