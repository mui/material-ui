import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import MuiTextField from '@material-ui/core/TextField';

export default {
  react: React,
  'prop-types': PropTypes,
  clsx,
  '@material-ui/core/styles': { withStyles },
  '@material-ui/core/TextField': MuiTextField,
};
