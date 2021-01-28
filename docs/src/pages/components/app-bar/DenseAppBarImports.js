import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/AppBar': AppBar,
  '@material-ui/core/Toolbar': Toolbar,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/icons/Menu': MenuIcon,
};
