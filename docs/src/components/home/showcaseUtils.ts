import { deepmerge } from '@material-ui/utils';
import { Theme, ThemeOptions } from '@material-ui/core/styles';

export const getMaterialThemeFrames = (theme: Theme) => {
  const frames: Array<ThemeOptions> = [
    {
      shape: {
        borderRadius: 12,
      },
    },
    {
      spacing: 10,
    },
    {
      shadows: [
        'none',
        '0px 4px 20px 0px hsla(210, 14%, 28%, 0.2)',
      ] as unknown as ThemeOptions['shadows'],
    },
    {
      typography: {
        fontFamily: '"IBM Plex Sans", sans-serif',
        fontWeightBold: 500,
      },
    },
    {
      palette: {
        background: {
          default:
            theme.palette.mode === 'dark' ? theme.palette.primaryDark[500] : theme.palette.grey[50],
        },
      },
    },
    {
      palette: {
        divider: theme.palette.divider,
      },
    },
    {
      palette: {
        primary: {
          main: theme.palette.primary.main,
        },
      },
    },
    {
      palette: {
        text: {
          primary: theme.palette.mode === 'dark' ? '#fff' : theme.palette.grey[900],
          secondary:
            theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[700],
        },
      },
    },
    {
      palette: {
        success: {
          main: '#1AA251',
          light: '#6AE79C',
        },
      },
    },
    {
      components: {
        MuiAvatar: {
          styleOverrides: {
            root: {
              width: 64,
              height: 64,
            },
          },
        },
      },
    },
    {
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              border: '1px solid',
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[500]
                  : theme.palette.grey[300],
            },
          },
        },
      },
    },
    {
      components: {
        MuiIconButton: {
          styleOverrides: {
            root: {
              border: '1px solid',
              borderColor: theme.palette.grey[200],
              color: theme.palette.grey[800],
              borderRadius: 10,
              '&:hover, &.Mui-focusVisible': {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
              },
            },
          },
        },
      },
    },
    {
      components: {
        MuiSwitch: {
          styleOverrides: {
            root: {
              width: 32,
              height: 20,
              padding: 0,
            },
            switchBase: {
              height: 20,
              width: 20,
              padding: 0,
              '&.Mui-checked + .MuiSwitch-track': {
                opacity: 1,
              },
              '&.Mui-checked': {
                transform: 'translateX(11px)',
                color: '#fff',
              },
            },
            track: {
              opacity: 1,
              borderRadius: 32,
              backgroundColor: 'rgb(179, 195, 211)',
            },
            thumb: {
              width: 14,
              height: 14,
            },
          },
        },
      },
    },
    {
      components: {
        MuiChip: {
          styleOverrides: {
            outlined: {
              backgroundColor: theme.palette.success[100],
              color: theme.palette.success[700],
              fontWeight: 500,
            },
          },
        },
      },
    },
  ];
  return frames;
};

export const produceThemeOptions = (themeFrames: Array<ThemeOptions>, frame: number) => {
  return themeFrames.slice(0, frame).reduce((result, current) => deepmerge(result, current), {});
};
