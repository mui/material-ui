import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        h1 {
          color: grey;
        }
      `,
    },
  },
});

export default function OverrideCssBaseline() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>Grey h1 element</h1>
    </ThemeProvider>
  );
}
