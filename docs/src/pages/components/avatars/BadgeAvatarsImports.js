import * as React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export default {
  react: React,
  '@material-ui/core/Badge': Badge,
  '@material-ui/core/Avatar': Avatar,
  '@material-ui/core/styles': { makeStyles, withStyles },
};
