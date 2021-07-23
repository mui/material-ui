import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

const theme = createTheme({
  palette: {
    text: {
      primary: '#3D4752',
      secondary: '#8796A5',
    },
    success: {
      main: '#1DB45A',
    },
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
  return (
    <ThemeProvider theme={theme}>
      <Card variant="outlined" sx={{ display: 'flex', p: 1, maxWidth: 283 }}>
        <Avatar src="/static/images/avatar/3.jpg" variant="rounded" />
        <Box ml={1} flexBasis={180} flexGrow={1} minWidth="0px">
          <Box display="flex" justifyContent="space-between">
            <Typography color="text.secondary" variant="caption">
              Angela Erickson
            </Typography>
            <Typography color="text.secondary" variant="caption">
              12:50
            </Typography>
          </Box>
          <Box display="flex" mt={0.5}>
            <Box flexGrow={1} minWidth="0px">
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
