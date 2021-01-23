import * as React from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

export default {
  react: React,
  '@material-ui/core/Switch': Switch,
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/Slide': Slide,
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/styles': { makeStyles },
};
