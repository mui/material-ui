import * as React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Navigator from './Navigator';
import Content from './Content';
import Header from './Header';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { createMuiTheme, ThemeProvider, withStyles },
  '@material-ui/core/CssBaseline': CssBaseline,
  '@material-ui/core/Hidden': Hidden,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Link': Link,
  './Navigator': Navigator,
  './Content': Content,
  './Header': Header,
};
