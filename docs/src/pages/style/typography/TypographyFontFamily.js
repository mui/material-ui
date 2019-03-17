import * as React from 'react';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import RalewayLightWoff2 from '@material-ui/docs/src/pages/style/typography/fonts/Raleway-Light.woff2';
import RalewayLightTTF from '@material-ui/docs/src/pages/style/typography/fonts/Raleway-Light.ttf';
import RalewayRegularWoff2 from '@material-ui/docs/src/pages/style/typography/fonts/Raleway-Regular.woff2';
import RalewayRegularTTF from '@material-ui/docs/src/pages/style/typography/fonts/Raleway-Regular.ttf';
import RalewayMediumWoff2 from '@material-ui/docs/src/pages/style/typography/fonts/Raleway-Medium.woff2';
import RalewayMediumTTF from '@material-ui/docs/src/pages/style/typography/fonts/Raleway-Medium.ttf';
import Types from './Types';

/**
                              * By default we host the font files ourselves by loading the ttf, woff, and woff2 files into our code. The build
                              * pipeline processes them and makes them available at runtime. Download the font files from Google Fonts - the ttf
                              * versions come in the direct download zip and the woff2 files you have to manually download using the links in the
                              * stylesheets Google provides, e.g. https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwIYqWqZPANqczVs.woff2
                              *
                              * To have Google host the files just use the `url()` they provide in their styles sheets (from Google Fonts) in your
                              * global font face declarations and remove the file imports above.
                              *
                              * Typescript typings we need to load font files are in `./fonts/fonts.d.ts`
                              *
                              * If you need `woff` (v1) files, you may have luck downloading them from the `typeface` project or by using the
                              * Google Fonts API directly.
                              */
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-family': [
        {
          // Values extracted from https://fonts.googleapis.com/css?family=Raleway:300 stylesheet
          fontFamily: 'Raleway',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: 300,
          src: `
              local('Raleway Light'),
              local('Raleway-Light'),
              url(${RalewayLightWoff2}) format('woff2'),
              url(${RalewayLightTTF}) format('truetype')
            `,
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF' },

        {
          // Values extracted from https://fonts.googleapis.com/css?family=Raleway:400 stylesheet
          fontFamily: 'Raleway',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: 400,
          src: `
              local('Raleway'),
              local('Raleway-Regular'),
              url(${RalewayRegularWoff2}) format('woff2'),
              url(${RalewayRegularTTF}) format('truetype')
            `,
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF' },

        {
          // Values extracted from https://fonts.googleapis.com/css?family=Raleway:500 stylesheet
          fontFamily: 'Raleway',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: 500,
          src: `
              local('Raleway Medium'),
              local('Raleway-Medium'),
              url(${RalewayMediumWoff2}) format('woff2'),
              url(${RalewayMediumTTF}) format('truetype')
            `,
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF' }] } },




    MuiTypography: {
      fontFamily: ['Raleway', 'sans-serif'] } } });




export function RalewayTypes(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Types />
    </ThemeProvider>);

}