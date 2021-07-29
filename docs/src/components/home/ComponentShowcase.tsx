import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import { getDesignTokens } from 'docs/src/modules/brandingTheme';
import ReplayRounded from '@material-ui/icons/ReplayRounded';
import KeyboardArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import MarkdownElement from '../markdown/MarkdownElement';
import {
  useTimeframes,
  getMaterialThemeFrames,
  produceThemeOptions,
  productCode,
} from './showcase';
import MaterialDesignDemo, { demoCode as materialDemoCode } from './MaterialDesignDemo';
import FlashCode from './FlashCode';

const darkDesignTokens = getDesignTokens('dark');

let darkBrandingTheme = createTheme({
  ...darkDesignTokens,
  palette: {
    ...darkDesignTokens.palette,
    mode: 'dark',
  },
});

darkBrandingTheme = createTheme(darkBrandingTheme, {
  components: {
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
          fontSize: darkBrandingTheme.typography.pxToRem(14),
          lineHeight: 21 / 14,
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

const CodeToggle = ({ sx, ...props }: IconButtonProps) => {
  return (
    <IconButton size="small" {...props} sx={{ p: 0, ...sx }}>
      <KeyboardArrowDownRounded fontSize="small" />
    </IconButton>
  );
};

const defaultTheme = createTheme();

const ComponentShowcase = () => {
  const theme = useTheme();
  const [customized, setCustomized] = React.useState(false);
  const [customTheme, setCustomTheme] = React.useState(createTheme());
  const [importsOpen, setImportsOpen] = React.useState(false);
  const [themeCode, setThemeCode] = React.useState('');
  const [flashCodes, setFlashCodes] = React.useState<Array<{ startLine: number; endLine: number }>>(
    [],
  );
  const prevThemeCode = React.useRef('');
  const codeContainer = React.useRef<HTMLDivElement | null>(null);
  const themeFrames = React.useMemo(() => getMaterialThemeFrames(theme), [theme]);
  const { frame, done, rerun } = useTimeframes({ run: customized, maxFrame: themeFrames.length });

  React.useEffect(() => {
    if (frame === 1) {
      setFlashCodes([]);
      prevThemeCode.current = '';
    }
    const themeOptions = produceThemeOptions(themeFrames, frame);
    setCustomTheme(createTheme(themeOptions));
    setThemeCode(productCode(themeFrames, frame));
  }, [frame, themeFrames]);

  React.useEffect(() => {
    const prevCodeLength = prevThemeCode.current.split('\n').length;
    const newCodeLength = themeCode.split('\n').length;
    const offset = importsOpen ? materialDemoCode.imports.split('\n').length : 1;
    const startLine = prevCodeLength + offset - 1;
    const endLine = newCodeLength + offset - 1;
    if (codeContainer.current && themeCode && startLine !== endLine) {
      codeContainer.current.scrollTop = (startLine - 3) * 20 || 0;
    }
    setFlashCodes((current) => [...current, { startLine, endLine }]);
    prevThemeCode.current = themeCode;
  }, [themeCode, importsOpen]);

  const handleCustomTheme = () => {
    if (done) {
      rerun();
    } else {
      setCustomized(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          minHeight: 200,
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          bgcolor: theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100',
          borderColor: theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.300',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          '& *': {
            transition: '0.4s',
          },
        }}
      >
        <ThemeProvider theme={customized ? customTheme : defaultTheme}>
          <MaterialDesignDemo />
        </ThemeProvider>
      </Paper>
      <Box
        sx={{
          borderRadius: '0 0 10px 10px',
          p: 2,
          bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'primaryDark.700',
          flexGrow: 1,
        }}
      >
        <ThemeProvider theme={darkBrandingTheme}>
          <Box>
            <Button
              size="small"
              variant={customized ? 'text' : 'outlined'}
              onClick={() => setCustomized(false)}
            >
              Material Design
            </Button>
            <Button
              size="small"
              variant={customized ? 'outlined' : 'text'}
              onClick={handleCustomTheme}
              startIcon={done ? <ReplayRounded /> : null}
              sx={{ ml: 1 }}
            >
              {(() => {
                if (done) return 'Rerun';
                if (customized) return 'Customizing...';
                return 'Custom Theme';
              })()}
            </Button>
          </Box>
        </ThemeProvider>
        <Box
          ref={codeContainer}
          sx={{
            display: 'flex',
            maxWidth: '100%',
            my: 2,
            position: 'relative',
            overflow: 'auto',
            maxHeight: 500,
          }}
        >
          <CodeToggle
            sx={{
              position: 'absolute',
              transform: `rotate(${importsOpen ? '0deg' : '-90deg'})`,
              zIndex: 1,
            }}
            onClick={() => setImportsOpen((bool) => !bool)}
          />
          <Box sx={{ position: 'relative', flexGrow: 1, pl: 2 }}>
            {flashCodes.map((item, index) => (
              <FlashCode
                key={index}
                sx={{ left: 20, ...(index !== frame - 1 && { height: '0px' }) }}
                {...item}
              />
            ))}
            {importsOpen ? (
              <HighlightedCode
                component={MarkdownElement}
                code={materialDemoCode.imports}
                language="jsx"
              />
            ) : (
              <HighlightedCode component={MarkdownElement} code="import {...}" language="jsx" />
            )}
            {themeCode && (
              <React.Fragment>
                <Box height={20} />
                <HighlightedCode component={MarkdownElement} code={themeCode} language="jsx" />
              </React.Fragment>
            )}
            <Box height={20} />
            <HighlightedCode
              component={MarkdownElement}
              code={materialDemoCode.component(customized)}
              language="jsx"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ComponentShowcase;
