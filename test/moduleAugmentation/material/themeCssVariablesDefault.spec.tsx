import * as React from 'react';
import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material/styles';

// The theme is typed with CSS theme variables without any module augmentation.

const theme = createTheme();

const vars: string = theme.vars.palette.primary.main;
const channel: string = theme.palette.primary.mainChannel;
const varsChannel: string = theme.vars.palette.primary.mainChannel;
theme.getCssVar('palette-primary-main');

createTheme({
  colorSchemes: {
    light: { palette: { primary: { mainChannel: '0 0 0' } } },
    dark: true,
  },
});

const StyledComponent = styled('div')(({ theme: t }) => ({
  color: t.vars.palette.text.primary,
  backgroundColor: `rgba(${t.vars.palette.primary.mainChannel} / 0.12)`,
}));

function Component() {
  const t = useTheme();
  return <div style={{ color: t.vars.palette.text.secondary }} />;
}

<ThemeProvider
  theme={theme}
  colorSchemeNode={null}
  disableNestedContext
  disableStyleSheetGeneration
  forceThemeRerender
>
  <StyledComponent />
  <Component />
</ThemeProvider>;

export { vars, channel, varsChannel };
