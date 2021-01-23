import * as React from 'react';
import {
  createMuiTheme,
  experimentalStyled,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';

export default {
  react: React,
  '@material-ui/core/styles': {
    createMuiTheme,
    experimentalStyled,
    makeStyles,
    ThemeProvider,
  },
  '@material-ui/core/Button': Button,
  '@material-ui/core/colors': { green, purple },
};
