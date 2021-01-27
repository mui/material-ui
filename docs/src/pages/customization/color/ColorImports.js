import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { withStyles, useTheme },
  '@material-ui/core/colors': colors,
};
