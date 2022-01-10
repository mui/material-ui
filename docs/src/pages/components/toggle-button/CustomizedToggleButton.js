import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import Fade from '@mui/material/Fade';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const primary = {
  500: '#007FFF',
  800: '#004C99',
};
const primaryDark = {
  50: '#E2EDF8',
  500: '#1E4976',
  800: '#001E3C',
};
const grey = {
  200: '#E0E3E7',
  300: '#CDD2D7',
  700: '#3E5060',
};

export default function ThemeToggleButton() {
  const [lang, setLang] = React.useState('javascript');
  /*
   * Note: this demo use `theme.palette.mode` from `useTheme` to make dark mode work in MUI's documentation only.
   *
   * Normally, you would implement dark mode via internal state and/or system preference at the root of the application.
   * For more details about toggling modes, go to: https://mui.com/customization/palette/#toggling-color-mode
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
          fontFamily: [
            'IBM Plex Sans',
            '-apple-system',
            'BlinkMacSystemFont',
            'sans-serif',
          ].join(','),
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
                fontWeight: 500,
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
          color="primary"
          fullWidth
          value={lang}
          exclusive
          onChange={(event, value) => setLang(value)}
          aria-label="language"
        >
          <ToggleButton value="javascript">React</ToggleButton>
          <ToggleButton value="html">TypeScript</ToggleButton>
          <ToggleButton value="css">CSS</ToggleButton>
        </ToggleButtonGroup>
      </Fade>
    </ThemeProvider>
  );
}
