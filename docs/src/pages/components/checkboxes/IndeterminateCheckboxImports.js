import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Checkbox': Checkbox,
  '@material-ui/core/FormControlLabel': FormControlLabel,
};
