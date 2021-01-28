import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, alpha } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default {
  react: React,
  clsx,
  '@material-ui/core/styles': { makeStyles, createStyles, alpha },
  '@material-ui/core/Slider': Slider,
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/Switch': Switch,
};
