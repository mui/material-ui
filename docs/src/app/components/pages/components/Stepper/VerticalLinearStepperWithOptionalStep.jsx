import React from 'react';
import Stepper from 'material-ui/Stepper/Stepper';
import Step from 'material-ui/Stepper/VerticalStep';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SeatIcon from 'material-ui/svg-icons/action/event-seat';
import PrintIcon from 'material-ui/svg-icons/action/print';

const styles = {
  icon: {
    width: 15,
    height: 15,
  },
  paper: {
    width: 500,
    margin: 'auto',
  },
  header: {
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
  },
  actionButton: {
    marginRight: 8,
  },
  stepLabelSecondary: {
    fontSize: 10,
    lineHeight: '5px',
  },
};

const VerticalLinearStepper = React.createClass({
  getInitialState() {
    return {
      activeStep: -1,
      lastActiveStep: 0,
      statusSteps: [],
    };
  },

  selectStep(currentStep, step) {
    const {
      lastActiveStep,
      activeStep,

    } = this.state;

    if (currentStep > lastActiveStep && lastActiveStep < step.props.previousStepOptionalIndex) {
      return;
    }

    this.setState({
      activeStep: currentStep,
      lastActiveStep: Math.max(lastActiveStep, activeStep),
    });
  },

  updateCompletedSteps(currentStep) {
    return this.state.statusSteps[currentStep];
  },

  createIcon(step) {
    if (step.props.isCompleted) {
      return (
        <FontIcon className="material-icons" style={{fontSize: 14}}>
          flight_takeoff
        </FontIcon>
      );
    }

    return <span>{step.props.orderStepLabel}</span>;
  },

  continue() {
    const {
      activeStep,
      lastActiveStep,
      statusSteps,
    } = this.state;

    statusSteps[activeStep] = true;

    this.setState({
      activeStep: activeStep + 1,
      statusSteps: statusSteps,
      lastActiveStep: Math.max(lastActiveStep, activeStep + 1),
    });
  },

  render() {
    return (
      <Paper style={styles.paper}>
        <div style={styles.header}>
          Online check-in
        </div>
        <Stepper
          activeStep={this.state.activeStep}
          onStepHeaderTouch={this.selectStep}
          updateCompletedStatus={this.updateCompletedSteps}
          createIcon={this.createIcon}
        >
          <Step
            orderStepLabel={
              <FontIcon className="material-icons" style={{fontSize: 15}}>
                flight
              </FontIcon>
            }
            stepLabel="Flight details"
            actions={[
              <RaisedButton
                key={0}
                label="Continue"
                primary={true}
                onClick={this.continue}
                style={styles.actionButton}
              />,
              <FlatButton
                key={1}
                label="Cancel"
              />,
            ]}
          >
            <div>
              Please enter your booking reference, and flight number.
            </div>
          </Step>

          <Step
            orderStepLabel={<SeatIcon style={styles.icon} />}
            isCompleted={false}
            optional={true}
            stepLabel={
              <div>
                <div>Seat selection</div>
                <div style={styles.stepLabelSecondary}>optional</div>
              </div>
            }
            stepHeaderStyle={{
              alignItems: 'center',
            }}
            actions={[
              <FlatButton
                key={0}
                label="Continue"
                primary={true}
                onClick={this.continue}
                style={styles.actionButton}
              />,
              <FlatButton
                key={1}
                label="Cancel"
              />,
            ]}
          >
            <div>
              If you wish to change your assigned seat, please select
              an alternative seat, or click Finish below to skip this step.
            </div>
          </Step>

          <Step
            orderStepLabel={<PrintIcon style={styles.icon} />}
            stepLabel="Boarding pass"
            actions={[
              <RaisedButton
                key={0}
                label="Finish"
                primary={true}
                onClick={this.continue}
                style={styles.actionButton}
              />,
              <FlatButton
                key={1}
                label="Cancel"
              />,
            ]}
          >
            <div>
              Please print your boarding pass.
            </div>
          </Step>
        </Stepper>
      </Paper>
    );
  },
});

export default VerticalLinearStepper;
