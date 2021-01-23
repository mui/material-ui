import * as React from 'react';
import mediaQuery from 'css-mediaquery';
import { ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default {
  react: React,
  'css-mediaquery': mediaQuery,
  '@material-ui/core/styles': { ThemeProvider },
  '@material-ui/core/useMediaQuery': useMediaQuery,
};
