import * as React from 'react';
import { useTheme, alpha, makeStyles, createStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import Autocomplete from '@material-ui/core/Autocomplete';
import ButtonBase from '@material-ui/core/ButtonBase';
import InputBase from '@material-ui/core/InputBase';

export default {
  react: React,
  '@material-ui/core/styles': { useTheme, alpha, makeStyles, createStyles },
  '@material-ui/core/Popper': Popper,
  '@material-ui/core/ClickAwayListener': ClickAwayListener,
  '@material-ui/icons/Settings': SettingsIcon,
  '@material-ui/icons/Close': CloseIcon,
  '@material-ui/icons/Done': DoneIcon,
  '@material-ui/core/Autocomplete': Autocomplete,
  '@material-ui/core/ButtonBase': ButtonBase,
  '@material-ui/core/InputBase': InputBase,
};
