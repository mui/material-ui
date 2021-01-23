import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  '@material-ui/core/styles': { withStyles },
  '@material-ui/core/Button': Button,
  '@material-ui/core/Dialog': Dialog,
  '@material-ui/core/DialogTitle': MuiDialogTitle,
  '@material-ui/core/DialogContent': MuiDialogContent,
  '@material-ui/core/DialogActions': MuiDialogActions,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/icons/Close': CloseIcon,
  '@material-ui/core/Typography': Typography,
};
