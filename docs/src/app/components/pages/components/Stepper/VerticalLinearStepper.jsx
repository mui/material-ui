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
          How to find the real "css" of your life
        </div>
        <Stepper
          activeStepIndex={this.state.activeStepIndex}
          onStepHeaderTouch={this.selectStep}
          updateCompletedStatusOfStep={this.updateCompletedSteps}
          createIcon={this.createIcon}
        >
          <Step
            orderStepLabel="1"
            stepLabel="Stop coding"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Continue" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div>
              If you code everyday, you may just know css for web not for your life.
              So stoping coding first.<br></br>
              If you agree, let 's press Continue
            </div>
          </Step>
          <Step
            orderStepLabel="2"
            stepLabel="Get away your computer"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Continue" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div>
              The important thing is getting away your computer. If you follow
              the step 1, but you should still sit in front of the computer, you
              can't find <i>destination css</i> for your life. <br></br>
              So if you agree, let's press continue
            </div>
          </Step>

          <Step
            orderStepLabel="3"
            stepLabel="Finally, go out and start a new journey"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Finish" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div style={{height: 50}}>
              Start your new journey in real life and find your real "css" for your
              life. Hope you find out soon.
              Press Finish if you find out.
            </div>
          </Step>
        </Stepper>
      </Paper>
    );
  },
});

export default VerticalLinearStepper;
