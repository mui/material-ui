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
import { useStepperContext } from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';
import stepButtonClasses, { getStepButtonUtilityClass } from './stepButtonClasses';
import { useForkRef } from '../utils';

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
  const { children, className, icon, optional, onClick, onKeyDown, ...other } = props;

  const { disabled, active, index } = React.useContext(StepContext);
  const {
    orientation,
    totalSteps,
    focusableIndex,
    registerElementRef,
    handleElementKeyDown,
    setFocusableIndex,
  } = useStepperContext();

  const ownerState = { ...props, orientation };

  const classes = useUtilityClasses(ownerState);

  const nodeRef = React.useRef(null);
  const handleRef = useForkRef(ref, nodeRef);

  React.useLayoutEffect(() => {
    registerElementRef(index, nodeRef, Boolean(disabled));
  }, [index, nodeRef, registerElementRef, disabled]);

  const childProps = {
    icon,
    optional,
  };

  const child = isMuiElement(children, ['StepLabel']) ? (
    React.cloneElement(children, childProps)
  ) : (
    <StepLabel {...childProps}>{children}</StepLabel>
  );

  const handleClick = React.useCallback(() => {
    setFocusableIndex(index);
    onClick?.();
  }, [index, setFocusableIndex, onClick]);

  const handleKeyDown = React.useCallback(
    (event) => {
      onKeyDown?.(event);
      handleElementKeyDown(event);
    },
    [onKeyDown, handleElementKeyDown],
  );

  return (
    <StepButtonRoot
      focusRipple
      disabled={disabled}
      TouchRippleProps={{ className: classes.touchRipple }}
      className={clsx(classes.root, className)}
      ref={handleRef}
      ownerState={ownerState}
      aria-current={active ? 'step' : undefined}
      aria-posinset={index + 1}
      aria-setsize={totalSteps}
      tabIndex={focusableIndex === index ? 0 : -1}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
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
   * The icon displayed by the step label.
   */
  icon: PropTypes.node,
  /**
   * Callback fired when the component is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Callback fired when a key is pressed down.
   */
  onKeyDown: PropTypes.func,
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

export default StepButton;
