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
import {
  getMaterialThemeFrames,
  produceThemeOptions,
} from 'docs/src/components/home/showcaseUtils';
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
  const [element, setElement] = React.useState<Data>({ id: null, name: null, target: null });
  const themeFrames = React.useMemo(() => getMaterialThemeFrames(globalTheme), [globalTheme]);
  const [customized, setCustomized] = React.useState(false);
  const theme = React.useMemo(
    () => createTheme(customized ? produceThemeOptions(themeFrames, 20) : undefined),
    [themeFrames, customized],
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
