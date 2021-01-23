import * as React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export default {
  react: React,
  '@material-ui/core/Backdrop': Backdrop,
  '@material-ui/core/CircularProgress': CircularProgress,
  '@material-ui/core/Button': Button,
  '@material-ui/core/styles': { makeStyles },
};
