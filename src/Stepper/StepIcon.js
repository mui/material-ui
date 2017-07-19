// @flow

import React from 'react';
import classNames from 'classnames';
import CheckCircle from '../svg-icons/CheckCircle';
import withStyles from '../styles/withStyles';
import StepPositionIcon from './StepPositionIcon';
import type { Icon } from './StepButton';

export const styles = (theme: Object) => ({
  root: {},
  completed: {
    fill: theme.palette.primary[500],
  },
});

type ProvidedProps = {
  active: boolean,
  classes: Object,
  completed: boolean,
  icon: Icon,
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

function StepIcon(props: ProvidedProps & Props) {
  const { completed, icon, active, classes } = props;
  const iconType = typeof icon;

  if (iconType === 'number' || iconType === 'string') {
    if (completed) {
      return <CheckCircle className={classNames(classes.root, classes.completed)} />;
    }
    return <StepPositionIcon position={icon} active={active} />;
  }

  return icon;
}

StepIcon.muiName = 'StepIcon';

export default withStyles(styles)(StepIcon);
