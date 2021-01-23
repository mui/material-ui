import * as React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, withStyles },
  '@material-ui/core/CircularProgress': CircularProgress,
  '@material-ui/core/LinearProgress': LinearProgress,
};
