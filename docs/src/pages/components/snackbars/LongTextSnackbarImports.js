import * as React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';

export default {
  react: React,
  '@material-ui/core/Button': Button,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/SnackbarContent': SnackbarContent,
};
