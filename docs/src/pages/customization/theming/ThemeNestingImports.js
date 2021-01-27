import * as React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { green, orange } from '@material-ui/core/colors';

export default {
  react: React,
  '@material-ui/core/styles': { createMuiTheme, ThemeProvider },
  '@material-ui/core/Checkbox': Checkbox,
  '@material-ui/core/colors': { green, orange },
};
