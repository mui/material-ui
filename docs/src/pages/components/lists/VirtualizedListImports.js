import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/ListItemText': ListItemText,
  'react-window': { FixedSizeList },
};
