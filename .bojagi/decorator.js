import * as React from 'react';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import jssRtl from 'jss-rtl';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, jssRtl()],
  insertionPoint: process.browser ? document.querySelector('#insertion-point-jss') : null,
});

const theme = createMuiTheme({});

console.log('test');

export default (Story) => (
  <StyledEngineProvider injectFirst>
    <StylesProvider jss={jss}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </MuiThemeProvider>
    </StylesProvider>
  </StyledEngineProvider>
);
