import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { green } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';

export default {
  react: React,
  '@material-ui/core/Slider': Slider,
  '@material-ui/core/styles': { createMuiTheme, ThemeProvider },
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/colors': { green },
  '@material-ui/core/Switch': Switch,
};
