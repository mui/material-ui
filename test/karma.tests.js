// https://github.com/airbnb/enzyme/issues/1792
import 'core-js/modules/es6.array.from';

import './utils/init';

const integrationContext = require.context(
  '../packages/material-ui/test/integration',
  true,
  /\.test\.js$/,
);
integrationContext.keys().forEach(integrationContext);

const coreUnitContext = require.context('../packages/material-ui/src/', true, /\.test\.js$/);
coreUnitContext.keys().forEach(coreUnitContext);

const labUnitContext = require.context('../packages/material-ui-lab/src/', true, /\.test\.js$/);
labUnitContext.keys().forEach(labUnitContext);
