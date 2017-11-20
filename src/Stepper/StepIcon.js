// @flow

import React from 'react';
import classNames from 'classnames';
import CheckCircle from '../svg-icons/CheckCircle';
import withStyles from '../styles/withStyles';
import StepPositionIcon from './StepPositionIcon';
import type { Icon } from './StepButton';

export const styles = (theme: Object) => ({
  root: {
    display: 'block',
  },
  completed: {
    fill: theme.palette.primary[500],
  },
});

type ProvidedProps = {
  classes: Object,
};

export type Props = {
  /**
   * Whether this step is active.
   */
  active?: boolean,
  /**
   * Classses for component style customizations.
   */
  classes?: Object,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed?: boolean,
  /**
   * The icon displayed by the step label.
   */
  icon?: Icon,
};

/**
 * @ignore - internal component.
 */
function StepIcon(props: ProvidedProps & Props) {
  const { completed, icon, active, classes } = props;

  if (typeof icon === 'number' || typeof icon === 'string') {
    if (completed) {
      return <CheckCircle className={classNames(classes.root, classes.completed)} />;
    }
    return <StepPositionIcon className={classes.root} position={icon} active={active} />;
  }

  return icon;
}

export default withStyles(styles)(StepIcon);
