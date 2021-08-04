import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReplayRounded from '@material-ui/icons/ReplayRounded';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import { getDesignTokens, getThemedComponents } from 'docs/src/modules/brandingTheme';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';
import MaterialDesignDemo, { demoCode as materialDemoCode } from './MaterialDesignDemo';
import ShowcaseContainer from './ShowcaseContainer';
import { getMaterialThemeFrames, produceThemeOptions } from './showcaseUtils';

const defaultTheme = createTheme();
const darkDesignTokens = getDesignTokens('dark');

let darkBrandingTheme = createTheme(darkDesignTokens);

darkBrandingTheme = createTheme(darkBrandingTheme, {
  components: {
    ...getThemedComponents(darkBrandingTheme).components,
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 40,
          padding: darkBrandingTheme.spacing(0.5, 1),
        },
        sizeSmall: {
          fontSize: darkBrandingTheme.typography.pxToRem(12),
          lineHeight: 18 / 12,
        },
        text: {
          color: darkBrandingTheme.palette.grey[400],
        },
        outlined: {
          color: '#fff',
          backgroundColor: darkBrandingTheme.palette.primary[700],
          borderColor: darkBrandingTheme.palette.primary[500],
          '&:hover': {
            backgroundColor: darkBrandingTheme.palette.primary[700],
          },
        },
      },
    },
  },
});

const CODES = [
  `const theme = createTheme({
  shape: {
    borderRadius: 10,
  },`,
  `
  spacing: 10,`,
  `
  shadows: [
    'none',
    '0px 4px 20px 0px hsla(210, 14%, 28%, 0.2)',
  ],`,
  `
  typography: {
    fontFamily: '"PlusJakartaSans", sans-serif',
    fontWeightBold: 500,
  },`,
  `
  palette: {
    background: {
      default: theme.palette.mode === 'dark' ? '#0A1929' : '#F3F6F9',
    },`,
  `
    primary: {
      main: theme.palette.primary.main,
    },`,
  `
    text: {
      primary: theme.palette.grey[900],
      secondary: theme.palette.grey[700],
    },`,
  `
    success: {
      main: '#1AA251',
      light: '#6AE79C',
    },
  },`,
  `
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 64,
          height: 64,
        },
      },
    },`,
  `
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid',
          borderColor: theme.palette.grey[300],
        },
      },
    },`,
  `
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
    },`,
  `
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
});`,
];

const noop = () => {};

function TypeWriter({
  step = 0,
  codes = CODES,
  onStepComplete = noop,
}: {
  step: number;
  codes: Array<string>;
  onStepComplete: (step: number) => void;
}) {
  const [result, setResult] = React.useState(``);
  const index = React.useRef(0);
  React.useEffect(() => {
    index.current = 0;
    if (step > 0) {
      // by line
      // const code = codes[step - 1].split('\n').map((text, i, array) => {
      //   if (i === array.length - 1) return text;
      //   return `${text}\n`;
      // });

      // by character
      let code = codes[step - 1].split('');
      code = code.reduce((final, curr) => {
        if (
          curr.match(/^\s*$/) &&
          final[final.length - 1] &&
          final[final.length - 1].match(/^\s*$/)
        ) {
          return [...final.slice(0, final.length - 1), `${final[final.length - 1]} `];
        }
        return [...final, curr];
      }, [] as Array<string>);

      const time = setInterval(() => {
        if (index.current <= code.length - 1) {
          setResult((current) => `${current}${code[index.current]}`);
        }
        index.current += 1;
        if (index.current >= code.length) {
          onStepComplete(step);
          clearInterval(time);
        }
      }, 50);
      return () => {
        clearInterval(time);
      };
    }
    setResult('');
    return () => {};
  }, [codes, step, onStepComplete]);
  return <HighlightedCode component={MarkdownElement} code={result} language="jsx" />;
}

export default function CoreShowcase() {
  const totalStep = 12;
  const theme = useTheme();
  const codeContainer = React.useRef<HTMLDivElement | null>(null);
  const [step, setStep] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [customized, setCustomized] = React.useState(false);
  const codeImports = materialDemoCode.imports(customized);
  const cursor = React.useRef(0);
  const themeFrames = React.useMemo(() => getMaterialThemeFrames(theme), [theme]);
  const [customTheme, setCustomTheme] = React.useState(defaultTheme);
  const updateTheme = React.useMemo(
    () =>
      function handleUpdateTheme(latestStep: number) {
        cursor.current += CODES[latestStep - 1].split('\n').length - 1;
        const themeOptions = produceThemeOptions(themeFrames, latestStep);
        setCustomTheme(createTheme(themeOptions));
        setTimeout(() => {
          setStep((current) => (current < totalStep ? current + 1 : current));
        }, 1500);
      },
    [themeFrames],
  );
  React.useEffect(() => {
    if (step === totalStep && customized) {
      const timeout = setTimeout(() => {
        setRunning(false);
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    }
    if (step === 0 && customized) {
      cursor.current = 0;
      setRunning(true);
      const time = setTimeout(() => {
        setStep(1);
      }, 200);
      return () => {
        clearTimeout(time);
      };
    }
    if (codeContainer.current) {
      codeContainer.current.scrollTop = (cursor.current + codeImports.split('\n').length - 1) * 20;
    }
    return () => {};
  }, [step, customized, codeImports]);
  React.useEffect(() => {
    if (customized) {
      setStep(0);
      setRunning(true);
      setCustomTheme(createTheme());
      const time = setTimeout(() => {
        setStep(1);
      }, 200);
      return () => {
        clearTimeout(time);
      };
    }
    return () => {};
  }, [customized]);
  return (
    <ShowcaseContainer
      preview={
        <ThemeProvider theme={customTheme}>
          <Box sx={{ minWidth: 300, width: '50%', maxWidth: '100%' }}>
            <MaterialDesignDemo />
          </Box>
        </ThemeProvider>
      }
      code={
        <ThemeProvider theme={darkBrandingTheme}>
          {running && (
            <LinearProgress
              variant="determinate"
              value={(100 / totalStep) * step}
              sx={{ flexShrink: 0 }}
            />
          )}
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', minHeight: 56 }}>
            {!running && (
              <React.Fragment>
                <Button
                  size="small"
                  variant={customized ? 'outlined' : 'text'}
                  onClick={() => {
                    setCustomized(true);
                  }}
                >
                  Custom Theme
                </Button>
                <Button
                  size="small"
                  variant={customized ? 'text' : 'outlined'}
                  onClick={() => {
                    setCustomized(false);
                  }}
                  sx={{ ml: 1 }}
                >
                  Material Design
                </Button>
                {customized && !running && (
                  <Button
                    size="small"
                    startIcon={<ReplayRounded fontSize="small" />}
                    sx={{ ml: 'auto' }}
                    onClick={() => {
                      setStep(0);
                    }}
                  >
                    Replay animation
                  </Button>
                )}
              </React.Fragment>
            )}
            {customized && running && (
              <Typography color="text.secondary" variant="body2">
                Animation is playing...
              </Typography>
            )}
          </Box>
          <Box ref={codeContainer} sx={{ px: 2, overflow: 'auto', flexGrow: 1 }}>
            <HighlightedCode component={MarkdownElement} code={codeImports} language="jsx" />
            {customized && <Box height={20} />}
            <TypeWriter step={step} codes={CODES} onStepComplete={updateTheme} />
            <Box height={20} />
            <HighlightedCode
              component={MarkdownElement}
              code={materialDemoCode.component(customized)}
              language="jsx"
            />
          </Box>
        </ThemeProvider>
      }
    />
  );
}
