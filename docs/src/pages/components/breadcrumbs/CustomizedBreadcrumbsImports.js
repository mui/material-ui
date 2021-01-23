import * as React from 'react';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default {
  react: React,
  '@material-ui/core/styles': { emphasize, withStyles },
  '@material-ui/core/Breadcrumbs': Breadcrumbs,
  '@material-ui/core/Chip': Chip,
  '@material-ui/icons/Home': HomeIcon,
  '@material-ui/icons/ExpandMore': ExpandMoreIcon,
};
