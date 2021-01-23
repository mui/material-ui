import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/AppBar': AppBar,
  '@material-ui/core/Toolbar': Toolbar,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/icons/Menu': MenuIcon,
  '@material-ui/icons/AccountCircle': AccountCircle,
  '@material-ui/core/Switch': Switch,
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/FormGroup': FormGroup,
  '@material-ui/core/MenuItem': MenuItem,
  '@material-ui/core/Menu': Menu,
};
