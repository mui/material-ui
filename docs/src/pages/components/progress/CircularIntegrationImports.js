import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

export default {
  react: React,
  clsx,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/CircularProgress': CircularProgress,
  '@material-ui/core/colors': { green },
  '@material-ui/core/Button': Button,
  '@material-ui/core/Fab': Fab,
  '@material-ui/icons/Check': CheckIcon,
  '@material-ui/icons/Save': SaveIcon,
};
