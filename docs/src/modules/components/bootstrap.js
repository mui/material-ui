// Use the same helper as Babel to avoid bundle bloat.
import 'core-js/modules/es6.array.find-index';
import 'core-js/modules/es6.set';
import { install } from '@material-ui/styles';

// Disable auto highlighting
// https://github.com/PrismJS/prism/issues/765
if (process.browser) {
  window.Prism = window.Prism || {};
  window.Prism.manual = true;
}

install();
