'use client';

import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

// When needed::: first argument is needed if you have common enterprise theme, and second argument is to override your enterprise theme.
// apply fonts to all other typography options like headings, subtitles, etc...
const defaultTheme = createTheme({
  palette: {
    primary: green,
  },
});

export default defaultTheme;
