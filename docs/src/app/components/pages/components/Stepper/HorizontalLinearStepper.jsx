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
      activeStepIndex,
      lastActiveStepIndex,
    } = this.state;

    this.setState({
      activeStepIndex: activeStepIndex + 1,
      lastActiveStepIndex: Math.max(lastActiveStepIndex, activeStepIndex + 1),
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
          How to say goodbye to your 'css'
        </div>
        <Stepper
          horizontal={true}
          activeStepIndex={this.state.activeStepIndex}
          onStepHeaderTouch={this.selectStep}
          updateCompletedStatusOfStep={this.updateCompletedSteps}
          createIcon={this.createIcon}
        >
          <Step
            orderStepLabel="1"
            stepLabel="Spending all your time on coding"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Continue" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div style={{padding: 20}}>
              Don't take your time on your 'css'. And then you will see what will happen.
            </div>
          </Step>
          <Step
            orderStepLabel="2"
            stepLabel="Be poor 'programmer' with your 'css'"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Continue" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div style={{padding: 20}}>
              You don't update your knowledge and you will be out of date. You no longer understand
              your 'css'. Then you will see what will happen
            </div>
          </Step>

          <Step
            orderStepLabel="3"
            stepLabel="Say goodbye"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Finish" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div style={{padding: 20}}>
              Good bye
            </div>
          </Step>
        </Stepper>
      </Paper>
    );
  },
});

export default HorizontalStepper;
