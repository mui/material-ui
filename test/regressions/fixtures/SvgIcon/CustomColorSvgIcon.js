import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';

function FavoriteRounded(props) {
  return (
    <SvgIcon {...props}>
      <path d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29 2.64-1.8 5.9-.96 7.66 1.1 1.76-2.06 5.02-2.91 7.66-1.1 1.41.96 2.28 2.59 2.34 4.29.14 3.88-3.3 6.99-8.55 11.76l-.1.09z" />
    </SvgIcon>
  );
}

export default function CustomColorSvgIcon() {
  const theme = createTheme({
    palette: {
      custom: { main: '#ec407a' },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <FavoriteRounded fontSize="large" />
      <FavoriteRounded fontSize="large" color="secondary" />
      <FavoriteRounded fontSize="large" color="custom" />
    </ThemeProvider>
  );
}
