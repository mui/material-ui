import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArchiveIcon from '@material-ui/icons/Archive';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/CssBaseline': CssBaseline,
  '@material-ui/core/BottomNavigation': BottomNavigation,
  '@material-ui/core/BottomNavigationAction': BottomNavigationAction,
  '@material-ui/icons/Restore': RestoreIcon,
  '@material-ui/icons/Favorite': FavoriteIcon,
  '@material-ui/icons/Archive': ArchiveIcon,
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/List': List,
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/ListItemAvatar': ListItemAvatar,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/core/Avatar': Avatar,
};
