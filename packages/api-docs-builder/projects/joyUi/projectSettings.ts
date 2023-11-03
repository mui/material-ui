import path from 'path';
import { ProjectSettings } from 'buildApi';
import findApiPages from '../../utils/findApiPages';
import getJoyUiComponentInfo from './getJoyUiComponentInfo';

const projectSettings: ProjectSettings = {
  output: {
    apiManifestPath: path.join(process.cwd(), 'docs/data/joy/pagesApi.js'),
  },
  typeScriptProjects: ['joy'],
  getApiPages: () => findApiPages('docs/pages/joy-ui/api'),
  getComponentInfo: getJoyUiComponentInfo,
};

export default projectSettings;
