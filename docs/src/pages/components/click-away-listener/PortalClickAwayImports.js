import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Portal from '@material-ui/core/Portal';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/ClickAwayListener': ClickAwayListener,
  '@material-ui/core/Portal': Portal,
};
