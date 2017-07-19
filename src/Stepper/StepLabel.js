// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import StepIcon from './StepIcon';
import type { Orientation } from './Stepper';
import type { Icon } from './StepButton';

export const styles = (theme: Object) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  horizontal: {},
  vertical: {},
  active: {
    fontWeight: 500,
  },
  completed: {
    fontWeight: 500,
  },
  disabled: {
    cursor: 'default',
  },
  iconContainer: {
    paddingRight: theme.spacing.unit,
  },
  alternativeLabelRoot: {
    flexDirection: 'column',
  },
  alternativeLabel: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2,
  },
});

type ProvidedProps = {
  active: boolean,
  alternativeLabel: boolean,
  classes: Object,
  completed: boolean,
  disabled: boolean,
  icon: Icon,
  last: boolean,
  orientation: Orientation,
};

export type Props = {
  /**
   * @ignore
   * Sets the step as active. Is passed to child components.
   */
  active?: boolean,
  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel prop.
   */
  alternativeLabel?: boolean,
  /**
   * In most cases will simply be a string containing a title for the label.
   */
  children: Node | string,
  /**
   * Custom styles for component.
   */
  classes?: Object,
  /**
   * @ignore
   * Mark the step as completed. Is passed to child components.
   */
  completed?: boolean,
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepLabelButton` is a child of `StepLabel`. Is passed to child components.
   */
  disabled?: boolean,
  /**
   * The icon displayed by the step label - if not set will be set by Step component.
   */
  icon?: Icon,
  /**
   * Icon container class name
   */
  iconContainerClassName?: string,
  /**
   * @ignore
   */
  last?: boolean,
  /**
   * @ignore
   */
  optional?: boolean,
  /**
   * @ignore
   */
  orientation?: Orientation,
};

function StepLabel(props: ProvidedProps & Props) {
  const {
    active,
    completed,
    disabled,
    icon,
    iconContainerClassName: iconContainerClassNameProp,
    orientation,
    alternativeLabel,
    last,
    children,
    classes,
    optional,
    ...other
  } = props;

  const className = classNames(classes.root, classes[orientation], {
    [classes.disabled]: disabled,
    [classes.completed]: completed,
    [classes.alternativeLabelRoot]: alternativeLabel,
  });
  const labelClassName = classNames({
    [classes.alternativeLabel]: alternativeLabel,
    [classes.completed]: completed,
    [classes.active]: active,
  });
  const iconContainerClassName = classNames(
    {
      [classes.iconContainer]: !alternativeLabel,
    },
    iconContainerClassNameProp,
  );

  return (
    <span className={className} {...other}>
      {icon && (
        <span className={iconContainerClassName}>
          <StepIcon
            completed={completed}
            active={active}
            icon={icon}
            alternativeLabel={alternativeLabel}
          />
        </span>
      )}
      <div>
        <Typography type="body1" className={labelClassName}>
          {children}
        </Typography>
        {optional && (
          <Typography type="caption" className={classes.optional}>
            Optional
          </Typography>
        )}
      </div>
    </span>
  );
}

StepLabel.defaultProps = {
  active: false,
  alternativeLabel: false,
  completed: false,
  disabled: false,
  last: false,
  optional: false,
  orientation: 'horizontal',
};

StepLabel.muiName = 'StepLabel';

export default withStyles(styles)(StepLabel);
