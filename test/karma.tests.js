import './utils/init';
import './utils/setupKarma';

const integrationContext = require.context(
  '../packages/mui-material/test/integration',
  true,
  /\.test\.(js|ts|tsx)$/,
);
integrationContext.keys().forEach(integrationContext);

const coreUnitContext = require.context(
  '../packages/mui-material/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
coreUnitContext.keys().forEach(coreUnitContext);

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

const coreContext = require.context('../packages/mui-core/src/', true, /\.test\.(js|ts|tsx)$/);
coreContext.keys().forEach(coreContext);

const utilsContext = require.context('../packages/mui-utils/src/', true, /\.test\.(js|ts|tsx)$/);
utilsContext.keys().forEach(utilsContext);

const materialNextContext = require.context(
  '../packages/mui-material-next/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
materialNextContext.keys().forEach(materialNextContext);
