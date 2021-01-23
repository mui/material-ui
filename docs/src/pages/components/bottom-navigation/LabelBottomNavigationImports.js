import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/BottomNavigation': BottomNavigation,
  '@material-ui/core/BottomNavigationAction': BottomNavigationAction,
  '@material-ui/icons/Folder': FolderIcon,
  '@material-ui/icons/Restore': RestoreIcon,
  '@material-ui/icons/Favorite': FavoriteIcon,
  '@material-ui/icons/LocationOn': LocationOnIcon,
};
