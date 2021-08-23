import * as React from 'react';
import { ThemeProvider, createTheme, useTheme, styled, alpha } from '@material-ui/core/styles';
import { shouldForwardProp } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import { getDesignTokens, getThemedComponents } from 'docs/src/modules/brandingTheme';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';
import MaterialDesignDemo, { componentCode } from 'docs/src/components/home/MaterialDesignDemo';
import ShowcaseContainer from 'docs/src/components/home/ShowcaseContainer';
import PointerContainer, { Data } from 'docs/src/components/home/ElementPointer';
import KeyboardArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import TouchAppRounded from '@material-ui/icons/TouchAppRounded';

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
  borderColor: theme.palette.primary.dark,
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
  const [hidden, setHidden] = React.useState(false); // for custom theme suggestion
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
                    fontWeight: 600,
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
      sx={{ mt: 2 }}
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
              <TouchAppRounded sx={{ fontSize: 14, verticalAlign: 'text-bottom' }} /> Hover the
              component for highlighting the code.
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
              },
            }}
          >
            <Box sx={{ position: 'relative' }}>
              {startLine !== undefined && (
                <FlashCode startLine={startLine} endLine={endLine} sx={{ mx: -1 }} />
              )}
              <HighlightedCode component={MarkdownElement} code={componentCode} language="jsx" />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: hidden || !customized ? -120 : 0,
                  transition: '0.3s',
                  left: 0,
                  right: 0,
                  px: 2,
                  pt: 1,
                  pb: 2,
                  mb: -2,
                  mx: -2,
                  bgcolor: ({ palette }) => alpha(palette.primaryDark[700], 0.5),
                  backdropFilter: 'blur(8px)',
                  zIndex: 1,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '0 0 10px 10px',
                }}
              >
                <Tooltip title="Hide">
                  <IconButton
                    onClick={() => setHidden(true)}
                    sx={{
                      position: 'absolute',
                      right: 10,
                      top: 0,
                      transform: 'translateY(-50%)',
                      bgcolor: 'primaryDark.500',
                      '&:hover, &.Mui-focused': {
                        bgcolor: 'primaryDark.600',
                      },
                    }}
                  >
                    <KeyboardArrowDownRounded />
                  </IconButton>
                </Tooltip>
                <Typography fontWeight="bold" color="#fff" variant="body2">
                  Own the styling!
                </Typography>
                <Typography color="grey.400" variant="body2">
                  Build your own design system by leveraging our theming capabilities. You can also
                  start by using Google&apos;s Material Design.
                </Typography>
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      }
    />
  );
}
