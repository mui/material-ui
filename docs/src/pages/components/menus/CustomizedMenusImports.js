import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

export default {
  react: React,
  '@material-ui/core/styles': { withStyles },
  '@material-ui/core/Button': Button,
  '@material-ui/core/Menu': Menu,
  '@material-ui/core/MenuItem': MenuItem,
  '@material-ui/core/ListItemIcon': ListItemIcon,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/icons/MoveToInbox': InboxIcon,
  '@material-ui/icons/Drafts': DraftsIcon,
  '@material-ui/icons/Send': SendIcon,
};
