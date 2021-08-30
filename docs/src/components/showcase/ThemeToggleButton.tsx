import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';

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
const primaryDark = {
  50: '#E2EDF8',
  100: '#CEE0F3',
  200: '#91B9E3',
  300: '#5090D3',
  400: '#265D97',
  500: '#1E4976',
  600: '#173A5E',
  700: '#132F4C',
  800: '#001E3C',
  900: '#0A1929',
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

export default function ThemeToggleButton() {
  const [lang, setLang] = React.useState('javascript');
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
          divider: mode === 'dark' ? primaryDark[500] : grey[200],
          grey,
        },
        typography: {
          fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(','),
        },
        shape: {
          borderRadius: 10,
        },
        components: {
          MuiButtonBase: {
            defaultProps: {
              disableTouchRipple: true,
            },
          },
          MuiToggleButtonGroup: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'dark' ? primaryDark[800] : '#fff',
              },
            },
          },
          MuiToggleButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                color: mode === 'dark' ? grey[300] : grey[700],
                borderColor: mode === 'dark' ? primaryDark[500] : grey[200],
                '&.Mui-selected': {
                  borderColor: `${primary[500]} !important`,
                  color: mode === 'dark' ? '#fff' : primary[500],
                  backgroundColor: mode === 'dark' ? primary[800] : primaryDark[50],
                },
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Fade in timeout={700}>
        <ToggleButtonGroup
          fullWidth
          color="primary"
          value={lang}
          exclusive
          onChange={(event, value) => setLang(value)}
          aria-label="language"
        >
          <ToggleButton value="javascript">Javascript</ToggleButton>
          <ToggleButton value="html">HTML</ToggleButton>
          <ToggleButton value="css">CSS</ToggleButton>
        </ToggleButtonGroup>
      </Fade>
    </ThemeProvider>
  );
}
