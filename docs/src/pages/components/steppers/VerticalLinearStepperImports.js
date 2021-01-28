import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Stepper': Stepper,
  '@material-ui/core/Step': Step,
  '@material-ui/core/StepLabel': StepLabel,
  '@material-ui/core/StepContent': StepContent,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/Typography': Typography,
};
