import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Typography from '@material-ui/core/Typography';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/List': List,
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/ListItemIcon': ListItemIcon,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/core/Divider': Divider,
  '@material-ui/icons/Inbox': InboxIcon,
  '@material-ui/icons/Drafts': DraftsIcon,
  '@material-ui/core/Typography': Typography,
  'react-router': { Route, MemoryRouter },
  'react-router-dom': { Link: RouterLink },
};
