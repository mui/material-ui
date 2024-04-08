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
    '--Icon-fontSize': 'calc(var(--StepIndicator-size, 2rem) / 2)',
    '--Icon-color': 'currentColor',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    font: 'inherit',
    borderRadius: '50%',
    width: 'var(--StepIndicator-size, 1.5rem)',
    height: 'var(--StepIndicator-size, 1.5rem)',
    ...theme.variants[ownerState.variant!]?.[ownerState.color!],
  };
});

/**
 *
 * Demos:
 *
 * - [Stepper](https://mui.com/joy-ui/react-stepper/)
 *
 * API:
 *
 * - [StepIndicator API](https://mui.com/joy-ui/api/step-indicator/)
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
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'soft'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default StepIndicator;
