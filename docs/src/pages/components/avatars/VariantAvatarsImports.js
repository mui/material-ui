import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, green } from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/Assignment';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Avatar': Avatar,
  '@material-ui/core/colors': { deepOrange, green },
  '@material-ui/icons/Assignment': AssignmentIcon,
};
