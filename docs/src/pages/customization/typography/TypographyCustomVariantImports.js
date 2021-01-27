import * as React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  '@material-ui/core/styles': { createMuiTheme, ThemeProvider },
  '@material-ui/core/Box': Box,
  '@material-ui/core/Typography': Typography,
};
