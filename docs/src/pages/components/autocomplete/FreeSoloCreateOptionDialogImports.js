import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/core/Autocomplete';

export default {
  react: React,
  '@material-ui/core/TextField': TextField,
  '@material-ui/core/Dialog': Dialog,
  '@material-ui/core/DialogTitle': DialogTitle,
  '@material-ui/core/DialogContent': DialogContent,
  '@material-ui/core/DialogContentText': DialogContentText,
  '@material-ui/core/DialogActions': DialogActions,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Autocomplete': { default: Autocomplete, createFilterOptions },
};
