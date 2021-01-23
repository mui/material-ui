import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { grey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/core/Skeleton';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

export default {
  react: React,
  'prop-types': PropTypes,
  '@emotion/react': { Global },
  '@material-ui/core/CssBaseline': CssBaseline,
  '@material-ui/core/colors': { grey },
  '@material-ui/core/Button': Button,
  '@material-ui/core/Box': Box,
  '@material-ui/core/Skeleton': Skeleton,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/SwipeableDrawer': SwipeableDrawer,
};
