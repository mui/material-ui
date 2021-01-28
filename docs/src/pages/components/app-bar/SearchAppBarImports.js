import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles, createStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

export default {
  react: React,
  '@material-ui/core/AppBar': AppBar,
  '@material-ui/core/Toolbar': Toolbar,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/InputBase': InputBase,
  '@material-ui/core/styles': { alpha, makeStyles, createStyles },
  '@material-ui/icons/Menu': MenuIcon,
  '@material-ui/icons/Search': SearchIcon,
};
