import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/List': List,
  '@material-ui/core/Link': Link,
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/Collapse': Collapse,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/core/Typography': Typography,
  '@material-ui/icons/ExpandLess': ExpandLess,
  '@material-ui/icons/ExpandMore': ExpandMore,
  '@material-ui/core/Breadcrumbs': Breadcrumbs,
  'react-router': { Route, MemoryRouter },
  'react-router-dom': { RouterLink },
};
