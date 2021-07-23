import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary,
        },
        shape: {
          borderRadius: 8,
        },
        spacing: 10,
        typography: {
          fontFamily: [
            '"PlusJakartaSans"',
            '-apple-system',
            'BlinkMacSystemFont',
            'sans-serif',
          ].join(','),
          button: {
            textTransform: 'initial',
          },
        },
        components: {
          MuiButtonBase: {
            defaultProps: {
              disableTouchRipple: true,
            },
          },
          MuiTabs: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'dark' ? primary[800] : primary[500],
                borderRadius: 10,
                boxShadow:
                  '0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04)',
              },
              indicator: {
                backgroundColor: 'transparent',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  left: 20,
                  right: 20,
                  height: '100%',
                  backgroundColor: '#fff',
                },
              },
            },
          },
          MuiTab: {
            styleOverrides: {
              root: {
                color: mode === 'dark' ? primary[200] : primary[100],
                fontSize: '1rem',
                '&.Mui-selected': {
                  color: '#fff',
                },
              },
            },
          },
        },
      }),
    [mode],
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Tabs value={value} onChange={handleChange} aria-label="theme example">
        <Tab label="Yesterday" />
        <Tab label="Today" />
        <Tab label="Tomorrow" />
      </Tabs>
    </ThemeProvider>
  );
}
