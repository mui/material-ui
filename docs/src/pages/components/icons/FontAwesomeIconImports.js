import * as React from 'react';
import { loadCSS } from 'fg-loadcss';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

export default {
  react: React,
  'fg-loadcss': { loadCSS },
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/colors': { green },
  '@material-ui/core/Icon': Icon,
};
