'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getStepperUtilityClass } from './stepperClasses';
import { StepperProps, StepperOwnerState, StepperTypeMap } from './StepperProps';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: StepperOwnerState) => {
  const { size, orientation } = ownerState;

  const slots = {
    root: ['root', orientation, size && `size${capitalize(size)}`],
  };

  return composeClasses(slots, getStepperUtilityClass, {});
};

export const StyledStepperRoot = styled('ol')<{ ownerState: StepperOwnerState }>(
  ({ theme, ownerState }) => {
    return {};
  },
);

const StepperRoot = styled(StyledStepperRoot, {
  name: 'JoyStepper',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: StepperOwnerState }>({});

/**
 *
 * Demos:
 *
 * - [Stepper](https://mui.com/joy-ui/react-card/)
 *
 * API:
 *
 * - [Stepper API](https://mui.com/joy-ui/api/card/)
 */
const Stepper = React.forwardRef(function Stepper(inProps, ref) {
  const props = useThemeProps<typeof inProps & StepperProps>({
    props: inProps,
    name: 'JoyStepper',
  });

  const {
    className,
    component = 'div',
    size = 'md',
    children,
    orientation = 'vertical',
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    orientation,
    size,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: StepperRoot,
    externalForwardedProps,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        const extraProps: Record<string, any> = {};
        if (index === 0) {
          extraProps['data-first-child'] = '';
        }
        if (index === React.Children.count(children) - 1) {
          extraProps['data-last-child'] = '';
        }
        return React.cloneElement(child, extraProps);
      })}
    </SlotRoot>
  );
}) as OverridableComponent<StepperTypeMap>;

Stepper.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the Stepper if `src` is not set.
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

export default Stepper;
