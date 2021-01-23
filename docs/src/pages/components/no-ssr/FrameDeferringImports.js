import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/NoSsr': NoSsr,
};
