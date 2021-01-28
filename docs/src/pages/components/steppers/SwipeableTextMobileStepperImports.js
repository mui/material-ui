import * as React from 'react';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles, useTheme },
  '@material-ui/core/MobileStepper': MobileStepper,
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Button': Button,
  '@material-ui/icons/KeyboardArrowLeft': KeyboardArrowLeft,
  '@material-ui/icons/KeyboardArrowRight': KeyboardArrowRight,
  'react-swipeable-views': SwipeableViews,
  'react-swipeable-views-utils': { autoPlay },
};
