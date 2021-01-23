import * as React from 'react';
import clsx from 'clsx';
import Autocomplete from '@material-ui/core/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

export default {
  react: React,
  clsx,
  '@material-ui/core/Autocomplete': Autocomplete,
  '@material-ui/core/styles': { makeStyles },
};
