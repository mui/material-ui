import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';

export default {
  react: React,
  'prop-types': PropTypes,
  clsx,
  '@material-ui/core/styles': { withStyles },
  '@material-ui/core/Link': Link,
  '../components/AppBar': AppBar,
  '../components/Toolbar': { default: Toolbar, toolbarStyles },
};
