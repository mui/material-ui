import * as React from 'react';
import { createMuiTheme, ThemeProvider, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default {
  react: React,
  '@material-ui/core/styles': { createMuiTheme, ThemeProvider, useTheme },
  '@material-ui/core/useMediaQuery': useMediaQuery,
};
