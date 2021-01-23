import * as React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, useTheme },
  '@material-ui/core/MobileStepper': MobileStepper,
  '@material-ui/core/Button': Button,
  '@material-ui/icons/KeyboardArrowLeft': KeyboardArrowLeft,
  '@material-ui/icons/KeyboardArrowRight': KeyboardArrowRight,
};
