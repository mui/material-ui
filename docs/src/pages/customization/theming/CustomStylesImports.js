import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {
  createMuiTheme,
  makeStyles,
  createStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

export default {
  react: React,
  '@material-ui/core/Checkbox': Checkbox,
  '@material-ui/core/styles': {
    createMuiTheme,
    makeStyles,
    createStyles,
    ThemeProvider,
  },
  '@material-ui/core/colors': { orange },
};
