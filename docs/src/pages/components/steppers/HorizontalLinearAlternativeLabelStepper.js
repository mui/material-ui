import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
];

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
