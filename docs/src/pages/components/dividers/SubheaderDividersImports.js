import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/List': List,
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/ListItemAvatar': ListItemAvatar,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/core/Avatar': Avatar,
  '@material-ui/icons/BeachAccess': BeachAccessIcon,
  '@material-ui/core/Divider': Divider,
  '@material-ui/core/Typography': Typography,
};
