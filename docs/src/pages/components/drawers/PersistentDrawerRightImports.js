import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

export default {
  react: React,
  clsx,
  '@material-ui/core/styles': { makeStyles, useTheme },
  '@material-ui/core/Drawer': Drawer,
  '@material-ui/core/AppBar': AppBar,
  '@material-ui/core/Toolbar': Toolbar,
  '@material-ui/core/CssBaseline': CssBaseline,
  '@material-ui/core/List': List,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Divider': Divider,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/icons/Menu': MenuIcon,
  '@material-ui/icons/ChevronLeft': ChevronLeftIcon,
  '@material-ui/icons/ChevronRight': ChevronRightIcon,
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/ListItemIcon': ListItemIcon,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/icons/MoveToInbox': InboxIcon,
  '@material-ui/icons/Mail': MailIcon,
};
