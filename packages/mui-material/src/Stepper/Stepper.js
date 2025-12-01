'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import integerPropType from '@mui/utils/integerPropType';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getStepperUtilityClass } from './stepperClasses';
import StepConnector from '../StepConnector';
import StepperContext from './StepperContext';

const useUtilityClasses = (ownerState) => {
  const { orientation, nonLinear, alternativeLabel, classes } = ownerState;
  const slots = {
    root: ['root', orientation, nonLinear && 'nonLinear', alternativeLabel && 'alternativeLabel'],
  };

  return composeClasses(slots, getStepperUtilityClass, classes);
};

const StepperRoot = styled('div', {
  name: 'MuiStepper',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.root,
      styles[ownerState.orientation],
      ownerState.alternativeLabel && styles.alternativeLabel,
      ownerState.nonLinear && styles.nonLinear,
    ];
  },
})({
  display: 'flex',
  variants: [
    {
      props: { orientation: 'horizontal' },
      style: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    {
      props: { orientation: 'vertical' },
      style: {
        flexDirection: 'column',
      },
    },
    {
      props: { alternativeLabel: true },
      style: {
        alignItems: 'flex-start',
      },
    },
  ],
});

const defaultConnector = <StepConnector />;

const Stepper = React.forwardRef(function Stepper(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiStepper' });
  const {
    activeStep = 0,
    alternativeLabel = false,
    getAriaLabel,
    children,
    className,
    component = 'div',
    connector = defaultConnector,
    nonLinear = false,
    orientation = 'horizontal',
    ...other
  } = props;

  const ownerState = {
    ...props,
    nonLinear,
    alternativeLabel,
    orientation,
    component,
  };

  const classes = useUtilityClasses(ownerState);

  const childrenArray = React.Children.toArray(children).filter(Boolean);
  const totalSteps = childrenArray.length;

  // Detect if stepper contains interactive steps (StepButton)
  const hasInteractiveSteps = React.useMemo(() => {
    return childrenArray.some((step) => {
      const child = step.props?.children;
      if (!child) {
        return false;
      }
      return React.Children.toArray(child).some((c) => c?.type?.muiName === 'StepButton');
    });
  }, [childrenArray]);

  const steps = childrenArray.map((step, index) => {
    return React.cloneElement(step, {
      index,
      last: index + 1 === childrenArray.length,
      ...step.props,
    });
  });
  const contextValue = React.useMemo(
    () => ({ activeStep, alternativeLabel, connector, nonLinear, orientation, totalSteps }),
    [activeStep, alternativeLabel, connector, nonLinear, orientation, totalSteps],
  );

  // Add navigation attributes for interactive steppers
  const navigationProps = hasInteractiveSteps
    ? {
        role: 'navigation',
        'aria-label': getAriaLabel ? getAriaLabel(totalSteps) : `Stepper with ${totalSteps} steps`,
      }
    : {};

  return (
    <StepperContext.Provider value={contextValue}>
      <StepperRoot
        as={component}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        ref={ref}
        {...navigationProps}
        {...other}
      >
        {steps}
      </StepperRoot>
    </StepperContext.Provider>
  );
});

Stepper.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the active step (zero based index).
   * Set to -1 to disable all the steps.
   * @default 0
   */
  activeStep: integerPropType,
  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   * @default false
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the stepper navigation.
   * This is important for screen reader users when the stepper contains interactive steps.
   * @param {number} totalSteps The total number of steps.
   * @returns {string}
   */
  getAriaLabel: PropTypes.func,
  /**
   * Two or more `<Step />` components.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * An element to be placed between each step.
   * @default <StepConnector />
   */
  connector: PropTypes.element,
  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   * @default false
   */
  nonLinear: PropTypes.bool,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Stepper;
