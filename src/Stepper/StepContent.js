// @flow

import React from 'react';
import type { Element, ChildrenArray } from 'react';
import warning from 'warning';
import classNames from 'classnames';
import Collapse from '../transitions/Collapse';
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
});

export type TransitionDuration = number | 'auto';

type ProvidedProps = {
  active: boolean,
  alternativeLabel: boolean,
  classes: Object,
  last: boolean,
  optional: boolean,
  orientation: Orientation,
  transition: Function,
  transitionDuration: TransitionDuration,
};

export type Props = {
  /**
   * @ignore
   * Expands the content
   */
  active?: boolean,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel prop.
   */
  alternativeLabel?: boolean,
  /**
   * Step content
   */
  children: ChildrenArray<Element<any>> | Node,
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
   * Set internally by Step when it's supplied with the optional prop.
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
   * Passed as a prop to the transition component.
   */
  transitionDuration: TransitionDuration,
};

function StepContent(props: ProvidedProps & Props) {
  const {
    active,
    alternativeLabel, // eslint-disable-line no-unused-vars
    children,
    className: classNameProp,
    classes,
    completed, // eslint-disable-line no-unused-vars
    last,
    transition,
    transitionDuration,
    orientation,
    optional, // eslint-disable-line no-unused-vars
    ...other
  } = props;

  if (orientation !== 'vertical') {
    warning(
      false,
      'Material-UI: <StepContent /> is only designed for use with the vertical stepper.',
    );
    return null;
  }

  const className = classNames(
    classes.root,
    {
      [classes.last]: last,
    },
    classNameProp,
  );

  const transitionProps = {
    in: active,
    transitionDuration,
    unmountOnExit: true,
  };

  return (
    <div className={className} {...other}>
      {React.createElement(transition, transitionProps, children)}
    </div>
  );
}

StepContent.defaultProps = {
  transition: Collapse,
  transitionDuration: 'auto',
};

StepContent.muiName = 'StepContent';

export default withStyles(styles)(StepContent);
