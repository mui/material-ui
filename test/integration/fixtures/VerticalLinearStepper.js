import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'src/Stepper';
import RaisedButton from 'src/RaisedButton';
import FlatButton from 'src/FlatButton';

class VerticalLinearStepper extends React.Component {

  static contextTypes = {muiTheme: React.PropTypes.object.isRequired};

  state = {
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({stepIndex: stepIndex + 1});
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    this.setState({stepIndex: stepIndex - 1});
  };

  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const {stepIndex} = this.state;

    return (
      <Stepper activeStep={stepIndex} orientation="vertical" style={{width: 380, margin: 'auto'}}>
        <Step>
          <StepLabel>Select campaign settings</StepLabel>
          <StepContent>
            <p>
              For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.
            </p>
            {this.renderStepActions(0)}
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Create an ad group</StepLabel>
          <StepContent>
            <p>An ad group contains one or more ads which target a shared set of keywords.</p>
            {this.renderStepActions(1)}
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Create an ad</StepLabel>
          <StepContent>
            <p>
              Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.
            </p>
            {this.renderStepActions(2)}
          </StepContent>
        </Step>
      </Stepper>
    );
  }
}

export default VerticalLinearStepper;
