import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Button': Button,
  '@material-ui/core/Snackbar': Snackbar,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/icons/Close': CloseIcon,
};
