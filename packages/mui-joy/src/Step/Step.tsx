'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getStepUtilityClass } from './stepClasses';
import { StepProps, StepOwnerState, StepTypeMap } from './StepProps';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: StepOwnerState) => {
  const { size, orientation } = ownerState;

  const slots = {
    root: ['root', orientation, size && `size${capitalize(size)}`],
  };

  return composeClasses(slots, getStepUtilityClass, {});
};

export const StyledStepRoot = styled('li')<{ ownerState: StepOwnerState }>(
  ({ theme, ownerState }) => {
    return {};
  },
);

const StepRoot = styled(StyledStepRoot, {
  name: 'JoyStep',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: StepOwnerState }>({});

/**
 *
 * Demos:
 *
 * - [Step](https://mui.com/joy-ui/react-card/)
 *
 * API:
 *
 * - [Step API](https://mui.com/joy-ui/api/card/)
 */
const Step = React.forwardRef(function Step(inProps, ref) {
  const props = useThemeProps<typeof inProps & StepProps>({
    props: inProps,
    name: 'JoyStep',
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
    elementType: StepRoot,
    externalForwardedProps,
    ownerState,
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<StepTypeMap>;

Step.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the Step if `src` is not set.
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

export default Step;
