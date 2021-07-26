import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FastForwardRounded from '@material-ui/icons/FastForwardRounded';
import FastRewindRounded from '@material-ui/icons/FastRewindRounded';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import PauseRounded from '@material-ui/icons/PauseRounded';

export default function PlayerCard() {
  const [paused, setPaused] = React.useState(false);
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
          background: {
            paper: mode === 'dark' ? '#003A75' : '#fff',
          },
          divider: mode === 'dark' ? '#132F4C' : '#E5E8EC',
          ...(mode === 'light' && {
            text: {
              primary: '#3D4752',
              secondary: '#5A6978',
            },
          }),
        },
        shape: {
          borderRadius: 8,
        },
        spacing: 10,
        typography: {
          fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(
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
                borderColor: mode === 'dark' ? '#132F4C' : '#fff',
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
                borderColor: mode === 'dark' ? '#132F4C' : '#E5E8EC',
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
      <Card variant="outlined" sx={{ display: 'flex', p: 1 }}>
        <Avatar
          sx={{ width: 100, height: 100 }}
          src="/static/images/cards/basement-beside-myself.jpg"
          variant="rounded"
        />
        <Box sx={{ alignSelf: 'center', mx: 2 }}>
          <Typography variant="body2" fontWeight={500}>
            Ultraviolet
          </Typography>
          <Typography component="div" variant="caption" color="text.secondary">
            Basement • Beside Myself
          </Typography>
          <Box sx={{ mt: 2 }}>
            <IconButton disabled>
              <FastRewindRounded />
            </IconButton>
            <IconButton sx={{ mx: 2 }} onClick={() => setPaused((val) => !val)}>
              {paused ? <PauseRounded /> : <PlayArrowRounded />}
            </IconButton>
            <IconButton disabled>
              <FastForwardRounded />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </ThemeProvider>
  );
}
