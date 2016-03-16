import React from 'react';

import Stepper from 'material-ui/lib/Stepper/Stepper';
import Step from 'material-ui/Stepper/VerticalStep';

import Paper from 'material-ui/lib/paper';
import FontIcon from 'material-ui/lib/font-icon';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

const VerticalLinearStepper = React.createClass({
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

  render() {
    return (
      <Paper style={{width: 500, margin: 'auto'}}>
        <div style={{
          textAlign: 'center',
          padding: 10,
          fontSize: 20,
        }}
        >
          Create an Ad Campaign
        </div>
        <Stepper
          activeStep={this.state.activeStep}
          onStepHeaderTouch={this.selectStep}
          updateCompletedStatus={this.updateCompletedSteps}
          createIcon={this.createIcon}
        >
          <Step
            orderStepLabel="1"
            stepLabel="Select campaign settings"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Continue" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div>
              Please select the type of campaign you wish to create.
            </div>
          </Step>
          <Step
            orderStepLabel="2"
            stepLabel="Create ad group"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Continue" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div>
              Please create an ad group for this campaign.<br /><br />
              Your campaign may contain multiple ad groups.
            </div>
          </Step>

          <Step
            orderStepLabel="3"
            stepLabel="Create an ad"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Finish" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div style={{height: 50}}>
              Please create one or more adverts for this ad group.
            </div>
          </Step>
        </Stepper>
      </Paper>
    );
  },
});

export default VerticalLinearStepper;
