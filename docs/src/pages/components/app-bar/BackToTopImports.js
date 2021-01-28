import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/AppBar': AppBar,
  '@material-ui/core/Toolbar': Toolbar,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/CssBaseline': CssBaseline,
  '@material-ui/core/useScrollTrigger': useScrollTrigger,
  '@material-ui/core/Box': Box,
  '@material-ui/core/Container': Container,
  '@material-ui/core/Fab': Fab,
  '@material-ui/icons/KeyboardArrowUp': KeyboardArrowUpIcon,
  '@material-ui/core/Zoom': Zoom,
};
