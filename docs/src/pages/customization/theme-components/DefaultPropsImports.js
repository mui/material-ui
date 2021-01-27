import * as React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default {
  react: React,
  '@material-ui/core/styles': { createMuiTheme, ThemeProvider },
  '@material-ui/core/Button': Button,
};
