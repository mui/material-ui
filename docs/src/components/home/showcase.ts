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

const objectToCode = (obj: object | undefined) =>
  JSON.stringify(obj || {}, null, 2)
    .replace(/"(\w*)"/gm, '$1')
    .split('\n')
    .filter((line, i, array) => i !== 0 && i !== array.length - 1)
    .join('\n');

const prependSpace = (code: string, space: number = 0) =>
  code
    .split('\n')
    .map((line) => line.padStart(line.length + space, ' '))
    .join('\n');

export const productCode = (themeFrames: Array<ThemeOptions>, frame: number) => {
  // components should come later in themeFrames
  let themeRoot: Array<ThemeOptions> = [];
  let themeComponents: Array<ThemeOptions['components']> = [];
  themeFrames.forEach((themeOption) => {
    if (themeOption.components) {
      themeComponents.push(themeOption.components);
    } else {
      themeRoot.push(themeOption);
    }
  });
  themeRoot = themeRoot.slice(0, frame);
  themeComponents = themeComponents.slice(0, frame - themeRoot.length);
  const done = themeRoot.length + themeComponents.length === themeFrames.length;
  const themeRootCode = themeRoot.map(objectToCode).join(',\n');
  const themeComponentsCode = themeComponents.length
    ? `{
    components: {
${themeComponents
  .map(objectToCode)
  .map((code) => prependSpace(code, 4))
  .join(',\n')}
    ${
      done
        ? `}
  }`
        : ''
    }`
    : '';

  return themeRoot.length
    ? `import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
${themeRootCode}${themeComponentsCode.length ? ',' : ''}
  ${themeComponentsCode}
${done ? '})\n' : ''}`
    : '';
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
