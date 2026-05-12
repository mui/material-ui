import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
    },
  },
});

export default function GlobalThemeOverride() {
  // @focus-start @padding 1
  return (
    <ThemeProvider theme={theme}>
      <Button>font-size: 1rem</Button>
    </ThemeProvider>
  );
  // @focus-end
}
