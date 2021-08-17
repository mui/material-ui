import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

const primary = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  main: '#007FFF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
  1000: '#132F4C',
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

export default function NotificationCard() {
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
          ...(mode === 'light' && {
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }),
          grey,
          divider: mode === 'dark' ? primaryDark[400] : grey[200],
          success: {
            main: '#1DB45A',
          },
          background: {
            paper: mode === 'dark' ? primaryDark[700] : '#fff',
          },
        },
        shape: {
          borderRadius: 8,
        },
        spacing: 10,
        typography: {
          fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(
            ',',
          ),
          fontWeightRegular: 500,
        },
        components: {
          MuiAvatar: {
            styleOverrides: {
              root: {
                width: 40,
                height: 40,
              },
            },
          },
          MuiButtonBase: {
            defaultProps: {
              disableTouchRipple: true,
            },
          },
          MuiChip: {
            variants: [
              {
                props: { variant: 'notification' },
                style: { color: '#fff', fontSize: 12, height: 18 },
              },
            ],
          },
          MuiLinearProgress: {
            styleOverrides: {
              root: {
                borderRadius: 10,
                backgroundColor: 'rgba(255,255,255,0.12)',
              },
              bar: {
                borderRadius: 10,
                backgroundColor: '#fff',
              },
            },
          },
          MuiIconButton: {
            defaultProps: {
              size: 'small',
            },
            styleOverrides: {
              root: {
                border: '1px solid',
                borderColor: grey[200],
              },
            },
          },
          MuiSvgIcon: {
            defaultProps: {
              fontSize: 'small',
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Card variant="outlined" sx={{ display: 'flex', p: 1.5, maxWidth: 283 }}>
        <Avatar
          imgProps={{ 'aria-labelledby': 'demo-notification-card-messenger-name' }}
          src="/static/images/avatar/3.jpg"
          variant="rounded"
        />
        <Box sx={{ ml: 1, flexBasis: 180, flexGrow: 1, minWidth: '0px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              id="demo-notification-card-messenger-name"
              color="text.secondary"
              variant="caption"
            >
              Angela Erickson
            </Typography>
            <Typography color="text.secondary" variant="caption">
              12:50
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mt: 0.5 }}>
            <Box sx={{ flexGrow: 1, minWidth: '0px' }}>
              <Typography component="div">Great news</Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                Hey! Check this out, just a few minutes.
              </Typography>
            </Box>
            <Chip
              label="3"
              color="success"
              variant="notification"
              size="small"
              sx={{ mt: '3px' }}
            />
          </Box>
        </Box>
      </Card>
    </ThemeProvider>
  );
}
