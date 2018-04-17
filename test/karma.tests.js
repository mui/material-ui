// @flow weak

import './utils/performance';
import './utils/init';

const integrationContext = require.context(
  '../packages/material-ui/test/integration',
  true,
  /\.test\.js$/,
);
integrationContext.keys().forEach(integrationContext);

const unitContext = require.context('../packages/material-ui/src/', true, /\.test\.js$/);
unitContext.keys().forEach(unitContext);
