import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default {
  react: React,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Dialog': Dialog,
  '@material-ui/core/DialogActions': DialogActions,
  '@material-ui/core/DialogContent': DialogContent,
  '@material-ui/core/DialogContentText': DialogContentText,
  '@material-ui/core/DialogTitle': DialogTitle,
  '@material-ui/core/useMediaQuery': useMediaQuery,
  '@material-ui/core/styles': { useTheme },
};
