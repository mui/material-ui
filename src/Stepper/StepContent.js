// @flow

import React from 'react';
import type { Node } from 'react';
import warning from 'warning';
import classNames from 'classnames';
import Collapse from '../transitions/Collapse';
import type { TransitionDuration } from '../transitions/Collapse';
import withStyles from '../styles/withStyles';
import type { Orientation } from './Stepper';

export const styles = (theme: Object) => ({
  root: {
    marginTop: theme.spacing.unit,
    marginLeft: 12, // half icon
    paddingLeft: theme.spacing.unit + 12, // margin + half icon
    paddingRight: theme.spacing.unit,
    borderLeft: `1px solid ${theme.palette.line.stepper}`,
  },
  last: {
    borderLeft: 'none',
  },
  transition: {},
});

type ProvidedProps = {
  classes: Object,
  transition: Function,
  transitionDuration: TransitionDuration,
};

export type Props = {
  /**
   * @ignore
   * Expands the content.
   */
  active?: boolean,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel property.
   */
  alternativeLabel?: boolean,
  /**
   * Step content.
   */
  children: Node,
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
   */
  completed?: boolean,
  /**
   * @ignore
   */
  last?: boolean,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the optional property.
   */
  optional?: boolean,
  /**
   * @ignore
   */
  orientation?: Orientation,
  /**
   * Collapse component.
   */
  transition?: Function,
  /**
   * Adjust the duration of the content expand transition.
   * Passed as a property to the transition component.
   */
  transitionDuration: TransitionDuration,
};

function StepContent(props: ProvidedProps & Props) {
  const {
    active,
    alternativeLabel,
    children,
    className: classNameProp,
    classes,
    completed,
    last,
    transition: Transition,
    transitionDuration,
    orientation,
    optional,
    ...other
  } = props;

  warning(
    orientation === 'vertical',
    'Material-UI: <StepContent /> is only designed for use with the vertical stepper.',
  );

  const className = classNames(
    classes.root,
    {
      [classes.last]: last,
    },
    classNameProp,
  );

  return (
    <div className={className} {...other}>
      <Transition
        in={active}
        className={classes.transition}
        transitionDuration={transitionDuration}
        unmountOnExit
      >
        {children}
      </Transition>
    </div>
  );
}

StepContent.defaultProps = {
  transition: Collapse,
  transitionDuration: 'auto',
};

export default withStyles(styles)(StepContent);
