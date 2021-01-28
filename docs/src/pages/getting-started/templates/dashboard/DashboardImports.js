import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';

export default {
  react: React,
  clsx,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/CssBaseline': CssBaseline,
  '@material-ui/core/Drawer': Drawer,
  '@material-ui/core/Box': Box,
  '@material-ui/core/AppBar': AppBar,
  '@material-ui/core/Toolbar': Toolbar,
  '@material-ui/core/List': List,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Divider': Divider,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/core/Badge': Badge,
  '@material-ui/core/Container': Container,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/Link': Link,
  '@material-ui/icons/Menu': MenuIcon,
  '@material-ui/icons/ChevronLeft': ChevronLeftIcon,
  '@material-ui/icons/Notifications': NotificationsIcon,
  './listItems': { mainListItems, secondaryListItems },
  './Chart': Chart,
  './Deposits': Deposits,
  './Orders': Orders,
};
