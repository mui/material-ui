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
      statusSteps: [],
    };
  },

  selectStep(stepIndex, step) {
    const {
      lastActiveStepIndex,
      activeStepIndex,

    } = this.state;

    if (stepIndex > lastActiveStepIndex && lastActiveStepIndex < step.props.previousStepOptionalIndex) {
      return;
    }

    this.setState({
      activeStepIndex: stepIndex,
      lastActiveStepIndex: Math.max(lastActiveStepIndex, activeStepIndex),
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
      lastActiveStepIndex,
      statusSteps,
    } = this.state;

    statusSteps[activeStepIndex] = true;

    this.setState({
      activeStepIndex: activeStepIndex + 1,
      statusSteps: statusSteps,
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
          How to keep your 'css' for a long time
        </div>
        <Stepper
          activeStepIndex={this.state.activeStepIndex}
          onStepHeaderTouch={this.selectStep}
          updateCompletedStatusOfStep={this.updateCompletedSteps}
          createIcon={this.createIcon}
        >
          <Step
            orderStepLabel="1"
            stepLabel="Take more time on your 'css'"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Continue" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div>
              After finding out your 'css', if you really love your 'css' and want
              to keep 'css', you should spend more time and time on her/him.
              All your time 24h in a day is not only for coding, but also for your lover.
              Rememeber it.
              <i>This step really need to be done first. If not, we can't continue the rest steps</i>
              <br></br>
              If you agree with me, let 's continue.
            </div>
          </Step>

          <Step
            orderStepLabel="2"
            isCompleted={false}
            optional={true}
            stepLabel={
              <div>
                <div>Let's up-to-date</div>
                <div style={{fontSize: 10, lineHeight: '5px'}}>optional</div>
              </div>
            }
            stepHeaderStyle={{
              alignItems: 'center',
            }}
            controlButtonsGroup={[
              <RaisedButton key={0} label="Continue" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div>
              In css world, let's up-to-date your knowledge to know which is no longer used
              and which is useful
              <br></br>
              And it is the same with your 'css' in real world. But sometimes, the old things are better
              So this step is optional
            </div>
          </Step>

          <Step
            orderStepLabel="3"
            stepLabel="Use suitable properties at the right situation"
            controlButtonsGroup={[
              <RaisedButton key={0} label="Finish" primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />,
            ]}
          >
            <div>
              In css, we can use 'absolute' or 'relative' or something else to describe
              position of html tag depend on situation.
              <br></br>
              And it is the same with your 'css' in your real life. So be careful when talking with
              her/him. Let's be good programmer =D
            </div>
          </Step>
        </Stepper>
      </Paper>
    );
  },
});

export default VerticalLinearStepper;
