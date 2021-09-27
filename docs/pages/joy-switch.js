import * as React from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import SwitchUnstyled from '@mui/core/SwitchUnstyled';
import JoySwitch from 'docs/src/joy/JoySwitch';
import ButtonBase from '@mui/material/ButtonBase';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: '9px 7px',
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(26px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 28,
    height: 28,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

export default function POCSwitch() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.50',
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(200px, 1fr))',
        }}
      >
        <Stack alignItems="center" spacing={3}>
          <ThemeProvider theme={createTheme()}>
            <Switch />
            <MaterialUISwitch defaultChecked />
            <Android12Switch defaultChecked />
            <IOSSwitch sx={{ m: 1 }} defaultChecked />
            <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
          </ThemeProvider>
        </Stack>
        <Stack alignItems="center" spacing={3}>
          <SwitchUnstyled />
          <JoySwitch />
          <JoySwitch sx={{ '--switch-track-radius': '20px' }} />
          <JoySwitch
            // components={{
            //   Thumb: ButtonBase, // how to make ripple work?
            // }}
            // componentsProps={{
            //   thumb: { disableTouchRipple: false },
            // }}
            sx={{
              '--switch-track-radius': '20px',
              '--switch-thumb-size': '20px',
              '--switch-track-width': '38px',
              '--switch-track-height': '14px',
              '--switch-thumb-shadow':
                '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
              '--switch-base-color': 'rgba(0,0,0,0.38)',
              '--switch-checked-color': '#1976d2',
              '&.Mui-checked': {
                '& .MuiSwitch-track': {
                  opacity: 0.5,
                },
                '& .MuiSwitch-thumb': {
                  backgroundColor: 'currentColor',
                },
              },
            }}
          />
          <JoySwitch
            sx={{
              '--switch-track-radius': '24px',
              '--switch-track-width': '48px',
              '--switch-track-height': '20px',
              '--switch-thumb-size': '32px',
              '--switch-thumb-shadow':
                '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
              '&.Mui-checked': {
                '& .MuiSwitch-track': {
                  backgroundColor: 'var(--switch-base-color)',
                },
                '& .MuiSwitch-thumb:before': {
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                  )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
              },
              '& .MuiSwitch-thumb': {
                backgroundColor: '#001e3c',
                width: 'var(--switch-thumb-size)',
                height: 'var(--switch-thumb-size)',
                '&:before': {
                  content: "''",
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  left: 0,
                  top: 0,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                  )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
                },
              },
            }}
          />
          <JoySwitch
            sx={{
              '--switch-track-radius': '20px',
              '--switch-track-width': '42px',
              '--switch-track-height': '22px',
              '--switch-thumb-size': '16px',
              '--switch-thumb-shadow':
                '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
              '--switch-checked-color': '#1976d2',
              px: 2,
              py: 1,
              '&.Mui-checked': {
                '& .MuiSwitch-track': {
                  opacity: 0.5,
                },
                '& .MuiSwitch-thumb': {
                  backgroundColor: 'currentColor',
                },
              },
              '& .MuiSwitch-track': {
                '&:before, &:after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 'var(--switch-thumb-size)',
                  height: 'var(--switch-thumb-size)',
                },
                '&:before': {
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    '#fff',
                  )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
                  left: 'var(--switch-thumb-offset)',
                },
                '&:after': {
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    '#fff',
                  )}" d="M19,13H5V11H19V13Z" /></svg>')`,
                  right: 'var(--switch-thumb-offset)',
                },
              },
            }}
          />
          <JoySwitch
            className="IOS"
            sx={{
              '--switch-track-radius': '20px',
              '--switch-track-width': '42px',
              '--switch-track-height': '26px',
              '--switch-thumb-size': '22px',
              '--switch-thumb-shadow':
                '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
              '--switch-base-color': '#E9E9EA',
              '--switch-checked-color': '#65C466',
            }}
          />
          <JoySwitch
            sx={{
              '--switch-track-radius': '8px',
              '--switch-track-width': '28px',
              '--switch-track-height': '16px',
              '--switch-thumb-size': '12px',
              '--switch-thumb-shadow':
                '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
              '&:active': {
                '--switch-thumb-width': '15px',
                '& .MuiSwitch-thumb': {
                  transition: 'width 0.1s',
                },
              },
            }}
          />
          <JoySwitch
            sx={{
              '--switch-track-height': '2px',
              '--switch-thumb-radius': '20px',
              '--switch-thumb-size': '20px',
            }}
          />
          <JoySwitch
            sx={{
              '--switch-track-height': '24px',
              '--switch-track-radius': '20px',
              '--switch-thumb-size': '16px',
              '& .MuiSwitch-track': {
                backgroundColor: 'unset',
                border: '2px solid',
                borderColor: 'currentColor',
              },
              '& .MuiSwitch-thumb': {
                boxShadow: 'none',
                backgroundColor: 'currentColor',
              },
            }}
          />
          <JoySwitch
            sx={{
              '--switch-track-width': '64px',
              '--switch-track-height': '24px',
              '--switch-track-radius': '12px',
              '--switch-thumb-size': '26px',
              px: 1,
              '& .MuiSwitch-thumb': {
                width: 40,
                boxShadow: 'var(--switch-thumb-shadow), 0 0 12px 0 rgba(0,0,0,0.12)',
              },
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}
