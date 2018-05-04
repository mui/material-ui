import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { imagesData } from './steppersData';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 384,
    width: 'calc(100% - 16px)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
});

class TextMobileStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;

    const maxSteps = imagesData.length;

    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>{`Photo ${this.state.activeStep + 1} of ${maxSteps}`}</Typography>
        </Paper>
        <SwipeableViews
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
          index={this.state.activeStep}
        >
          {imagesData.map(data => (
            <img key={data.alt} className={classes.img} src={data.source} alt={data.alt} />
          ))}
        </SwipeableViews>
        <MobileStepper
          variant="text"
          steps={5}
          position="static"
          activeStep={this.state.activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={this.state.activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

TextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TextMobileStepper);
