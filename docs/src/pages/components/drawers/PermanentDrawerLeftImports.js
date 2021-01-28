import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Drawer': Drawer,
  '@material-ui/core/CssBaseline': CssBaseline,
  '@material-ui/core/AppBar': AppBar,
  '@material-ui/core/Toolbar': Toolbar,
  '@material-ui/core/List': List,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Divider': Divider,
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/ListItemIcon': ListItemIcon,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/icons/MoveToInbox': InboxIcon,
  '@material-ui/icons/Mail': MailIcon,
};
