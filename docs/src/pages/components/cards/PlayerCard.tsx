import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import FastForwardRounded from '@material-ui/icons/FastForwardRounded';
import FastRewindRounded from '@material-ui/icons/FastRewindRounded';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import PauseRounded from '@material-ui/icons/PauseRounded';

const theme = createTheme({
  shape: {
    borderRadius: 8,
  },
  spacing: 10,
  typography: {
    fontFamily: ['"PlusJakartaSans"', 'sans-serif'].join(','),
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
          border: '1px solid #fff',
        },
      },
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
          border: '1px solid #E5E8EC',
        },
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        fontSize: 'small',
      },
    },
  },
});

export default function PlayerCard() {
  const [paused, setPaused] = React.useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Card variant="outlined" sx={{ display: 'flex', p: 1 }}>
        <Avatar
          sx={{ width: 100, height: 100 }}
          src="/static/images/cards/basement-beside-myself.jpg"
          variant="rounded"
        />
        <Box alignSelf="center" mx={2}>
          <Typography color="grey.800" variant="body2" fontWeight={500}>
            Ultraviolet
          </Typography>
          <Typography component="div" variant="caption" color="text.secondary">
            Basement • Beside Myself
          </Typography>
          <Box mt={2}>
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
