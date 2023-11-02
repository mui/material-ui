'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import stepClasses from '../Step/stepClasses';
import stepperClasses from '../Stepper/stepperClasses';
import stepButtonClasses from './stepButtonClasses';
import { StepButtonProps, StepButtonOwnerState, StepButtonTypeMap } from './StepButtonProps';
import useSlot from '../utils/useSlot';

const StepButtonRoot = styled('button', {
  name: 'JoyStepButton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: StepButtonOwnerState }>(({ theme }) => {
  return {
    [`.${stepClasses.indicator}:empty + &`]: {
      '--StepIndicator-size': '0px',
      '--Step-gap': '0px',
    },
    [`.${stepClasses.horizontal} &`]: {
      '--_StepButton-gap': 'var(--Step-gap)',
    },
    [`.${stepClasses.horizontal} &::before`]: {
      '--_StepButton-left': 'calc(-1 * (var(--StepIndicator-size) + var(--Step-gap)))',
    },
    [`.${stepClasses.vertical} &::before`]: {
      '--_StepButton-top': 'calc(-1 * (var(--StepIndicator-size) + var(--Step-gap)))',
    },
    [`.${stepperClasses.vertical} &`]: {
      '--_StepButton-alignItems': 'flex-start',
    },
    [`.${stepperClasses.vertical} &::before`]: {
      '--_StepButton-left': 'calc(-1 * (var(--StepIndicator-size) + var(--Step-gap)))',
      '--_StepButton-top': '0px',
    },
    WebkitTapHighlightColor: 'transparent',
    boxSizing: 'border-box',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    position: 'relative',
    padding: 0,
    textDecoration: 'none', // prevent user agent underline when used as anchor
    font: 'inherit',
    display: 'inline-flex',
    flexDirection: 'inherit',
    alignItems: 'var(--_StepButton-alignItems, inherit)',
    gap: 'var(--_StepButton-gap)',
    [theme.focus.selector]: theme.focus.default,
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 'var(--_StepButton-top)',
      right: 0,
      bottom: 0,
      left: 'var(--_StepButton-left)',
    },
  };
});

/**
 *
 * Demos:
 *
 * - [StepButtonper](https://mui.com/joy-ui/react-stepper/)
 *
 * API:
 *
 * - [StepButton API](https://mui.com/joy-ui/api/step/)
 */
const StepButton = React.forwardRef(function StepButton(inProps, ref) {
  const props = useThemeProps<typeof inProps & StepButtonProps>({
    props: inProps,
    name: 'JoyStepButton',
  });

  const { className, component = 'button', children, slots = {}, slotProps = {}, ...other } = props;

  const ownerState = {
    ...props,
    component,
  };

  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(stepButtonClasses.root, className),
    elementType: StepButtonRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      type: 'button',
    },
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<StepButtonTypeMap>;

StepButton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the StepButton if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
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
   * The indicator to display. If provided, a wrapper element will be used.
   */
  indicator: PropTypes.node,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The size of the component.
   * It accepts theme values between 'sm' and 'lg'.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['lg', 'md', 'sm']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    indicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    indicator: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default StepButton;
