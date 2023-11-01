'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import stepClasses, { getStepUtilityClass } from './stepClasses';
import { StepProps, StepOwnerState, StepTypeMap } from './StepProps';
import useSlot from '../utils/useSlot';
import stepperClasses from '../Stepper/stepperClasses';

const useUtilityClasses = (ownerState: StepOwnerState) => {
  const { size, orientation } = ownerState;

  const slots = {
    root: ['root', orientation, size && `size${capitalize(size)}`],
    indicator: ['indicator'],
  };

  return composeClasses(slots, getStepUtilityClass, {});
};

const THICKNESS = '2px';
const INSET = '0.25rem';
const SIZE = '2.5rem';

/**
 * CSS architecture:
 * - The root is a flex container with direction based on the provided orientation (horizontal by default).
 * - The indicator slot is used to render the icon or text provided in the `indicator` prop.
 *    - It allows the connector to be shown in the middle of the indicator (because the indicator prop is dynamic and it can be different sizes between step).
 *    - If there is no indicator prop, the indicator slot will fill the entire root so that the connector is in the middle.
 * - The connector is a pseudo-element that is absolutely positioned relative to the step's width.
 *    - For horizontal orientation, the connector is a pseudo-element of the root.
 *    - For vertical orientation, the connector is a pseudo-element of the indicator.
 * - Developers can control the CSS variables from the Stepper component.
 */
const StepRoot = styled('li', {
  name: 'JoyStep',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: StepOwnerState }>(({ theme }) => {
  return {
    position: 'relative',
    display: 'flex',
    gridTemplateColumns: 'var(--Stepper-indicatorColumn) 1fr', // for vertical stepper. has no effect on horizontal stepper.
    gridAutoFlow: 'dense',
    flex: 'var(--_Step-flex)',
    flexDirection: 'row',
    alignItems: 'var(--_Step-alignItems, center)',
    justifyContent: 'var(--_Step-justify, center)',
    gap: `var(--Step-gap, ${INSET})`,
    '& > *': { zIndex: 1, [`&:not(.${stepClasses.indicator})`]: { gridColumn: '2' } },
    '&:not([data-last-child])': {
      '&::after': {
        content: '""',
        display: 'block',
        borderRadius: 'var(--Step-connectorRadius)',
        height: `var(--Step-connectorThickness, ${THICKNESS})`,
        background: `var(--Step-connectorBg, ${theme.vars.palette.divider})`,
        flex: 1,
        marginInlineStart: `calc(var(--Step-connectorInset, ${INSET}) - var(--Step-gap, ${INSET}))`,
        marginInlineEnd: `var(--Step-connectorInset, ${INSET})`,
        zIndex: 0,
      },
    },
    [`.${stepperClasses.horizontal} &:not([data-last-child])`]: {
      '--_Step-flex': 'auto', // requires to be `auto` to make equally connectors.
      [`&.${stepClasses.vertical}`]: {
        '--_Step-flex': 1, // requires to be `1` to make equally connectors.
      },
    },
    [`.${stepperClasses.vertical} &`]: {
      display: 'grid',
      '--_Step-justify': 'flex-start',
      '&[data-indicator]': {
        '--Step-indicatorDotSize': '0px',
      },
      '&::after': {
        gridColumn: '1',
        width: `var(--Step-connectorThickness, ${THICKNESS})`,
        height: 'auto',
        margin: `calc(var(--Step-connectorInset, ${THICKNESS}) - var(--Step-gap, ${INSET}) - var(--Step-indicatorDotSize)) auto calc(var(--Step-connectorInset, ${THICKNESS}) - var(--Stepper-verticalGap) - var(--Step-indicatorDotSize))`,
        alignSelf: 'stretch',
      },
    },
    variants: [
      {
        props: { orientation: 'vertical' },
        style: {
          flexDirection: 'column',
          [`.${stepperClasses.horizontal} &`]: {
            '&[data-last-child]': {
              // for horizontal stepper, all vertical steps must have flex `1` to stretch equally.
              '--_Step-flex': 1,
            },
            '&[data-indicator]': {
              '--_Step-justify': 'flex-start',
            },
            '&::after': {
              display: 'none !important',
            },
          },
          [`.${stepperClasses.horizontal} &:not([data-last-child]) .${stepClasses.indicator}`]: {
            '&::after': {
              content: '""',
              display: 'block',
              position: 'absolute',
              height: `var(--Step-connectorThickness, ${THICKNESS})`,
              background: `var(--Step-connectorBg, ${theme.vars.palette.divider})`,
              zIndex: 0,
              top: `calc(var(--StepIndicator-size, ${SIZE}) / 2 - var(--Step-connectorThickness, ${THICKNESS}) / 2)`,
              left: `calc(50% + var(--StepIndicator-size, ${SIZE}) / 2 + var(--Step-connectorInset, ${INSET}))`,
              width: `calc(100% - var(--StepIndicator-size, ${SIZE}) - 2 * var(--Step-connectorInset, ${INSET}))`,
            },
            '&:empty': {
              zIndex: 0,
              width: '100%',
              height: '100%',
              '&::after': {
                top: `calc(50% - var(--Step-connectorThickness, ${THICKNESS}) / 2)`,
                left: '50%',
              },
            },
          },
        },
      },
    ],
  };
});

const StepIndicator = styled('div', {
  name: 'JoyStep',
  slot: 'Indicator',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: StepOwnerState }>({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  placeSelf: 'center', // for vertical stepper
  width: `var(--StepIndicator-size, ${SIZE})`,
  height: `var(--StepIndicator-size, ${SIZE})`,
  position: 'var(--_Step-indicatorPosition, unset)' as React.CSSProperties['position'],
  [`.${stepperClasses.horizontal} &:empty`]: {
    '--_Step-indicatorPosition': 'absolute',
    '--StepIndicator-size': '0px',
    '--Step-connectorInset': '0px',
  },
  [`.${stepperClasses.vertical} &:empty`]: {
    height: 'auto',
    '&::before': {
      content: '""',
      display: 'block',
      width: 'var(--Step-indicatorDotSize)',
      height: 'var(--Step-indicatorDotSize)',
      borderRadius: 'var(--Step-indicatorDotSize)',
      color: 'inherit',
      background: 'currentColor',
    },
  },
});

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
    component = 'li',
    size = 'md',
    children,
    orientation = 'horizontal',
    indicator,
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
    additionalProps: {
      'data-indicator': indicator ? '' : undefined,
    },
  });

  const [SlotIndicator, indicatorProps] = useSlot('indicator', {
    ref,
    className: classes.indicator,
    elementType: StepIndicator,
    externalForwardedProps,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      <SlotIndicator {...indicatorProps}>{indicator}</SlotIndicator>
      {children}
    </SlotRoot>
  );
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
