import * as React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default {
  react: React,
  '@material-ui/core/styles': { createMuiTheme, ThemeProvider },
  '@material-ui/core/TextField': TextField,
};
