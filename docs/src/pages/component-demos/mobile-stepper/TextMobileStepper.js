// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import Paper from 'material-ui/Paper';

const styleSheet = createStyleSheet('TextMobileStepper', {
  root: {
    position: 'relative',
    marginTop: 30,
    width: '100%',
  },
  mobileStepper: {
    position: 'relative',
  },
  textualDescription: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    height: '50px',
    left: 0,
    fontSize: '14px',
    paddingLeft: '28px',
    marginBottom: '20px',
  },
});

class TextMobileStepper extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    activeStep: 0,
  };

  handleOnNext = () => {
    const activeStep = this.state.activeStep === 5 ? 5 : this.state.activeStep + 1;
    this.setState({
      activeStep,
    });
  };

  handleOnBack = () => {
    const activeStep = this.state.activeStep === 0 ? 0 : this.state.activeStep - 1;
    this.setState({
      activeStep,
    });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.textualDescription}>
          Step {this.state.activeStep + 1} of 6
        </Paper>
        <MobileStepper
          kind="text"
          steps={6}
          activeStep={this.state.activeStep}
          className={classes.mobileStepper}
          onBack={this.handleOnBack}
          onNext={this.handleOnNext}
          disableBack={this.state.activeStep === 0}
          disableNext={this.state.activeStep === 5}
        />
      </div>
    );
  }
}

export default withStyles(styleSheet)(TextMobileStepper);
