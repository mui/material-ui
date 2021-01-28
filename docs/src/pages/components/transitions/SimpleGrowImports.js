import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Switch': Switch,
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/Grow': Grow,
  '@material-ui/core/FormControlLabel': FormControlLabel,
};
