import * as React from 'react';
import { alpha, withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  '@material-ui/core/styles': { alpha, withStyles },
  '@material-ui/core/colors': { purple },
  '@material-ui/core/FormGroup': FormGroup,
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/Switch': Switch,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Typography': Typography,
};
