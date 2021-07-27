import * as React from 'react';
import { deepmerge } from '@material-ui/utils';
import { Theme, ThemeOptions } from '@material-ui/core/styles';

export const getMaterialThemeFrames = (theme: Theme) => {
  const frames = [
    {
      shape: {
        borderRadius: 10,
      },
      spacing: 10,
    },
    {
      shadows: [
        'none',
        '0px 1px 8px rgba(170, 180, 190, 0.1)',
        '0px 2px 12px rgba(170, 180, 190, 0.16)',
        '0px 3px 16px rgba(170, 180, 190, 0.2)',
        '1px 1px 20px 0 rgb(61 71 82 / 10%)',
      ],
    },
    {
      typography: {
        fontFamily: '"PlusJakartaSans", sans-serif',
        fontWeightBold: 500,
      },
    },
    {
      palette: {
        primary: {
          main: theme.palette.primary.main,
        },
        text: {
          primary: theme.palette.grey[900],
          secondary: theme.palette.grey[700],
        },
        grey: {
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
              borderColor: theme.palette.grey[300],
            },
          },
        },
      },
    },
    {
      components: {
        MuiChip: {
          styleOverrides: {
            root: {
              borderRadius: 4,
            },
          },
          variants: [
            {
              props: { color: 'success' },
              style: {
                color: theme.palette.success.main,
                backgroundColor: theme.palette.success[100],
                '&:hover, &.Mui-focusVisible': {
                  backgroundColor: theme.palette.success[200],
                },
              },
            },
          ],
        },
      },
    },
    {
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 20,
            },
            outlined: {
              borderColor: theme.palette.grey[200],
              color: theme.palette.grey[800],
              '&:hover, &.Mui-focusVisible': {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.primary[50],
              },
            },
            sizeSmall: {
              padding: '4px 10px',
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
              '&:hover, &.Mui-focusVisible': {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
              },
            },
          },
        },
      },
    },
  ];
  return frames as Array<ThemeOptions>;
};

export const produceThemeOptions = (themeFrames: Array<ThemeOptions>, frame: number) => {
  return themeFrames.slice(0, frame).reduce((result, current) => deepmerge(result, current), {});
};

interface TimeframeOptions {
  run: boolean;
  maxFrame: number;
  speed?: number;
  onDone?: () => void;
}

function noop() {}

export const useTimeframes = (options: TimeframeOptions) => {
  const { run, speed = 1200, maxFrame, onDone = noop } = options;
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    if (run) {
      setFrame(1);
    } else {
      setFrame(0);
    }
  }, [run]);

  React.useEffect(() => {
    if (run && frame < maxFrame) {
      const timeout = setTimeout(() => {
        setFrame((currentStep) => currentStep + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
    if (run && frame === maxFrame) {
      onDone();
    }
    return () => {};
  }, [run, speed, maxFrame, frame, onDone]);

  return {
    frame,
    done: frame === maxFrame,
    rerun: () => setFrame(1),
    setFrame,
  };
};
