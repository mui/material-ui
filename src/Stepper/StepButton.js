// @flow
// @inheritedComponent ButtonBase

import React, { Children } from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import StepLabel from './StepLabel';
import type { Orientation } from './Stepper';

const isLabel = child =>
  child &&
  Children.count(child) === 1 &&
  child.type &&
  child.type.muiName &&
  child.type.muiName === 'StepLabel';

export const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    background: 'none',
  },
  alternativeLabel: {
    margin: '0 auto',
  },
});

export type Icon = Element<any> | string | number;

type ProvidedProps = {
  classes: Object,
};

export type Props = {
  /**
   * @ignore
   * Passed in via `Step` - passed through to `StepLabel`.
   */
  active?: boolean,
  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel property.
   */
  alternativeLabel?: boolean,
  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
   */
  children: Element<any>,
  /**
   * @ignore
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * @ignore
   * Sets completed styling. Is passed to StepLabel.
   */
  completed?: boolean,
  /**
   * @ignore
   * Disables the button and sets disabled styling. Is passed to StepLabel.
   */
  disabled?: boolean,
  /**
   * The icon displayed by the step label.
   */
  icon?: Icon,
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
  orientation: Orientation,
};

function StepButton(props: ProvidedProps & Props) {
  const {
    active,
    alternativeLabel,
    children,
    className: classNameProp,
    completed,
    classes,
    disabled,
    icon,
    last,
    optional,
    orientation,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    {
      [classes.alternativeLabel]: alternativeLabel,
    },
    classNameProp,
  );
  const childProps = {
    active,
    alternativeLabel,
    completed,
    disabled,
    icon,
    optional,
    orientation,
  };
  const child = isLabel(children) ? (
    React.cloneElement(children, childProps)
  ) : (
    <StepLabel {...childProps}>{children}</StepLabel>
  );

  return (
    <ButtonBase disabled={disabled} className={className} {...other}>
      {child}
    </ButtonBase>
  );
}

export default withStyles(styles)(StepButton);
