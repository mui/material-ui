// https://reactjs.org/docs/javascript-environment-requirements.html
import 'core-js/es6/map';
import 'core-js/es6/set';
// https://github.com/airbnb/enzyme/issues/1792
import 'core-js/modules/es6.array.from';
// babel transpiles a lot of iterators assuming Symbol is available. Mostly prevalent
// testing related libraries. It's dangerous to polyfill it but better than not
// testing at all
import 'core-js/es6/symbol';

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
