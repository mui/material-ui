// https://github.com/airbnb/enzyme/issues/1792
import 'core-js/modules/es6.array.from';

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
