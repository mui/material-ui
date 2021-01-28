import * as React from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider,
  useTheme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { ThemeProvider, useTheme, makeStyles, createStyles },
};
