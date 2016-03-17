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
      activeStepIndex: -1,
      lastActiveStepIndex: 0,
    };
  },

  selectStep(stepIndex) {
    const {
      lastActiveStepIndex,
      activeStepIndex,

    } = this.state;

    if (stepIndex > lastActiveStepIndex) {
      return;
    }

    this.setState({
      activeStepIndex: stepIndex,
      lastActiveStepIndex: Math.max(lastActiveStepIndex, activeStepIndex),
    });
  },

  updateCompletedSteps(stepIndex) {
    return stepIndex < this.state.lastActiveStepIndex;
  },

  continue() {
    const {
      activeStepIndex,
      lastActiveStepIndex,
    } = this.state;

    this.setState({
      activeStepIndex: activeStepIndex + 1,
      lastActiveStepIndex: Math.max(lastActiveStepIndex, activeStepIndex + 1),
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
          activeStepIndex={this.state.activeStepIndex}
          onStepHeaderTouch={this.selectStep}
          updateCompletedStatusOfStep={this.updateCompletedSteps}
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
