// @flow weak

import consoleError from './utils/consoleError';
import enzyme from './utils/enzyme';

consoleError();
enzyme();

const integrationContext = require.context('./integration', true, /\.js$/);
integrationContext.keys().forEach(integrationContext);

const unitContext = require.context('../src/', true, /\.spec\.js$/);
unitContext.keys().forEach(unitContext);
