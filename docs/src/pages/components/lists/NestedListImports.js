import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/ListSubheader': ListSubheader,
  '@material-ui/core/List': List,
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/ListItemIcon': ListItemIcon,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/core/Collapse': Collapse,
  '@material-ui/icons/MoveToInbox': InboxIcon,
  '@material-ui/icons/Drafts': DraftsIcon,
  '@material-ui/icons/Send': SendIcon,
  '@material-ui/icons/ExpandLess': ExpandLess,
  '@material-ui/icons/ExpandMore': ExpandMore,
  '@material-ui/icons/StarBorder': StarBorder,
};
