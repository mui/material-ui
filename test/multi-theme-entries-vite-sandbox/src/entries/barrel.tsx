/* eslint-disable no-restricted-imports -- This fixture tests a proposed generated package entry. */
import { Button } from '@mui/material/themes/polished';
import renderPage from '../renderPage';

renderPage({
  Button,
  title: 'Polished Button from the theme barrel',
  description:
    'The barrel is the convenience path and automatically loads the complete Polished theme.',
});
