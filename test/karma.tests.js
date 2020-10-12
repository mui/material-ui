import './utils/init';

const integrationContext = require.context(
  '../packages/material-ui/test/integration',
  true,
  /\.test\.(js|ts|tsx)$/,
);
integrationContext.keys().forEach(integrationContext);

const coreUnitContext = require.context(
  '../packages/material-ui/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
coreUnitContext.keys().forEach(coreUnitContext);

const labUnitContext = require.context(
  '../packages/material-ui-lab/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
labUnitContext.keys().forEach(labUnitContext);
