import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

export default {
  react: React,
  clsx,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Checkbox': Checkbox,
};
