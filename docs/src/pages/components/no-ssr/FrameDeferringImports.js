import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/NoSsr': NoSsr,
};
