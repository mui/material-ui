import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/List': List,
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/ListItemIcon': ListItemIcon,
  '@material-ui/core/ListItemSecondaryAction': ListItemSecondaryAction,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/core/Checkbox': Checkbox,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/icons/Comment': CommentIcon,
};
