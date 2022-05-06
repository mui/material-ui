import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import { getDesignTokens, getThemedComponents } from 'docs/src/modules/brandingTheme';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';
import MaterialDesignDemo, { componentCode } from 'docs/src/components/home/MaterialDesignDemo';
import ShowcaseContainer from 'docs/src/components/home/ShowcaseContainer';
import PointerContainer, { Data } from 'docs/src/components/home/ElementPointer';
import TouchAppRounded from '@mui/icons-material/TouchAppRounded';
import StylingInfo from 'docs/src/components/action/StylingInfo';
import FlashCode from 'docs/src/components/animation/FlashCode';

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
          padding: darkBrandingTheme.spacing('2px', 1),
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

const lineMapping: Record<string, number | number[]> = {
  avatar: 2,
  divider: 13,
  chip: 20,
  stack: 3,
  iconButton: 9,
  card: 0,
  switch: 21,
  editIcon: 10,
  typography: 4,
  typography2: 5,
  locationOnIcon: 6,
  stack2: [14, 19],
};

export default function CoreShowcase() {
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  const [element, setElement] = React.useState<Data>({ id: null, name: null, target: null });
  const [customized, setCustomized] = React.useState(false);
  const theme = React.useMemo(
    () =>
      customized
        ? createTheme(globalTheme, {
            palette: {
              background: {
                default:
                  mode === 'dark'
                    ? globalTheme.palette.primaryDark[900]
                    : globalTheme.palette.grey[50],
              },
            },
            shape: {
              borderRadius: 10,
            },
            shadows: ['none', '0px 4px 20px 0px hsla(210, 14%, 28%, 0.2)'],
            components: {
              MuiCard: {
                styleOverrides: {
                  root: {
                    boxShadow:
                      mode === 'dark'
                        ? '0px 4px 30px rgba(29, 29, 29, 0.6)'
                        : '0px 4px 20px rgba(61, 71, 82, 0.2)',
                    backgroundColor:
                      mode === 'dark' ? globalTheme.palette.primaryDark[800] : '#fff',
                    border: '1px solid',
                    borderColor:
                      mode === 'dark'
                        ? globalTheme.palette.primaryDark[500]
                        : globalTheme.palette.grey[200],
                  },
                },
              },
              MuiAvatar: {
                styleOverrides: {
                  root: {
                    width: 60,
                    height: 60,
                  },
                },
              },
              MuiIconButton: {
                styleOverrides: {
                  root: {
                    border: '1px solid',
                    borderColor:
                      mode === 'dark'
                        ? globalTheme.palette.primaryDark[500]
                        : globalTheme.palette.grey[200],
                    color:
                      mode === 'dark'
                        ? globalTheme.palette.grey[200]
                        : globalTheme.palette.grey[800],
                    borderRadius: 10,
                    '&:hover, &.Mui-focusVisible': {
                      borderColor: globalTheme.palette.primary.main,
                      color: globalTheme.palette.primary.main,
                    },
                  },
                },
              },
              MuiSwich: globalTheme.components?.MuiSwitch,
              MuiChip: {
                styleOverrides: {
                  filled: {
                    fontWeight: 700,
                    '&.MuiChip-colorSuccess': {
                      backgroundColor:
                        mode === 'dark'
                          ? globalTheme.palette.success[900]
                          : globalTheme.palette.success[100],
                      color:
                        mode === 'dark'
                          ? globalTheme.palette.success[100]
                          : globalTheme.palette.success[900],
                    },
                    '&.MuiChip-colorDefault': {
                      backgroundColor:
                        mode === 'dark'
                          ? globalTheme.palette.grey[900]
                          : globalTheme.palette.grey[200],
                      color:
                        mode === 'dark'
                          ? globalTheme.palette.grey[200]
                          : globalTheme.palette.grey[800],
                    },
                  },
                },
              },
            },
          })
        : createTheme({ palette: { mode: globalTheme.palette.mode } }),
    [customized, globalTheme, mode],
  );
  const highlightedLines = element.id ? lineMapping[element.id] : null;
  let startLine;
  let endLine;
  if (highlightedLines !== null) {
    startLine = Array.isArray(highlightedLines) ? highlightedLines[0] : highlightedLines;
    endLine = Array.isArray(highlightedLines) ? highlightedLines[1] : startLine;
  }
  return (
    <ShowcaseContainer
      sx={{ mt: { md: 2 } }}
      previewSx={{
        minHeight: 220,
        pb: 4,
      }}
      preview={
        <React.Fragment>
          <Box
            textAlign="center"
            sx={{
              py: 0.5,
              ml: 'auto',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translate(-50%)',
              width: '100%',
            }}
          >
            <Typography
              variant="caption"
              fontWeight={500}
              color="text.primary"
              noWrap
              sx={{ opacity: 0.5 }}
            >
              <TouchAppRounded sx={{ fontSize: '0.875rem', verticalAlign: 'text-bottom' }} />
              Hover over the component to highlight the code.
            </Typography>
          </Box>
          <ThemeProvider theme={theme}>
            <PointerContainer
              onElementChange={setElement}
              sx={{ minWidth: 300, width: '80%', maxWidth: '100%' }}
            >
              <MaterialDesignDemo sx={{ transform: 'translate(0, -8px)' }} />
            </PointerContainer>
          </ThemeProvider>
        </React.Fragment>
      }
      code={
        <ThemeProvider theme={darkBrandingTheme}>
          <Box
            sx={{
              p: { xs: 2, sm: 1 },
              display: 'flex',
              alignItems: 'center',
              right: 0,
              zIndex: 10,
            }}
          >
            <Button
              size="small"
              variant={customized ? 'text' : 'outlined'}
              onClick={() => {
                setCustomized(false);
              }}
            >
              Material Design
            </Button>
            <Button
              size="small"
              variant={customized ? 'outlined' : 'text'}
              onClick={() => {
                setCustomized(true);
              }}
              sx={{ ml: 1 }}
            >
              Custom Theme
            </Button>
          </Box>
          <Box
            sx={{
              p: 2,
              pt: 0,
              overflow: 'hidden',
              flexGrow: 1,
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '& pre': {
                bgcolor: 'transparent !important',
                position: 'relative',
                zIndex: 1,
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                '& code[class*="language-"]': {
                  fontSize: 'inherit',
                },
              },
            }}
          >
            <Box sx={{ position: 'relative' }}>
              {startLine !== undefined && (
                <FlashCode startLine={startLine} endLine={endLine} sx={{ mx: -2 }} />
              )}
              <HighlightedCode
                copyButtonHidden
                component={MarkdownElement}
                code={componentCode}
                language="jsx"
              />
              <StylingInfo appeared={customized} sx={{ mb: -2, mx: -2 }} />
            </Box>
          </Box>
        </ThemeProvider>
      }
    />
  );
}
