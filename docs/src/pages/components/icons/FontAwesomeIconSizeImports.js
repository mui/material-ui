import * as React from 'react';
import { loadCSS } from 'fg-loadcss';
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import MdPhone from '@material-ui/icons/Phone';
import Chip from '@material-ui/core/Chip';

export default {
  react: React,
  'fg-loadcss': { loadCSS },
  '@material-ui/core/styles': {
    ThemeProvider,
    createMuiTheme,
    makeStyles,
    createStyles,
  },
  '@material-ui/core/Icon': Icon,
  '@material-ui/icons/Phone': MdPhone,
  '@material-ui/core/Chip': Chip,
};
