import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';

/**
 * It is possible to specify your own step connector by passing an element to the `connector`
 * prop. If you want to remove the connector, pass `null` to the `connector` prop.
 */
class CustomStepConnector extends React.Component {
  constructor(props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  state = {
    stepIndex: 0,
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <p>
            {'For each ad campaign that you create, you can control how much you\'re willing to ' +
            'spend on clicks and conversions, which networks and geographical locations you want ' +
            'your ads to show on, and more.'}
          </p>
        );

      case 1:
        return (
          <p>
            {'An ad group contains one or more ads which target a shared set of keywords.'}
          </p>
        );

      case 2:
        return (
          <p>
            {'Try out different ad text to see what brings in the most customers, and learn ' +
            'how to enhance your ads using features like ad extensions. If you run into any ' +
            'problems with your ads, find out how to tell if they\'re running and how to ' +
            'resolve approval issues.'}
          </p>
        );
    }
  }

  handleNext() {
    const {stepIndex} = this.state;

    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  }

  handlePrev() {
    const {stepIndex} = this.state;

    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  render() {
    const {stepIndex} = this.state;

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} connector={<ArrowForwardIcon />}>
          <Step>
            <StepLabel>Select campaign settings</StepLabel>
          </Step>

          <Step>
            <StepLabel>Create an ad group</StepLabel>
          </Step>

          <Step>
            <StepLabel>Create an ad</StepLabel>
          </Step>
        </Stepper>

        {this.getStepContent(stepIndex)}

        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onClick={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 2 ? 'Finish' : 'Next'}
            primary={true}
            onClick={this.handleNext}
          />
        </div>
      </div>
    );
  }
}

export default CustomStepConnector;
