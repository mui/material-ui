import * as React from 'react';
import { ThemeProvider, createTheme, ThemeOptions } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import brandingTheme, { brandingDesignTokens } from 'docs/src/modules/brandingTheme';
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

const darkBrandingTheme = createTheme({
  ...brandingDesignTokens,
  palette: {
    ...brandingDesignTokens.palette,
    background: {
      paper: brandingDesignTokens.palette.primary[900],
    },
    mode: 'dark',
  },
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
          padding: brandingTheme.spacing(0.5, 1),
        },
        sizeSmall: {
          fontSize: brandingTheme.typography.pxToRem(14),
          lineHeight: 21 / 14,
        },
        text: {
          color: brandingTheme.palette.grey[400],
        },
        outlined: {
          color: '#fff',
          backgroundColor: brandingTheme.palette.primary[700],
          borderColor: brandingTheme.palette.primary[500],
          '&:hover': {
            backgroundColor: brandingTheme.palette.primary[700],
          },
        },
      },
    },
  },
} as ThemeOptions);

const defaultTheme = createTheme();

const CodeToggle = ({ sx, ...props }: IconButtonProps) => {
  return (
    <IconButton size="small" {...props} sx={{ p: 0, ...sx }}>
      <KeyboardArrowDownRounded fontSize="small" />
    </IconButton>
  );
};

const ComponentShowcase = () => {
  const [customized, setCustomized] = React.useState(false);
  const [customTheme, setCustomTheme] = React.useState(createTheme());
  const [importsOpen, setImportsOpen] = React.useState(false);
  const [themeCode, setThemeCode] = React.useState('');
  const [flashCodes, setFlashCodes] = React.useState<Array<{ startLine: number; endLine: number }>>(
    [],
  );
  const prevThemeCode = React.useRef('');
  const codeContainer = React.useRef<HTMLDivElement | null>(null);
  const themeFrames = React.useMemo(() => getMaterialThemeFrames(brandingTheme), []);
  const { frame, done, rerun } = useTimeframes({ run: customized, maxFrame: themeFrames.length });

  React.useEffect(() => {
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
    if (codeContainer.current && themeCode) {
      codeContainer.current.scrollTop = (startLine + offset - 3) * 20 || 0;
    }
    setFlashCodes((current) => [...current, { startLine, endLine }]);
    prevThemeCode.current = themeCode;
  }, [themeCode, importsOpen]);

  const handleCustomTheme = () => {
    setFlashCodes([]);
    setThemeCode('');
    prevThemeCode.current = '';
    if (done) {
      rerun();
    } else {
      setCustomized(true);
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'grey.100',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          minHeight: 200,
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          '& *': {
            transition: '0.4s',
          },
        }}
      >
        <ThemeProvider theme={customized ? customTheme : defaultTheme}>
          <MaterialDesignDemo />
        </ThemeProvider>
      </Box>
      <ThemeProvider theme={darkBrandingTheme}>
        <Box
          borderRadius={'0 0 10px 10px'}
          p={2}
          m={'-1px'}
          bgcolor="background.paper"
          flexGrow={1}
        >
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
                  sx={{ left: 20, ...(index !== frame && { height: '0px' }) }}
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
                code={materialDemoCode.component}
                language="jsx"
              />
            </Box>
          </Box>
          {/* <Box position="relative">

            <Box
              height={21 * 5}
              width="100%"
              bgcolor="primary.200"
              position="absolute"
              left={0}
              top={20 + 21 * 6}
              sx={{ opacity: 0.3, pointerEvents: 'none' }}
            />
          </Box> */}
        </Box>
      </ThemeProvider>
    </Paper>
  );
};

export default ComponentShowcase;
