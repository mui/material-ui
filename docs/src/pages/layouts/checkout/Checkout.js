import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
  toolbarTitle: {
    flex: 1,
  },
  appBarSpacer: {
    ...theme.mixins.toolbar,
  },
  paper: {
    width: 600,
    margin: `${theme.spacing.unit * 6}px auto`,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit}px`,
      padding: theme.spacing.unit * 2,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0`,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      return 'Unknown step';
  }
}

class Checkout extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />

        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap className={classes.toolbarTitle}>
              Company name
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.appBarSpacer} />

        <Paper className={classes.paper}>
          <Typography variant="display1">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => {
              const props = {};
              const labelProps = {};
              return (
                <Step key={label} {...props}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography variant="headline" className={classes.instructions}>
                  Thank you for your order.
                </Typography>
                <Typography variant="subheading" className={classes.instructions}>
                  Your order number is #2001539. We have emailed your oder confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
                <div className={classes.buttons}>
                  <Button onClick={this.handleReset} className={classes.button}>
                    Reset
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={this.handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Paper>
      </div>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Checkout);
