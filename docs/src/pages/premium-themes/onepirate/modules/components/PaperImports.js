import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MuiPaper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

export default {
  react: React,
  'prop-types': PropTypes,
  clsx,
  '@material-ui/core/Paper': MuiPaper,
  '@material-ui/core/styles': { withStyles },
};
