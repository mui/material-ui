/* eslint-disable no-restricted-imports -- This PoC exercises the proposed public CSS subpaths. */
import '../reset.css';
import '../app.css';
// Intentionally imported before the layered theme to prove that layer precedence beats order.
import '../consumer-overrides.css';
import '@mui/material/css/themes/polished/index.css';
import renderApp from '../renderApp';

renderApp({
  id: 'polished',
  label: 'Polished',
  owner: 'Material UI',
  description: 'A library theme loaded through its whole-theme CSS rollup.',
});
