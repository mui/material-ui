import * as React from 'react';
import {
  alpha,
  ThemeProvider,
  useTheme,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';

export default {
  react: React,
  '@material-ui/core/styles': {
    alpha,
    ThemeProvider,
    useTheme,
    withStyles,
    makeStyles,
    createMuiTheme,
  },
  '@material-ui/core/InputBase': InputBase,
  '@material-ui/core/InputLabel': InputLabel,
  '@material-ui/core/TextField': TextField,
  '@material-ui/core/FormControl': FormControl,
  '@material-ui/core/colors': { green },
};
