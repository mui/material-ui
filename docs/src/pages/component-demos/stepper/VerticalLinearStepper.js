// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, createStyleSheet } from "material-ui/styles";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import Button from "material-ui/Button";

const styleSheet = createStyleSheet("VerticalLinearStepper", theme => ({
  root: {
    width: '90%'
  },
  backButton: {
    marginRight: theme.spacing.unit
  }
}));

class VerticalLinearStepper extends Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  getSteps() {
    return ["Select campaign settings", "Create an ad group", "Create an ad"];
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return "Select campaign settings...";
      case 1:
        return "What is an ad group anyways?";
      case 2:
        return "This is the bit I really care about!";
      default:
        return "You're a long way from home sonny jim!";
    }
  }

  render() {
    const classes = this.props.classes;
    const steps = this.getSteps();
    const activeStep = this.state.activeStep;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, i) => (
            <Step key={i}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length + 1
            ? <p>
                <Button onClick={this.handleReset}>
                  Reset
                </Button>
              </p>
            : <div>
                <p>{this.getStepContent(activeStep)}</p>
                <div>
                  <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.backButton}>
                    Back
                  </Button>
                  <Button raised color="primary" onClick={this.handleNext}>
                    {activeStep === steps.length ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>}
        </div>
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styleSheet)(VerticalLinearStepper);
