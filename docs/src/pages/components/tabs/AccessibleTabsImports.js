import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/AppBar': AppBar,
  '@material-ui/core/Tabs': Tabs,
  '@material-ui/core/Tab': Tab,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Box': Box,
};
