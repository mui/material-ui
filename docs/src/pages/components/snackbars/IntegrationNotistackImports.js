import * as React from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

export default {
  react: React,
  '@material-ui/core/Button': Button,
  notistack: { SnackbarProvider, useSnackbar },
};
