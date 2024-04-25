import * as React from 'react';
import { alpha, ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button, { buttonClasses } from '@mui/material/Button';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import MaterialDesignDemo, { componentCode } from 'docs/src/components/home/MaterialDesignDemo';
import ShowcaseContainer from 'docs/src/components/home/ShowcaseContainer';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';
import PointerContainer, { Data } from 'docs/src/components/home/ElementPointer';
import StylingInfo from 'docs/src/components/action/StylingInfo';
import FlashCode from 'docs/src/components/animation/FlashCode';
import ROUTES from 'docs/src/route';

const lineMapping: Record<string, number | number[]> = {
  card: [0, 20],
  cardmedia: [1, 5],
  stack: [6, 19],
  stack2: [7, 16],
  typography: 8,
  stack3: [9, 16],
  chip: [10, 14],
  rating: 15,
  switch: 18,
};

export default function CoreShowcase() {
  const { vars, ...globalTheme } = useTheme();
  const mode = globalTheme.palette.mode;
  const [element, setElement] = React.useState<Data>({ id: null, name: null, target: null });
  const [customized, setCustomized] = React.useState(true);
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
        <ThemeProvider theme={theme}>
          <PointerContainer
            onElementChange={setElement}
            sx={{ minWidth: 300, width: '100%', maxWidth: '100%' }}
          >
            <MaterialDesignDemo />
          </PointerContainer>
        </ThemeProvider>
      }
      code={
        <React.Fragment>
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
                pb: { xs: 2, sm: 16 },
                maxHeight: { xs: 'auto', sm: 350 },
                position: 'relative',
                overflow: 'clip',
                overflowY: 'scroll',
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
              {startLine !== undefined && <FlashCode startLine={startLine} endLine={endLine} />}
              <HighlightedCode
                copyButtonHidden
                component={MarkdownElement}
                code={componentCode}
                language="jsx"
              />
            </Box>
          </div>
          <StylingInfo
            title="Own the styling!"
            description="You can also start by using Googles Material Design."
            primaryBtnLabel="Start with Material UI"
            primaryBtnHref={ROUTES.productCore}
            secondaryBtnLabel="Learn more about the Core libraries"
            secondaryBtnHref={ROUTES.productCore}
          />
        </React.Fragment>
      }
    />
  );
}
