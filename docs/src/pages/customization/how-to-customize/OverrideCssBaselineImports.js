import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export default {
  react: React,
  '@material-ui/core/CssBaseline': CssBaseline,
  '@material-ui/core/styles': { ThemeProvider, createMuiTheme },
};
