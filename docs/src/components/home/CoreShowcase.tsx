import * as React from 'react';
import { alpha, ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button, { buttonClasses } from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TouchAppRounded from '@mui/icons-material/TouchAppRounded';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';
import MaterialDesignDemo, { componentCode } from 'docs/src/components/home/MaterialDesignDemo';
import ShowcaseContainer from 'docs/src/components/home/ShowcaseContainer';
import PointerContainer, { Data } from 'docs/src/components/home/ElementPointer';
import StylingInfo from 'docs/src/components/action/StylingInfo';
import FlashCode from 'docs/src/components/animation/FlashCode';

const lineMapping: Record<string, number | number[]> = {
  card: 0,
  stack: [1, 17],
  avatar: 2,
  stack2: [4, 11],
  chip: [6, 10],
  typography: 5,
  typography2: [12, 14],
  switch: 16,
};

export default function CoreShowcase() {
  const { vars, ...globalTheme } = useTheme();
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
              borderRadius: 12,
            },
            shadows: ['none', '0px 4px 20px 0px hsla(210, 14%, 28%, 0.2)'],
            components: {
              MuiCard: {
                styleOverrides: {
                  root: {
                    boxShadow:
                      mode === 'dark'
                        ? '0px 4px 12px rgba(0, 0, 0, 0.4)'
                        : '0px 4px 12px rgba(61, 71, 82, 0.1)',
                    backgroundColor:
                      mode === 'dark' ? globalTheme.palette.primaryDark[800] : '#fff',
                    border: '1px solid',
                    borderColor:
                      mode === 'dark'
                        ? globalTheme.palette.primaryDark[700]
                        : globalTheme.palette.grey[200],
                  },
                },
              },
              MuiAvatar: {
                styleOverrides: {
                  root: {
                    width: 50,
                    height: 50,
                    borderRadius: 99,
                  },
                },
              },
              MuiSwich: globalTheme.components?.MuiSwitch,
              MuiChip: {
                styleOverrides: {
                  filled: {
                    fontWeight: 'medium',
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
                          ? globalTheme.palette.primaryDark[700]
                          : globalTheme.palette.grey[100],
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
              fontWeight="medium"
              color="text.primary"
              noWrap
              sx={{ opacity: 0.3 }}
            >
              <TouchAppRounded
                sx={{ fontSize: '0.875rem', verticalAlign: 'text-bottom', mr: 0.5 }}
              />
              Hover over the component to highlight the code.
            </Typography>
          </Box>
          <ThemeProvider theme={theme}>
            <PointerContainer
              onElementChange={setElement}
              sx={{ minWidth: 300, width: '80%', maxWidth: '100%' }}
            >
              <MaterialDesignDemo />
            </PointerContainer>
          </ThemeProvider>
        </React.Fragment>
      }
      code={
        <div data-mui-color-scheme="dark">
          <Box
            sx={{
              pb: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              right: 0,
              zIndex: 10,
              [`& .${buttonClasses.root}`]: {
                borderRadius: 40,
                padding: '2px 10px',
                fontSize: '0.75rem',
                lineHeight: 18 / 12,
              },
              '& .MuiButton-outlinedPrimary': {
                backgroundColor: alpha(globalTheme.palette.primary[900], 0.5),
              },
            }}
          >
            <Button
              size="small"
              variant="outlined"
              color={customized ? 'secondary' : 'primary'}
              onClick={() => {
                setCustomized(false);
              }}
            >
              Material Design
            </Button>
            <Button
              size="small"
              variant="outlined"
              color={customized ? 'primary' : 'secondary'}
              onClick={() => {
                setCustomized(true);
              }}
            >
              Custom Theme
            </Button>
          </Box>
          <Box
            sx={{
              position: 'relative',
              overflow: 'clip',
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
              {startLine !== undefined && <FlashCode startLine={startLine} endLine={endLine} />}
              <HighlightedCode
                copyButtonHidden
                component={MarkdownElement}
                code={componentCode}
                language="jsx"
              />
              <StylingInfo appeared={customized} sx={{ mb: 0, mx: -2 }} />
            </Box>
          </Box>
        </div>
      }
    />
  );
}
