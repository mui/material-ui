import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
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
    completed: {
      display: 'inline-block',
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

export default function HorizontalNonLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
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
              <Button onClick={handleNext} className={classes.button}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
