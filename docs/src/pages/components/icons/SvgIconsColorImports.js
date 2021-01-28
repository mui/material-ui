import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/colors': { green },
  '@material-ui/core/SvgIcon': SvgIcon,
};
