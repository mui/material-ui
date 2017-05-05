// @flow weak

import consoleError from './utils/consoleError';

consoleError();

const integrationContext = require.context('./integration', true, /\.js$/);
integrationContext.keys().forEach(integrationContext);

// Order the Hidden*.specs first.  Background here: https://github.com/callemall/material-ui/issues/6790
const hiddenUnitContext = require.context('../src/', true, /Hidden.*\.spec\.js$/);
// Gather all
const allUnitContext = require.context('../src/', true, /\.spec\.js$/);

// Create a unique set
const unitContextKeys = [...new Set(hiddenUnitContext.keys().concat(allUnitContext.keys()))];
unitContextKeys.forEach(allUnitContext);
