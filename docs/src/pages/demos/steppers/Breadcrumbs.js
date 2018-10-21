import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from '@material-ui/core/Icon';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Home from '@material-ui/icons/Home';
import Dashboard from '@material-ui/icons/Dashboard';
import Message from '@material-ui/icons/Message';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
  icon: {
    color: 'black',
    marginRight: theme.spacing.unit,
  },
  step: {
    alignItems: 'center',
    display: 'flex',
  },
  reset: {
    marginTop: theme.spacing.unit * 2,
  },
});

const initialSteps = [
  { icon: Home, label: 'Home', displayed: true },
  { icon: Dashboard, label: 'Dashboard', displayed: true },
  { icon: Message, label: 'Messages', displayed: true },
];

class Breadcrumbs extends React.Component {
  state = {
    steps: initialSteps,
  };

  handleClick = e => {
    const { textContent } = e.target;
    this.setState(state => {
      const { steps } = state;
      const selectedStepIndex = steps.map(step => step.label).indexOf(textContent);
      const updatedSteps = steps.map((step, index) => {
        if (index > selectedStepIndex && index !== 0) {
          return { ...step, ...{ displayed: false } };
        }
        return step;
      });

      return { steps: updatedSteps };
    });
  };

  handleResetState = () => {
    this.setState({ steps: initialSteps });
  };

  render() {
    const { classes } = this.props;
    const { steps } = this.state;
    const lastStep = steps.filter(step => step.displayed === true).length - 1;
    return (
      <div className={classes.root}>
        <AppBar color="default" position="static">
          <Stepper connector={<ChevronRight />}>
            {steps.filter(step => step.displayed === true).map((step, index) => {
              const { icon, label } = step;
              const isDisabled = index === lastStep;
              const buttonProps = {
                className: classes.button,
                disabled: isDisabled,
                disableRipple: true,
                disableFocusRipple: true,
                onMouseDown: this.handleClick,
                size: 'small',
              };
              const typographyProps = {
                disabled: isDisabled,
                color: isDisabled ? 'default' : 'primary',
                variant: 'h6',
              };
              return (
                <div className={classes.step} key={label}>
                  <ButtonBase {...buttonProps}>
                    <Icon className={classes.icon} component={icon} />
                    <Typography {...typographyProps}>{label}</Typography>
                  </ButtonBase>
                </div>
              );
            })}
          </Stepper>
        </AppBar>
        <Button
          className={classes.reset}
          onClick={this.handleResetState}
          color="primary"
          variant="contained"
        >
          Reset
        </Button>
      </div>
    );
  }
}

Breadcrumbs.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Breadcrumbs);
