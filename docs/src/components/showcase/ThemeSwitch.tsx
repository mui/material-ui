import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

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

export default function ThemeSwitch() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  /*
   * Note: this demo use `theme.palette.mode` from `useTheme` to make dark mode works in the documentation only.
   *
   * Normally, you would implement dark mode via internal state and/or system preference at the root of the application.
   * For more detail about toggling dark mode: https://mui.com/customization/palette/#toggling-color-mode
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
                backgroundColor: mode === 'dark' ? grey[800] : grey[400],
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
  const label = { inputProps: { 'aria-label': 'Themed Switch' } };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
        <Switch defaultChecked {...label} onClick={handleClick} />
        <Switch {...label} onClick={handleClick} />
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
              Switch component
            </Typography>
            <Typography sx={{ mt: 0.5, fontSize: 13 }} fontWeight={400}>
              Visit the{' '}
              <Link href="/components/cards/#customization">Switch customization section</Link> to
              learn how to customize it so it look lke this.
            </Typography>
          </Box>
        </Popover>
      </Box>
    </ThemeProvider>
  );
}
