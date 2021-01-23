import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { TransitionGroup } from 'react-transition-group';

export default {
  react: React,
  '@material-ui/core/Box': Box,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Collapse': Collapse,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/core/List': List,
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/ListItemSecondaryAction': ListItemSecondaryAction,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/icons/Delete': DeleteIcon,
  'react-transition-group': { TransitionGroup },
};
