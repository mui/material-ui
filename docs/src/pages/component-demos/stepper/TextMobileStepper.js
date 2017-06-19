// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('TextMobileStepper', theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    background: theme.palette.background.default,
  },
}));

class TextMobileStepper extends Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>
            Step {this.state.activeStep + 1} of 6
          </Typography>
        </Paper>
        <MobileStepper
          type="text"
          steps={6}
          position="static"
          activeStep={this.state.activeStep}
          className={classes.mobileStepper}
          onBack={this.handleBack}
          onNext={this.handleNext}
          disableBack={this.state.activeStep === 0}
          disableNext={this.state.activeStep === 5}
        />
      </div>
    );
  }
}

TextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(TextMobileStepper);
