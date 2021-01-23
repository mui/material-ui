import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

export default {
  react: React,
  clsx,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Drawer': Drawer,
  '@material-ui/core/Button': Button,
  '@material-ui/core/List': List,
  '@material-ui/core/Divider': Divider,
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/ListItemIcon': ListItemIcon,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/icons/MoveToInbox': InboxIcon,
  '@material-ui/icons/Mail': MailIcon,
};
