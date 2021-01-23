import * as React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';
import { makeStyles } from '@material-ui/core/styles';

export default {
  react: React,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Snackbar': Snackbar,
  '@material-ui/core/Alert': MuiAlert,
  '@material-ui/core/styles': { makeStyles },
};
