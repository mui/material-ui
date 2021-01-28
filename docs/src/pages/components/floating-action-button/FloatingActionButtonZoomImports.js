import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';

export default {
  react: React,
  'prop-types': PropTypes,
  clsx,
  'react-swipeable-views': SwipeableViews,
  '@material-ui/core/styles': { makeStyles, createStyles, useTheme },
  '@material-ui/core/AppBar': AppBar,
  '@material-ui/core/Tabs': Tabs,
  '@material-ui/core/Tab': Tab,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Zoom': Zoom,
  '@material-ui/core/Fab': Fab,
  '@material-ui/icons/Add': AddIcon,
  '@material-ui/icons/Edit': EditIcon,
  '@material-ui/icons/KeyboardArrowUp': UpIcon,
  '@material-ui/core/colors': { green },
  '@material-ui/core/Box': Box,
};
