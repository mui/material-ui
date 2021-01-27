import * as React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

export default {
  react: React,
  '@material-ui/core/styles': { ThemeProvider },
  '@material-ui/core/CssBaseline': CssBaseline,
  './theme': theme,
};
