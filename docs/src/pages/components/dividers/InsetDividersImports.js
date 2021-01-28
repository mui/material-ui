import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/List': List,
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/core/ListItemAvatar': ListItemAvatar,
  '@material-ui/core/Avatar': Avatar,
  '@material-ui/icons/Image': ImageIcon,
  '@material-ui/icons/Work': WorkIcon,
  '@material-ui/icons/BeachAccess': BeachAccessIcon,
  '@material-ui/core/Divider': Divider,
};
