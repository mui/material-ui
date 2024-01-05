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

const StepperRoot = styled('ol', {
  name: 'JoyStepper',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: StepperOwnerState }>(({ theme }) => {
  return {
    '--Stepper-indicatorColumn': 'auto', // For vertical stepper, to control the column width of the indicator.
    '--Step-connectorThickness': '1px',
    '--Step-indicatorDotSize': '0.375rem',
    boxSizing: 'border-box',
    display: 'flex',
    margin: 0, // Reset browser default style.
    padding: 0, // Reset browser default style.
    variants: [
      {
        props: { size: 'sm' },
        style: {
          '--Stepper-verticalGap': '0.5rem',
          '--Step-gap': '0.375rem',
          '--Step-connectorInset': '0.25rem',
          '--StepIndicator-size': '1.25rem',
          ...theme.typography['title-sm'],
        },
      },
      {
        props: { size: 'md' },
        style: {
          '--Stepper-verticalGap': '0.75rem',
          '--Step-gap': '0.5rem',
          '--Step-connectorInset': '0.375rem',
          '--StepIndicator-size': '1.5rem',
          ...theme.typography['title-md'],
        },
      },
      {
        props: { size: 'lg' },
        style: {
          '--Stepper-verticalGap': '0.75rem',
          '--Step-gap': '0.5rem',
          '--Step-connectorInset': '0.5rem',
          '--StepIndicator-size': '1.75rem',
          ...theme.typography['title-lg'],
        },
      },
      {
        props: { orientation: 'vertical' },
        style: { flexDirection: 'column', gap: 'var(--Stepper-verticalGap)' },
      },
    ],
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
 * - [Stepper API](https://mui.com/joy-ui/api/stepper/)
 */
const Stepper = React.forwardRef(function Stepper(inProps, ref) {
  const props = useThemeProps<typeof inProps & StepperProps>({
    props: inProps,
    name: 'JoyStepper',
  });

  const {
    className,
    component = 'ol',
    size = 'md',
    children,
    orientation = 'horizontal',
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
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
