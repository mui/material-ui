import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Avatar': Avatar,
  '@material-ui/core/colors': { deepOrange, deepPurple },
};
