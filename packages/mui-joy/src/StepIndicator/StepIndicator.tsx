'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getStepIndicatorUtilityClass } from './stepIndicatorClasses';
import {
  StepIndicatorProps,
  StepIndicatorOwnerState,
  StepIndicatorTypeMap,
} from './StepIndicatorProps';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: StepIndicatorOwnerState) => {
  const { color, variant } = ownerState;

  const slots = {
    root: [
      'root',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
    ],
  };

  return composeClasses(slots, getStepIndicatorUtilityClass, {});
};

const StepIndicatorRoot = styled('div', {
  name: 'JoyStepIndicator',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: StepIndicatorOwnerState }>(({ theme, ownerState }) => {
  return {
    '--Icon-fontSize': '1.25em',
    '--Icon-color': 'currentColor',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    font: 'inherit',
    borderRadius: '50%',
    width: 'var(--StepIndicator-size, 2rem)',
    height: 'var(--StepIndicator-size, 2rem)',
    ...theme.variants[ownerState.variant!]?.[ownerState.color!],
  };
});

/**
 *
 * Demos:
 *
 * - [StepIndicator](https://mui.com/joy-ui/react-card/)
 *
 * API:
 *
 * - [StepIndicator API](https://mui.com/joy-ui/api/card/)
 */
const StepIndicator = React.forwardRef(function StepIndicator(inProps, ref) {
  const props = useThemeProps<typeof inProps & StepIndicatorProps>({
    props: inProps,
    name: 'JoyStepIndicator',
  });

  const {
    className,
    component = 'div',
    color = 'neutral',
    children,
    variant = 'soft',
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    color,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: StepIndicatorRoot,
    externalForwardedProps,
    ownerState,
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<StepIndicatorTypeMap>;

StepIndicator.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the StepIndicator if `src` is not set.
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
   * The component orientation.
   * @default 'vertical'
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
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
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

export default StepIndicator;
