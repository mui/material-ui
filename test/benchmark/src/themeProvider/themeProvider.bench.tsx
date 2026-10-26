import * as React from 'react';
import { reactBenchmark } from '@mui/internal-benchmark/page';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const appTheme = createTheme({ cssVariables: true, colorSchemes: { light: true, dark: true } });
// Only changes component defaults, so its CSS variables are the same as the app theme's.
const sameVarsTheme = createTheme({
  cssVariables: true,
  colorSchemes: { light: true, dark: true },
  components: { MuiButton: { defaultProps: { disableElevation: true } } },
});
const promoTheme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: { palette: { primary: { main: '#9c27b0' } } },
    dark: { palette: { primary: { main: '#ce93d8' } } },
  },
});

function Buttons({ count }: { count: number }) {
  return Array.from({ length: count }, (_, index) => (
    <Button key={index} variant="contained">
      Button {index}
    </Button>
  ));
}

function Sections({ theme, count }: { theme: typeof appTheme; count: number }) {
  return Array.from({ length: count }, (_, index) => (
    <ThemeProvider key={index} theme={theme}>
      <Buttons count={5} />
    </ThemeProvider>
  ));
}

reactBenchmark('ThemeProvider root mount', () => (
  <ThemeProvider theme={appTheme}>
    <Buttons count={500} />
  </ThemeProvider>
));

reactBenchmark('ThemeProvider nested, same variables', () => (
  <ThemeProvider theme={appTheme}>
    <Sections theme={sameVarsTheme} count={100} />
  </ThemeProvider>
));

reactBenchmark('ThemeProvider nested, different variables', () => (
  <ThemeProvider theme={appTheme}>
    <Sections theme={promoTheme} count={100} />
  </ThemeProvider>
));
