'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import stepClasses, { getStepUtilityClass } from './stepClasses';
import { StepProps, StepOwnerState, StepTypeMap } from './StepProps';
import useSlot from '../utils/useSlot';
import stepperClasses from '../Stepper/stepperClasses';

const useUtilityClasses = (ownerState: StepOwnerState) => {
  const { orientation, active, completed, disabled } = ownerState;

  const slots = {
    root: [
      'root',
      orientation,
      active && 'active',
      completed && 'completed',
      disabled && 'disabled',
    ],
    indicator: ['indicator'],
  };

  return composeClasses(slots, getStepUtilityClass, {});
};

/**
 * CSS architecture:
 * - The root is a flex container with direction based on the provided orientation (horizontal by default).
 * - The indicator slot is used to render the icon or text provided in the `indicator` prop.
 *    - It allows the connector to be shown in the middle of the indicator (because the indicator prop is dynamic and it can be different sizes between step).
 *    - If there is no indicator prop, the indicator will disappear for horizontal Stepper but display a dot for vertical Stepper.
 * - The connector is a pseudo-element that is absolutely positioned relative to the step's width.
 * - Developers can control the CSS variables from the Stepper component or from a specific Step.
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
    gap: `var(--Step-gap)`,
    '& > *': { zIndex: 1, [`&:not(.${stepClasses.indicator})`]: { gridColumn: '2' } },
    '&::after': {
      content: '""',
      display: 'block',
      borderRadius: 'var(--Step-connectorRadius)',
      height: `var(--Step-connectorThickness)`,
      background: `var(--Step-connectorBg, ${theme.vars.palette.divider})`,
      flex: 1,
      marginInlineStart: `calc(var(--Step-connectorInset) - var(--Step-gap))`,
      marginInlineEnd: `var(--Step-connectorInset)`,
      zIndex: 0,
    },
    '&[data-last-child]::after': {
      display: 'none',
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
      '&::after': {
        gridColumn: '1',
        width: `var(--Step-connectorThickness)`,
        height: 'auto',
        margin: `calc(var(--Step-connectorInset) - var(--Step-gap)) auto calc(var(--Step-connectorInset) - var(--Stepper-verticalGap))`,
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
              margin: 0,
              position: 'absolute',
              height: `var(--Step-connectorThickness)`,
              zIndex: 0,
              top: `calc(var(--StepIndicator-size) / 2 - var(--Step-connectorThickness) / 2)`,
              left: `calc(50% + var(--StepIndicator-size) / 2 + var(--Step-connectorInset))`,
              width: `calc(100% - var(--StepIndicator-size) - 2 * var(--Step-connectorInset))`,
            },
            // Eventhough `:has` is <90% support, we can use it because this is an edge case for vertical step without an indicator.
            [`&:has(.${stepClasses.indicator}:empty)::after`]: {
              '--StepIndicator-size': '0px',
              '--Step-connectorInset': '0px',
              top: `calc(50% - var(--Step-connectorThickness) / 2)`,
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
  width: `var(--StepIndicator-size)`,
  height: `var(--StepIndicator-size)`,
  [`.${stepperClasses.horizontal} &:empty`]: {
    display: 'none',
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
 * - [Stepper](https://mui.com/joy-ui/react-stepper/)
 *
 * API:
 *
 * - [Step API](https://mui.com/joy-ui/api/step/)
 */
const Step = React.forwardRef(function Step(inProps, ref) {
  const props = useThemeProps<typeof inProps & StepProps>({
    props: inProps,
    name: 'JoyStep',
  });

  const {
    active = false,
    completed = false,
    className,
    component = 'li',
    children,
    disabled = false,
    orientation = 'horizontal',
    indicator,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    active,
    completed,
    component,
    disabled,
    orientation,
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
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the active className is appended.
   * You can customize the active state from the Stepper's `sx` prop.
   * @default false
   */
  active: PropTypes.bool,
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
   * If `true`, the completed className is appended.
   * You can customize the active state from the Stepper's `sx` prop.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the active className is appended.
   * You can customize the active state from the Stepper's `sx` prop.
   * @default false
   */
  disabled: PropTypes.bool,
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
    PropTypes.func,
    PropTypes.object,
    PropTypes.shape({
      '--LinearProgress-circulation': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-percent': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-progressMaxWidth': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-progressMinWidth': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-progressRadius': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-progressThickness': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-radius': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-thickness': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    PropTypes.shape({
      '__@iterator@86359': PropTypes.func.isRequired,
      '__@unscopables@86607': PropTypes.shape({
        '__@iterator@86359': PropTypes.bool,
        '__@unscopables@86607': PropTypes.bool,
        at: PropTypes.bool,
        concat: PropTypes.bool,
        entries: PropTypes.bool,
        every: PropTypes.bool,
        filter: PropTypes.bool,
        find: PropTypes.bool,
        findIndex: PropTypes.bool,
        flat: PropTypes.bool,
        flatMap: PropTypes.bool,
        forEach: PropTypes.bool,
        includes: PropTypes.bool,
        indexOf: PropTypes.bool,
        join: PropTypes.bool,
        keys: PropTypes.bool,
        lastIndexOf: PropTypes.bool,
        length: PropTypes.bool,
        map: PropTypes.bool,
        reduce: PropTypes.bool,
        reduceRight: PropTypes.bool,
        slice: PropTypes.bool,
        some: PropTypes.bool,
        toLocaleString: PropTypes.bool,
        toString: PropTypes.bool,
        values: PropTypes.bool,
      }).isRequired,
      '--LinearProgress-circulation': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-percent': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-progressMaxWidth': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-progressMinWidth': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-progressRadius': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-progressThickness': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-radius': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-thickness': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      at: PropTypes.func.isRequired,
      concat: PropTypes.func.isRequired,
      entries: PropTypes.func.isRequired,
      every: PropTypes.func.isRequired,
      filter: PropTypes.func.isRequired,
      find: PropTypes.func.isRequired,
      findIndex: PropTypes.func.isRequired,
      flat: PropTypes.func.isRequired,
      flatMap: PropTypes.func.isRequired,
      forEach: PropTypes.func.isRequired,
      includes: PropTypes.func.isRequired,
      indexOf: PropTypes.func.isRequired,
      join: PropTypes.func.isRequired,
      keys: PropTypes.func.isRequired,
      lastIndexOf: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
      map: PropTypes.func.isRequired,
      reduce: PropTypes.func.isRequired,
      reduceRight: PropTypes.func.isRequired,
      slice: PropTypes.func.isRequired,
      some: PropTypes.func.isRequired,
      toLocaleString: PropTypes.func.isRequired,
      toString: PropTypes.func.isRequired,
      values: PropTypes.func.isRequired,
    }),
  ]),
} as any;

export default Step;
