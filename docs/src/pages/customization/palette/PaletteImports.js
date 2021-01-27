import * as React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

export default {
  react: React,
  '@material-ui/core/styles': { createMuiTheme },
  '@material-ui/styles': { ThemeProvider },
  '@material-ui/core/colors': { purple },
  '@material-ui/core/Button': Button,
};
