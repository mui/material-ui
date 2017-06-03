// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';

const styleSheet = createStyleSheet('ProgressMobileStepper', {
  root: {
    position: 'relative',
    marginTop: 30,
    width: '100%',
  },
  mobileStepper: {
    position: 'relative',
  },
});

class ProgressMobileStepper extends Component {
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
        <MobileStepper
          kind="progress"
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

export default withStyles(styleSheet)(ProgressMobileStepper);
