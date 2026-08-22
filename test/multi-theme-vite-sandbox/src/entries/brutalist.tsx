/* eslint-disable no-restricted-imports -- This PoC exercises the proposed public CSS subpaths. */
import '../reset.css';
import '../app.css';
import '../consumer-overrides.css';
// Granular mode: each selected component CSS file brings its own tokens and base dependency.
import '@mui/material/css/themes/brutalist/button.css';
import '@mui/material/css/themes/brutalist/slider.css';
import renderApp from '../renderApp';

renderApp({
  id: 'brutalist',
  label: 'Brutalist',
  owner: 'Material UI',
  description: 'A library theme loaded through granular Button and Slider CSS entries.',
});
