import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Stepper': Stepper,
  '@material-ui/core/Step': Step,
  '@material-ui/core/StepLabel': StepLabel,
};
