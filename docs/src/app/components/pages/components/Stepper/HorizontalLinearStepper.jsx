import React from 'react';

import Stepper from 'material-ui/lib/Stepper/Stepper';
import Step from 'material-ui/Stepper/HorizontalStep';

import Paper from 'material-ui/lib/paper';
import FontIcon from 'material-ui/lib/font-icon';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

const HorizontalStepper = React.createClass({
  getInitialState() {
    return {
      activeStep: -1,
      lastActiveStep: 0,
    };
  },

  selectStep(currentStep) {
    const {
      lastActiveStep,
      activeStep,

    } = this.state;

    if (currentStep > lastActiveStep) {
      return;
    }

    this.setState({
      activeStep: currentStep,
      lastActiveStep: Math.max(lastActiveStep, activeStep),
    });
  },

  updateCompletedSteps(currentStep) {
    return currentStep < this.state.lastActiveStep;
  },

  createIcon(step) {
    if (step.props.isCompleted) {
      return (
        <FontIcon className="material-icons" style={{fontSize: 14}}>
          done
        </FontIcon>
      );
    }

    return <span>{step.props.orderStepLabel}</span>;
  },

  continue() {
    const {
      activeStep,
      lastActiveStep,
    } = this.state;

    this.setState({
      activeStep: activeStep + 1,
      lastActiveStep: Math.max(lastActiveStep, activeStep + 1),
    });
  },

  render() {
    return (
      <Paper style={{width: 500, margin: 'auto'}}>
        <div style={{
          textAlign: 'center',
          padding: 10,
          fontSize: 20,
        }}
        >
          Material-UI User Group Registration
        </div>
        <Stepper
          horizontal={true}
          activeStep={this.state.activeStep}
          onStepHeaderTouch={this.selectStep}
          updateCompletedStatus={this.updateCompletedSteps}
          createIcon={this.createIcon}
        >
          <Step
            orderStepLabel="1"
            stepLabel="User account"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Continue" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div style={{padding: 20}}>
              Please create an account, or login with your account details.
            </div>
          </Step>
          <Step
            orderStepLabel="2"
            stepLabel="Event registration"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Continue" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div style={{padding: 20}}>
              Please sign up for the event you wish to attend.
            </div>
          </Step>

          <Step
            orderStepLabel="3"
            stepLabel="Payment"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Finish" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div style={{padding: 20}}>
              Please provide your credit card details.
            </div>
          </Step>
        </Stepper>
      </Paper>
    );
  },
});

export default HorizontalStepper;
