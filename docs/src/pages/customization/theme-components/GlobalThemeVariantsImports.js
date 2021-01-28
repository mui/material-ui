import * as React from 'react';
import {
  createMuiTheme,
  makeStyles,
  createStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default {
  react: React,
  '@material-ui/core/styles': {
    createMuiTheme,
    makeStyles,
    createStyles,
    ThemeProvider,
  },
  '@material-ui/core/Button': Button,
};
