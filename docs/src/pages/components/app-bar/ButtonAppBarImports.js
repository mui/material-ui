import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/AppBar': AppBar,
  '@material-ui/core/Toolbar': Toolbar,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Button': Button,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/icons/Menu': MenuIcon,
};
