import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, withTheme } from '@material-ui/styles';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/styles': { ThemeProvider, withTheme },
};
