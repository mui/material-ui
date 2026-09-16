/* eslint-disable no-restricted-imports -- This PoC exercises the proposed public CSS subpaths. */
import '../reset.css';
import '../app.css';
import '../consumer-overrides.css';
// Each granular file is self-contained, so these imports intentionally share tokens.css.
import '@mui/material/css/themes/brutalist/button.css';
import '@mui/material/css/themes/brutalist/slider.css';
import renderApp from '../renderApp';

renderApp({
  id: 'brutalist',
  label: 'Brutalist',
  owner: 'Material UI',
  description: 'A library theme loaded through granular Button and Slider CSS entries.',
});
