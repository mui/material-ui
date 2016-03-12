import React from 'react';

import Stepper from 'material-ui/lib/Stepper/Stepper';
import Step from 'material-ui/Stepper/VerticalStep';

import Paper from 'material-ui/lib/paper';
import FontIcon from 'material-ui/lib/font-icon';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

const VerticalNonLinearStepper = React.createClass({
  getInitialState() {
    return {
      activeStepIndex: -1,
      statusSteps: [],
    };
  },

  selectStep(stepIndex) {
    this.setState({
      activeStepIndex: stepIndex,
    });
  },

  updateCompletedSteps(stepIndex) {
    return this.state.statusSteps[stepIndex];
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
      statusSteps,
    } = this.state;

    statusSteps[activeStepIndex] = true;

    this.setState({
      activeStepIndex: activeStepIndex + 1,
      statusSteps: statusSteps,
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
          How to get a lot of money
        </div>
        <Stepper
          activeStepIndex={this.state.activeStepIndex}
          onStepHeaderTouch={this.selectStep}
          updateCompletedStatusOfStep={this.updateCompletedSteps}
          createIcon={this.createIcon}
        >
          <Step
            orderStepLabel="1"
            stepLabel="Get a good job"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Finish" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div>
              Get a good job and it will bring for you many things.
            </div>
          </Step>
          <Step
            orderStepLabel="2"
            stepLabel="Sell your house"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Finish" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div style={{height: 50}}>
              Sell your house then you can earn money
            </div>
          </Step>

          <Step
            orderStepLabel="3"
            stepLabel="Buy a ticket"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Finish" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div style={{height: 50}}>
              Buy a ticket and wait for getting money
            </div>
          </Step>
        </Stepper>
      </Paper>
    );
  },
});

export default VerticalNonLinearStepper;
