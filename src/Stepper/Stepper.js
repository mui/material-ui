// @flow
// @inheritedComponent Paper

import React, { Children } from 'react';
import type { Element, Node, ChildrenArray } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';
import StepConnector from './StepConnector';
import Step from './Step';

export const styles = (theme: Object) => ({
  root: {
    display: 'flex',
    padding: theme.spacing.unit * 3,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vertical: {
    flexDirection: 'column',
  },
});

export type Orientation = 'horizontal' | 'vertical';

type ProvidedProps = {
  activeStep: number,
  alternativeLabel: boolean,
  classes: Object,
  connector: Element<any>,
  nonLinear: boolean,
  orientation: Orientation,
};

export type Props = {
  /**
   * Set the active step (zero based index).
   */
  activeStep?: number,
  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   */
  alternativeLabel?: boolean,
  /**
   * Two or more `<Step />` components.
   */
  children: ChildrenArray<Element<typeof Step>>,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * A component to be placed between each step.
   */
  connector?: Element<typeof StepConnector> | Node,
  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   */
  nonLinear?: boolean,
  /**
   * The stepper orientation (layout flow direction).
   */
  orientation?: Orientation,
};

function Stepper(props: ProvidedProps & Props) {
  const {
    activeStep,
    alternativeLabel,
    classes,
    className: classNameProp,
    children,
    connector: connectorProp,
    nonLinear,
    orientation,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    classNameProp,
    alternativeLabel ? null : classes[orientation],
  );

  const connector = connectorProp ? React.cloneElement(connectorProp, { orientation }) : null;
  const childrenArray = Children.toArray(children);
  const steps = childrenArray.map((step, index) => {
    const controlProps = {
      index,
      orientation,
      active: false,
      completed: false,
      disabled: false,
      last: index + 1 === childrenArray.length,
      alternativeLabel,
      connector: connectorProp,
    };

    if (activeStep === index) {
      controlProps.active = true;
    } else if (!nonLinear && activeStep > index) {
      controlProps.completed = true;
    } else if (!nonLinear && activeStep < index) {
      controlProps.disabled = true;
    }

    return [
      !alternativeLabel &&
        connector &&
        index > 0 &&
        React.cloneElement(connector, {
          key: `connect-${index - 1}-to-${index}`, // eslint-disable-line react/no-array-index-key
        }),
      React.cloneElement(step, { ...controlProps, ...step.props }),
    ];
  });

  return (
    <Paper square elevation={0} className={className} {...other}>
      {steps}
    </Paper>
  );
}

Stepper.defaultProps = {
  activeStep: 0,
  alternativeLabel: false,
  connector: <StepConnector />,
  nonLinear: false,
  orientation: 'horizontal',
};

Stepper.muiName = 'Stepper';

export default withStyles(styles)(Stepper);
