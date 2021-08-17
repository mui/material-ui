import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';

const primary = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};
const grey = {
  50: '#F3F6F9',
  100: '#EAEEF3',
  200: '#E5E8EC',
  300: '#D7DCE1',
  400: '#BFC7CF',
  500: '#AAB4BE',
  600: '#96A3B0',
  700: '#8796A5',
  800: '#5A6978',
  900: '#3D4752',
};

export default function ThemeSwitch() {
  /*
   * Note: this demo use `theme.palette.mode` from `useTheme` to make dark mode works in the documentation only.
   *
   * Normally, you would implement dark mode via internal state and/or system preference at the root of the application.
   * For more detail about toggling dark mode: https://next.material-ui.com/customization/palette/#toggling-color-mode
   */
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary,
        },
        components: {
          MuiSwitch: {
            styleOverrides: {
              root: {
                width: 32,
                height: 20,
                padding: 0,
              },
              switchBase: {
                padding: 3,
                color: '#fff',
                '&.Mui-checked': {
                  transform: 'translateX(12px)',
                  color: '#fff',
                  '& + .MuiSwitch-track': {
                    opacity: 1,
                  },
                },
              },
              thumb: {
                padding: 0,
                height: 14,
                width: 14,
                boxShadow: 'none',
              },
              track: {
                borderRadius: 20,
                opacity: 1,
                backgroundColor: grey[400],
              },
            },
          },
        },
      }),
    [mode],
  );
  const label = { inputProps: { 'aria-label': 'Themed Switch' } };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
        <Switch defaultChecked {...label} />
        <Switch {...label} />
      </Box>
    </ThemeProvider>
  );
}
