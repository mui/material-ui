import * as React from 'react';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles, withStyles },
  '@material-ui/core/CircularProgress': CircularProgress,
  '@material-ui/core/LinearProgress': LinearProgress,
};
