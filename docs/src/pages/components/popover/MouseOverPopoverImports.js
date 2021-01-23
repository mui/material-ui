import * as React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export default {
  react: React,
  '@material-ui/core/Popover': Popover,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/styles': { makeStyles },
};
