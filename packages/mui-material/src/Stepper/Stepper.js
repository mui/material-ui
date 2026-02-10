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
import { StepperContextProvider } from './StepperContext';
import useRovingTabIndexFocus from './utils/useRovingTabIndexFocus';

const useUtilityClasses = (ownerState) => {
  const { orientation, nonLinear, alternativeLabel, classes } = ownerState;
  const slots = {
    root: ['root', orientation, nonLinear && 'nonLinear', alternativeLabel && 'alternativeLabel'],
  };

  return composeClasses(slots, getStepperUtilityClass, classes);
};

const StepperRoot = styled('ol', {
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
  listStyle: 'none',
  margin: 0,
  padding: 0,
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
  const [isTabList, setIsTabList] = React.useState(false);
  const props = useDefaultProps({ props: inProps, name: 'MuiStepper' });
  const {
    activeStep = 0,
    alternativeLabel = false,
    children,
    className,
    component = 'ol',
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
  const steps = childrenArray.map((step, index) => {
    return React.cloneElement(step, {
      index,
      last: index + 1 === totalSteps,
      ...step.props,
    });
  });

  const {
    registerElementRef: registerElementRefInternal,
    handleElementKeyDown,
    setFocusableIndex,
    focusableIndex,
  } = useRovingTabIndexFocus({
    initialFocusableIndex: activeStep,
    elementCount: totalSteps,
  });

  const registerElementRef = React.useCallback(
    (index, node, disabled) => {
      setIsTabList(true);
      registerElementRefInternal(index, node, disabled);
    },
    [registerElementRefInternal],
  );

  const contextValue = React.useMemo(
    () => ({
      activeStep,
      alternativeLabel,
      connector,
      nonLinear,
      orientation,
      totalSteps,
      handleElementKeyDown,
      setFocusableIndex,
      registerElementRef,
      focusableIndex,
    }),
    [
      activeStep,
      alternativeLabel,
      connector,
      nonLinear,
      orientation,
      totalSteps,
      handleElementKeyDown,
      setFocusableIndex,
      registerElementRef,
      focusableIndex,
    ],
  );

  return (
    <StepperContextProvider value={contextValue}>
      <StepperRoot
        as={component}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        ref={ref}
        aria-orientation={orientation}
        role={isTabList ? 'tablist' : undefined}
        {...other}
      >
        {steps}
      </StepperRoot>
    </StepperContextProvider>
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
