import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiSnackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { withStyles },
  '@material-ui/core/Snackbar': MuiSnackbar,
  '@material-ui/core/Slide': Slide,
  '@material-ui/icons/Close': CloseIcon,
  '@material-ui/icons/Info': InfoIcon,
  '@material-ui/core/IconButton': IconButton,
};
