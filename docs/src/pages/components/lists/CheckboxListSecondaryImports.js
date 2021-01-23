import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/List': List,
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/ListItemSecondaryAction': ListItemSecondaryAction,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/core/ListItemAvatar': ListItemAvatar,
  '@material-ui/core/Checkbox': Checkbox,
  '@material-ui/core/Avatar': Avatar,
};
