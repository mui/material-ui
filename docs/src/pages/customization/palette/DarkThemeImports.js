import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
  makeStyles,
  ThemeProvider,
  useTheme,
  createMuiTheme,
} from '@material-ui/core/styles';

export default {
  react: React,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/styles': {
    makeStyles,
    ThemeProvider,
    useTheme,
    createMuiTheme,
  },
};
