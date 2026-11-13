'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  // The same layer order as globals.css. Material UI declares it before its first style.
  modularCssLayers: '@layer theme, base, mui, components, utilities;',
});

export default theme;
