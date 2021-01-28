import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/colors': { green },
};
