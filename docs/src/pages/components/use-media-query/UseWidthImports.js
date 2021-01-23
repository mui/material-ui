import * as React from 'react';
import { ThemeProvider, useTheme, createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default {
  react: React,
  '@material-ui/core/styles': { ThemeProvider, useTheme, createMuiTheme },
  '@material-ui/core/useMediaQuery': useMediaQuery,
};
