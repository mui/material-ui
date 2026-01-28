'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import ButtonBase from '../ButtonBase';
import StepLabel from '../StepLabel';
import isMuiElement from '../utils/isMuiElement';
import StepperContext from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';
import stepButtonClasses, { getStepButtonUtilityClass } from './stepButtonClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, orientation } = ownerState;

  const slots = {
    root: ['root', orientation],
    touchRipple: ['touchRipple'],
  };

  return composeClasses(slots, getStepButtonUtilityClass, classes);
};

const StepButtonRoot = styled(ButtonBase, {
  name: 'MuiStepButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${stepButtonClasses.touchRipple}`]: styles.touchRipple },
      styles.root,
      styles[ownerState.orientation],
    ];
  },
})({
  width: '100%',
  padding: '24px 16px',
  margin: '-24px -16px',
  boxSizing: 'content-box',
  [`& .${stepButtonClasses.touchRipple}`]: {
    color: 'rgba(0, 0, 0, 0.3)',
  },
  variants: [
    {
      props: { orientation: 'vertical' },
      style: {
        justifyContent: 'flex-start',
        padding: '8px',
        margin: '-8px',
      },
    },
  ],
});

const StepButton = React.forwardRef(function StepButton(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiStepButton' });
  const { children, className, getAriaLabel, icon, optional, ...other } = props;

  const stepContext = React.useContext(StepContext);
  const { disabled, active, index, totalSteps = 0 } = stepContext;
  const { orientation } = React.useContext(StepperContext);

  const ownerState = { ...props, orientation };

  const classes = useUtilityClasses(ownerState);

  const childProps = {
    icon,
    optional,
  };

  const child = isMuiElement(children, ['StepLabel']) ? (
    React.cloneElement(children, childProps)
  ) : (
    <StepLabel {...childProps}>{children}</StepLabel>
  );

  // Add aria-label with step position
  let ariaLabel;
  if (getAriaLabel) {
    ariaLabel = getAriaLabel(index, totalSteps);
  } else if (totalSteps > 0 && index !== undefined) {
    ariaLabel = `Step ${index + 1} of ${totalSteps}`;
  }

  return (
    <StepButtonRoot
      focusRipple
      disabled={disabled}
      TouchRippleProps={{ className: classes.touchRipple }}
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      aria-current={active ? 'step' : undefined}
      aria-label={ariaLabel}
      {...other}
    >
      {child}
    </StepButtonRoot>
  );
});

StepButton.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
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
   * Accepts a function which returns a string value that provides a user-friendly name for the step button.
   * This is important for screen reader users.
   * @param {number} index The step's index.
   * @param {number} totalSteps The total number of steps.
   * @returns {string}
   */
  getAriaLabel: PropTypes.func,
  /**
   * The icon displayed by the step label.
   */
  icon: PropTypes.node,
  /**
   * The optional node to display.
   */
  optional: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

StepButton.muiName = 'StepButton';

export default StepButton;
