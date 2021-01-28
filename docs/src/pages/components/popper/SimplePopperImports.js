import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Popper': Popper,
};
