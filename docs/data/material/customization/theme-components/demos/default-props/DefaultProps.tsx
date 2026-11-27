import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The default props to change
        disableRipple: false, // The ripple is back, on the whole application 🌊!
      },
    },
  },
});

export default function DefaultProps() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Button>This button has ripples.</Button>
    </ThemeProvider>
    // @focus-end
  );
}
