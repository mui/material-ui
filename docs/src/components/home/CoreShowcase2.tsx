import * as React from 'react';
import { ThemeProvider, createTheme, useTheme, styled, alpha } from '@material-ui/core/styles';
import { shouldForwardProp } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import { getDesignTokens, getThemedComponents } from 'docs/src/modules/brandingTheme';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';
import MaterialDesignDemo, { componentCode } from 'docs/src/components/home/MaterialDesignDemo';
import ShowcaseContainer from 'docs/src/components/home/ShowcaseContainer';
import PointerContainer, { Data } from 'docs/src/components/home/ElementPointer';

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

const FlashCode = styled('div', {
  shouldForwardProp: (prop) =>
    shouldForwardProp(prop) && prop !== 'endLine' && prop !== 'startLine',
})<{ endLine?: number; startLine?: number }>(({ theme, startLine = 0, endLine = 1 }) => ({
  borderRadius: 2,
  pointerEvents: 'none',
  position: 'absolute',
  left: 0,
  right: 0,
  top: startLine * 18,
  height: (endLine - startLine + 1) * 18,
  transition: '0.3s',
  ...theme.typography.caption,
  backgroundColor: alpha(theme.palette.primary.main, 0.2),
  border: '1px solid',
  borderColor: theme.palette.primary.main,
}));

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
                    ? globalTheme.palette.primaryDark[800]
                    : globalTheme.palette.grey[50],
              },
            },
            shape: {
              borderRadius: 12,
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
                    width: 64,
                    height: 64,
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
              MuiChip: {
                styleOverrides: {
                  filled: {
                    backgroundColor:
                      mode === 'dark'
                        ? globalTheme.palette.success[900]
                        : globalTheme.palette.success[100],
                    color:
                      mode === 'dark'
                        ? globalTheme.palette.success[100]
                        : globalTheme.palette.success[800],
                    fontWeight: 500,
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
      sx={{ pt: 8 }}
      previewSx={{
        minHeight: 180,
      }}
      preview={
        <ThemeProvider theme={theme}>
          <PointerContainer
            onElementChange={setElement}
            sx={{ minWidth: 300, width: '80%', maxWidth: '100%' }}
          >
            <MaterialDesignDemo />
          </PointerContainer>
        </ThemeProvider>
      }
      code={
        <ThemeProvider theme={darkBrandingTheme}>
          <Box
            sx={{
              p: 1,
              display: 'flex',
              alignItems: 'center',
              minHeight: 56,
              position: 'absolute',
              right: 0,
              zIndex: 10,
            }}
          >
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
          </Box>
          <Box
            sx={{
              p: 2,
              pt: 4,
              overflow: 'auto',
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
              },
            }}
          >
            <Box sx={{ position: 'relative' }}>
              {startLine !== undefined && (
                <FlashCode startLine={startLine} endLine={endLine} sx={{ mx: -1 }} />
              )}
              <HighlightedCode component={MarkdownElement} code={componentCode} language="jsx" />
            </Box>
          </Box>
        </ThemeProvider>
      }
    />
  );
}
