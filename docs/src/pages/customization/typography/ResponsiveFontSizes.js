import * as React from 'react';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import Typography from '@mui/material/Typography';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function ResponsiveFontSizes() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography variant="h3">Responsive h3</Typography>
        <Typography variant="h4">Responsive h4</Typography>
        <Typography variant="h5">Responsive h5</Typography>
      </ThemeProvider>
    </div>
  );
}
