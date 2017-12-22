import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircle from '../internal/svg-icons/CheckCircle';
import withStyles from '../styles/withStyles';
import StepPositionIcon from './StepPositionIcon';

export const styles = theme => ({
  root: {
    display: 'block',
  },
  completed: {
    fill: theme.palette.primary[500],
  },
});

/**
 * @ignore - internal component.
 */
function StepIcon(props) {
  const { completed, icon, active, classes } = props;

  if (typeof icon === 'number' || typeof icon === 'string') {
    if (completed) {
      return <CheckCircle className={classNames(classes.root, classes.completed)} />;
    }
    return <StepPositionIcon className={classes.root} position={icon} active={active} />;
  }

  return icon;
}

StepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Classses for component style customizations.
   */
  classes: PropTypes.object.isRequired,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The icon displayed by the step label.
   */
  icon: PropTypes.node,
};

export default withStyles(styles, { name: 'MuiStepIcon' })(StepIcon);
