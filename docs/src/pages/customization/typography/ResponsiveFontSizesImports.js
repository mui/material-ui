import * as React from 'react';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  '@material-ui/core/styles': { createMuiTheme, responsiveFontSizes, ThemeProvider },
  '@material-ui/core/Typography': Typography,
};
