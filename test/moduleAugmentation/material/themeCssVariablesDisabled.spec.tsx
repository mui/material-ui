import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Projects that create the theme with `cssVariables: false` remove the CSS theme variables from the types.
declare module '@mui/material/styles' {
  interface CssThemeVariables {
    enabled: false;
  }
}

const theme = createTheme({ cssVariables: false });

// @ts-expect-error `theme.vars` is optional
const vars: string = theme.vars.palette.primary.main;
// @ts-expect-error `mainChannel` is not generated
const channel: string = theme.palette.primary.mainChannel;
// @ts-expect-error `getCssVar` is not generated
theme.getCssVar('palette-primary-main');

// @ts-expect-error `colorSchemeNode` is not supported
<ThemeProvider theme={theme} colorSchemeNode={null} />;

export { vars, channel };
