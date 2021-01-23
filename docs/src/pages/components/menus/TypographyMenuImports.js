import * as React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

export default {
  react: React,
  '@material-ui/core/MenuList': MenuList,
  '@material-ui/core/MenuItem': MenuItem,
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/ListItemIcon': ListItemIcon,
  '@material-ui/core/Typography': Typography,
  '@material-ui/icons/Drafts': DraftsIcon,
  '@material-ui/icons/Send': SendIcon,
  '@material-ui/icons/PriorityHigh': PriorityHighIcon,
};
