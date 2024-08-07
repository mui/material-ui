import '@mui/internal-test-utils/init';
import '@mui/internal-test-utils/setupKarma';

const materialIntegrationContext = require.context(
  '../packages/mui-material/test/integration',
  true,
  /\.test\.(js|ts|tsx)$/,
);
materialIntegrationContext.keys().forEach(materialIntegrationContext);

const materialUnitContext = require.context(
  '../packages/mui-material/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
materialUnitContext.keys().forEach(materialUnitContext);

const labUnitContext = require.context('../packages/mui-lab/src/', true, /\.test\.(js|ts|tsx)$/);
labUnitContext.keys().forEach(labUnitContext);

const styledEngineContext = require.context(
  '../packages/mui-styled-engine/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
styledEngineContext.keys().forEach(styledEngineContext);

const styledEngineSCContext = require.context(
  '../packages/mui-styled-engine-sc/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
styledEngineSCContext.keys().forEach(styledEngineSCContext);

const systemContext = require.context('../packages/mui-system/src/', true, /\.test\.(js|ts|tsx)$/);
systemContext.keys().forEach(systemContext);

const baseUnitContext = require.context('../packages/mui-base/src/', true, /\.test\.(js|ts|tsx)$/);
baseUnitContext.keys().forEach(baseUnitContext);

const utilsContext = require.context('../packages/mui-utils/src/', true, /\.test\.(js|ts|tsx)$/);
utilsContext.keys().forEach(utilsContext);

const joyContext = require.context('../packages/mui-joy/src', true, /\.test\.(js|ts|tsx)$/);
joyContext.keys().forEach(joyContext);
