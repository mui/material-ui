import path from 'path';
import { ProjectSettings } from 'buildApi';
import findApiPages from '../../utils/findApiPages';
import getBaseUiComponentInfo from './getBaseUiComponentInfo';
import getBaseUiHookInfo from './getBaseUiHookInfo';

const projectSettings: ProjectSettings = {
  output: {
    apiManifestPath: path.join(process.cwd(), 'docs/data/base/pagesApi.js'),
  },
  typeScriptProjects: ['base'],
  getApiPages: () => findApiPages('docs/pages/base-ui/api'),
  getComponentInfo: getBaseUiComponentInfo,
  getHookInfo: getBaseUiHookInfo,
};

export default projectSettings;
