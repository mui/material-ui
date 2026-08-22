/* eslint-disable no-restricted-imports -- This PoC exercises the proposed public CSS subpaths. */
import '../reset.css';
import '../app.css';
import '../consumer-overrides.css';
// A custom theme explicitly selects the library's public foundational CSS.
import '@mui/material/css/tokens.css';
import '@mui/material/css/base/button.css';
import '@mui/material/css/base/slider.css';
import '../consumer-theme/index.css';
import renderApp from '../renderApp';

renderApp({
  id: 'ocean',
  label: 'Ocean',
  owner: 'Consumer',
  description: 'An app-owned theme built on Material UI tokens and component base CSS.',
});
