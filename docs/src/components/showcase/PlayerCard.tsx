import * as React from 'react';
import { ThemeProvider, createTheme, useTheme, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import Popover from '@mui/material/Popover';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';

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

export default function PlayerCard({ theme: externalTheme }: { theme?: Theme }) {
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
          background: {
            paper: mode === 'dark' ? primaryDark[800] : '#fff',
          },
          divider: mode === 'dark' ? primaryDark[500] : grey[200],
          ...(mode === 'light' && {
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }),
          grey,
        },
        shape: {
          borderRadius: 8,
        },
        spacing: 10,
        typography: {
          fontFamily: ['IBM Plex Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(
            ',',
          ),
        },
        components: {
          MuiButtonBase: {
            defaultProps: {
              disableTouchRipple: true,
            },
          },
          MuiAvatar: {
            styleOverrides: {
              root: {
                border: '1px solid',
                borderColor: mode === 'dark' ? primaryDark[500] : '#fff',
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
                borderColor: mode === 'dark' ? primaryDark[500] : grey[200],
              },
            },
          },
          MuiSvgIcon: {
            defaultProps: {
              fontSize: 'small',
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
                border: `1px solid ${mode === 'dark' ? grey[800] : grey[200]}`,
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
    <ThemeProvider theme={externalTheme || theme}>
      <Fade in timeout={700}>
        <Card
          variant="outlined"
          sx={{ p: 1, display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <Box
            sx={{
              display: 'flex',
              mb: { xs: 1, sm: 0 },
              justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
          >
            <img
              alt="Beside Myself album cover"
              style={{ borderRadius: 5, objectFit: 'cover' }}
              src="/static/images/cards/basement-beside-myself.jpeg"
              width="124"
              height="124"
            />
          </Box>
          <Box sx={{ alignSelf: 'center', mx: 2 }}>
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{ textAlign: { xs: 'center', sm: 'start' } }}
            >
              Ultraviolet
            </Typography>
            <Typography
              component="div"
              variant="caption"
              color="text.secondary"
              sx={{ textAlign: { xs: 'center', sm: 'start' } }}
            >
              Basement • Beside Myself
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton aria-label="fast rewind" disabled>
                <FastRewindRounded />
              </IconButton>
              <IconButton aria-describedby={id} onClick={handleClick} size="small" sx={{ mx: 2 }}>
                <PlayArrowRounded />
              </IconButton>
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
                    Card component
                  </Typography>
                  <Typography sx={{ mt: 0.5, fontSize: 12 }}>
                    Visit the{' '}
                    <Link href="/components/cards/#customization">Card customization section</Link>{' '}
                    to learn how to customize it so it look lke this.
                  </Typography>
                </Box>
              </Popover>
              <IconButton aria-label="fast forward" disabled>
                <FastForwardRounded />
              </IconButton>
            </Box>
          </Box>
        </Card>
      </Fade>
    </ThemeProvider>
  );
}
