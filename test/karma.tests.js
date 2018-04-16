// @flow weak

import './utils/performance';
import './utils/init';

const integrationContext = require.context('./integration', true, /\.js$/);
integrationContext.keys().forEach(integrationContext);

const unitContext = require.context('../src/', true, /\.test\.js$/);
unitContext.keys().forEach(unitContext);
