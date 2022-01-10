import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import Fade from '@mui/material/Fade';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const primary = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  main: '#007FFF',
  500: '#007FFF',
  600: '#0072E5', // vs blueDark 900: WCAG 4.6 AAA (large), APCA 36 Not for reading text
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
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7', // vs blueDark 900: WCAG 11.6 AAA, APCA 78 Best for text
  400: '#B2BAC2', // vs blueDark 900: WCAG 9 AAA, APCA 63.3 Ok for text
  500: '#A0AAB4', // vs blueDark 900: WCAG 7.5 AAA, APCA 54.3 Only for large text
  600: '#6F7E8C', // vs white bg: WCAG 4.1 AA, APCA 68.7 Ok for text
  700: '#3E5060', // vs white bg: WCAG 8.3 AAA, APCA 88.7 Best for text
  800: '#2D3843', // vs white bg: WCAG 11.9 AAA, APCA 97.3 Best for text
  900: '#1A2027',
};

export default function ThemeToggleButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
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
          fontFamily: ['IBM Plex Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(
            ',',
          ),
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
          MuiLink: {
            styleOverrides: {
              root: {
                color: mode === 'dark' ? primary[300] : primary[700],
              },
            },
          },
          MuiPopover: {
            styleOverrides: {
              paper: {
                mt: 0.5,
                minWidth: 160,
                elevation: 0,
                color: mode === 'dark' ? grey[100] : grey[900],
                backgroundImage: 'none',
                backgroundColor: mode === 'dark' ? grey[900] : '#fff',
                boxShadow: `0px 4px 20px ${
                  mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(170, 180, 190, 0.3)'
                }`,
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
          <ToggleButton value="javascript" onClick={handleClick}>
            React
          </ToggleButton>
          <ToggleButton value="html" onClick={handleClick}>
            TypeScript
          </ToggleButton>
          <ToggleButton value="css" onClick={handleClick}>
            CSS
          </ToggleButton>
          <Popover
            id={id}
            sx={{
              mt: 0.5,
            }}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box sx={{ p: 1, maxWidth: 320 }}>
              <Typography variant="body2" fontWeight={500}>
                Toggle Button component
              </Typography>
              <Typography sx={{ mt: 0.5, fontSize: 13 }}>
                Visit the{' '}
                <Link href="/components/toggle-button/#customization">
                  Toggle Button customization section
                </Link>{' '}
                to learn how to customize it so it look lke this.
              </Typography>
            </Box>
          </Popover>
        </ToggleButtonGroup>
      </Fade>
    </ThemeProvider>
  );
}
