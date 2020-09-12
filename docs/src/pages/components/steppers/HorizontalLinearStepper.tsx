import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    buttonWrapper: {
      display: 'flex',
      flexDirection: 'row',
      padding: '16px 0 0',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    spacer: {
      flex: '1 1 auto',
    },
    instructions: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
  }),
);

const steps = [
  'Select campaign settings',
  'Create an ad group',
  'Create an ad',
];

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography className={classes.instructions}>
            All steps completed - you&apos;re finished
          </Typography>
          <div className={classes.buttonWrapper}>
            <div className={classes.spacer} />
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography className={classes.instructions}>
            Step {activeStep + 1}
          </Typography>
          <div className={classes.buttonWrapper}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>
            <div className={classes.spacer} />
            {isStepOptional(activeStep) && (
              <Button
                color="inherit"
                onClick={handleSkip}
                className={classes.button}
              >
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
