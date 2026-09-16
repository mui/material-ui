/* eslint-disable no-restricted-imports -- This fixture tests a proposed generated package entry. */
import { Button, Slider } from '@mui/material/themes/brutalist';
import renderPage from '../renderPage';

renderPage({
  Button,
  Slider,
  title: 'Brutalist Button and Slider from the theme barrel',
  description:
    'Both components load automatically while their shared tokens and component foundations remain deduplicated.',
});
