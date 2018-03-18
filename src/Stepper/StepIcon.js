import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircle from '../internal/svg-icons/CheckCircle';
import Warning from '../internal/svg-icons/Warning';
import withStyles from '../styles/withStyles';
import StepPositionIcon from './StepPositionIcon';

export const styles = theme => ({
  root: {
    display: 'block',
    '&$active': {
      color: theme.palette.primary.main,
    },
    '&$completed': {
      color: theme.palette.primary.main,
    },
    '&$error': {
      color: theme.palette.error.main,
    },
  },
  active: {},
  completed: {},
  error: {},
});

function StepIcon(props) {
  const { completed, icon, active, error, classes } = props;

  if (typeof icon === 'number' || typeof icon === 'string') {
    if (error) {
      return <Warning className={classNames(classes.root, classes.error)} />;
    }
    if (completed) {
      return <CheckCircle className={classNames(classes.root, classes.completed)} />;
    }
    return (
      <StepPositionIcon
        className={classNames(classes.root, {
          [classes.active]: active,
        })}
        position={icon}
      />
    );
  }

  return icon;
}

StepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * Mark the step as failed.
   */
  error: PropTypes.bool,
  /**
   * The icon displayed by the step label.
   */
  icon: PropTypes.node.isRequired,
};

StepIcon.defaultProps = {
  active: false,
  completed: false,
  error: false,
};

export default withStyles(styles, { name: 'MuiStepIcon' })(StepIcon);
