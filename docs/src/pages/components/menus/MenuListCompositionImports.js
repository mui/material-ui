import * as React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

export default {
  react: React,
  '@material-ui/core/Button': Button,
  '@material-ui/core/ClickAwayListener': ClickAwayListener,
  '@material-ui/core/Grow': Grow,
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/Popper': Popper,
  '@material-ui/core/MenuItem': MenuItem,
  '@material-ui/core/MenuList': MenuList,
  '@material-ui/core/styles': { makeStyles },
};
