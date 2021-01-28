import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/List': List,
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/Divider': Divider,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/core/ListItemAvatar': ListItemAvatar,
  '@material-ui/core/Avatar': Avatar,
  '@material-ui/core/Typography': Typography,
};
