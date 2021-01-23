import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Stepper': Stepper,
  '@material-ui/core/Step': Step,
  '@material-ui/core/StepButton': StepButton,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Typography': Typography,
};
