import * as React from 'react';
import { experimentalStyled } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default {
  react: React,
  '@material-ui/core/styles': { experimentalStyled },
  '@material-ui/core/Slider': Slider,
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/Switch': Switch,
};
