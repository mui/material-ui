'use client';

import {createTheme, ThemeOptions} from '@mui/material/styles';

// When needed::: first argument is needed if you have your enterprise theme, and second argument is to override your enterprise theme.
const defaultTheme = createTheme({}, {} satisfies ThemeOptions);

export default defaultTheme;
