import '../reset.css';
import '../app.css';
import '../consumer-overrides.css';
// Each granular file is self-contained, so these imports intentionally share tokens.css.
import '../theme-imports/brutalist-button';
import '../theme-imports/brutalist-slider';
import renderApp from '../renderApp';

renderApp({
  id: 'brutalist',
  label: 'Brutalist',
  owner: 'Material UI',
  description: 'A library theme loaded through granular Button and Slider CSS entries.',
});
