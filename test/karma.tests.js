// @flow weak

import './utils/performance';
import './utils/init';

const integrationContext = require.context('./integration', true, /\.js$/);
integrationContext.keys().forEach(integrationContext);

const unitContext = require.context('../src/', true, /\.spec\.js$/);
unitContext.keys().forEach(unitContext);
