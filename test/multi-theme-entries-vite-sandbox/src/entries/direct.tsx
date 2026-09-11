/* eslint-disable no-restricted-imports -- This fixture tests a proposed generated package entry. */
import Button from '@mui/material/themes/polished/Button';
import renderPage from '../renderPage';

renderPage({
  Button,
  title: 'Polished Button from a direct entry',
  description:
    'The component import automatically loads Polished Button CSS without loading Slider CSS.',
});
