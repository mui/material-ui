'use client';
// @inheritedComponent Tooltip
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { emphasize } from '@mui/system/colorManipulator';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Fab from '../Fab';
import Tooltip from '../Tooltip';
import capitalize from '../utils/capitalize';
import speedDialActionClasses, { getSpeedDialActionUtilityClass } from './speedDialActionClasses';
import useSlot from '../utils/useSlot';
import { mergeSlotProps } from '../utils';

const useUtilityClasses = (ownerState) => {
  const { open, tooltipPlacement, classes } = ownerState;

  const slots = {
    fab: ['fab', !open && 'fabClosed'],
    staticTooltip: [
      'staticTooltip',
      `tooltipPlacement${capitalize(tooltipPlacement)}`,
      !open && 'staticTooltipClosed',
    ],
    staticTooltipLabel: ['staticTooltipLabel'],
  };

  return composeClasses(slots, getSpeedDialActionUtilityClass, classes);
};

const SpeedDialActionFab = styled(Fab, {
  name: 'MuiSpeedDialAction',
  slot: 'Fab',
  skipVariantsResolver: false,
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.fab, !ownerState.open && styles.fabClosed];
  },
})(
  memoTheme(({ theme }) => ({
    margin: 8,
    color: (theme.vars || theme).palette.text.secondary,
    backgroundColor: (theme.vars || theme).palette.background.paper,
    '&:hover': {
      backgroundColor: theme.vars
        ? theme.vars.palette.SpeedDialAction.fabHoverBg
        : emphasize(theme.palette.background.paper, 0.15),
    },
    transition: `${theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
    })}, opacity 0.8s`,
    opacity: 1,
    variants: [
      {
        props: ({ ownerState }) => !ownerState.open,
        style: {
          opacity: 0,
          transform: 'scale(0)',
        },
      },
    ],
  })),
);

const SpeedDialActionStaticTooltip = styled('span', {
  name: 'MuiSpeedDialAction',
  slot: 'StaticTooltip',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.staticTooltip,
      !ownerState.open && styles.staticTooltipClosed,
      styles[`tooltipPlacement${capitalize(ownerState.tooltipPlacement)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [`& .${speedDialActionClasses.staticTooltipLabel}`]: {
      transition: theme.transitions.create(['transform', 'opacity'], {
        duration: theme.transitions.duration.shorter,
      }),
      opacity: 1,
    },
    variants: [
      {
        props: ({ ownerState }) => !ownerState.open,
        style: {
          [`& .${speedDialActionClasses.staticTooltipLabel}`]: {
            opacity: 0,
            transform: 'scale(0.5)',
          },
        },
      },
      {
        props: {
          tooltipPlacement: 'left',
        },
        style: {
          [`& .${speedDialActionClasses.staticTooltipLabel}`]: {
            transformOrigin: '100% 50%',
            right: '100%',
            marginRight: 8,
          },
        },
      },
      {
        props: {
          tooltipPlacement: 'right',
        },
        style: {
          [`& .${speedDialActionClasses.staticTooltipLabel}`]: {
            transformOrigin: '0% 50%',
            left: '100%',
            marginLeft: 8,
          },
        },
      },
    ],
  })),
);

const SpeedDialActionStaticTooltipLabel = styled('span', {
  name: 'MuiSpeedDialAction',
  slot: 'StaticTooltipLabel',
  overridesResolver: (props, styles) => styles.staticTooltipLabel,
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    ...theme.typography.body1,
    backgroundColor: (theme.vars || theme).palette.background.paper,
    borderRadius: (theme.vars || theme).shape.borderRadius,
    boxShadow: (theme.vars || theme).shadows[1],
    color: (theme.vars || theme).palette.text.secondary,
    padding: '4px 16px',
    wordBreak: 'keep-all',
  })),
);

const SpeedDialAction = React.forwardRef(function SpeedDialAction(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiSpeedDialAction' });
  const {
    className,
    delay = 0,
    FabProps = {},
    icon,
    id,
    open,
    TooltipClasses,
    tooltipOpen: tooltipOpenProp = false,
    tooltipPlacement = 'left',
    tooltipTitle,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = { ...props, tooltipPlacement };
  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps: {
      fab: FabProps,
      ...slotProps,
      tooltip: mergeSlotProps(
        typeof slotProps.tooltip === 'function' ? slotProps.tooltip(ownerState) : slotProps.tooltip,
        {
          title: tooltipTitle,
          open: tooltipOpenProp,
          placement: tooltipPlacement,
          classes: TooltipClasses,
        },
      ),
    },
  };

  const [tooltipOpen, setTooltipOpen] = React.useState(
    externalForwardedProps.slotProps.tooltip?.open,
  );

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const transitionStyle = { transitionDelay: `${delay}ms` };

  const [FabSlot, fabSlotProps] = useSlot('fab', {
    elementType: SpeedDialActionFab,
    externalForwardedProps,
    ownerState,
    shouldForwardComponentProp: true,
    className: clsx(classes.fab, className),
    additionalProps: {
      style: transitionStyle,
      tabIndex: -1,
      role: 'menuitem',
      size: 'small',
    },
  });

  const [TooltipSlot, tooltipSlotProps] = useSlot('tooltip', {
    elementType: Tooltip,
    externalForwardedProps,
    shouldForwardComponentProp: true,
    ref,
    additionalProps: {
      id,
    },
    ownerState,
    getSlotProps: (handlers) => ({
      ...handlers,
      onClose: (event) => {
        handlers.onClose?.(event);
        handleTooltipClose();
      },
      onOpen: (event) => {
        handlers.onOpen?.(event);
        handleTooltipOpen();
      },
    }),
  });

  const [StaticTooltipSlot, staticTooltipSlotProps] = useSlot('staticTooltip', {
    elementType: SpeedDialActionStaticTooltip,
    externalForwardedProps,
    ownerState,
    ref,
    className: classes.staticTooltip,
    additionalProps: {
      id,
    },
  });

  const [StaticTooltipLabelSlot, staticTooltipLabelSlotProps] = useSlot('staticTooltipLabel', {
    elementType: SpeedDialActionStaticTooltipLabel,
    externalForwardedProps,
    ownerState,
    className: classes.staticTooltipLabel,
    additionalProps: {
      style: transitionStyle,
      id: `${id}-label`,
    },
  });

  const fab = <FabSlot {...fabSlotProps}>{icon}</FabSlot>;

  if (tooltipSlotProps.open) {
    return (
      <StaticTooltipSlot {...staticTooltipSlotProps} {...other}>
        <StaticTooltipLabelSlot {...staticTooltipLabelSlotProps}>
          {tooltipSlotProps.title}
        </StaticTooltipLabelSlot>
        {React.cloneElement(fab, {
          'aria-labelledby': `${id}-label`,
        })}
      </StaticTooltipSlot>
    );
  }

  if (!open && tooltipOpen) {
    setTooltipOpen(false);
  }

  return (
    <TooltipSlot
      {...tooltipSlotProps}
      title={tooltipSlotProps.title}
      open={open && tooltipOpen}
      placement={tooltipSlotProps.placement}
      classes={tooltipSlotProps.classes}
      {...other}
    >
      {fab}
    </TooltipSlot>
  );
});

SpeedDialAction.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   * @default 0
   */
  delay: PropTypes.number,
  /**
   * Props applied to the [`Fab`](https://mui.com/material-ui/api/fab/) component.
   * @default {}
   * @deprecated Use `slotProps.fab` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  FabProps: PropTypes.object,
  /**
   * The icon to display in the SpeedDial Fab.
   */
  icon: PropTypes.node,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    fab: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    staticTooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    staticTooltipLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    fab: PropTypes.elementType,
    staticTooltip: PropTypes.elementType,
    staticTooltipLabel: PropTypes.elementType,
    tooltip: PropTypes.elementType,
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
   * `classes` prop applied to the [`Tooltip`](https://mui.com/material-ui/api/tooltip/) element.
   * @deprecated Use `slotProps.tooltip.classes` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TooltipClasses: PropTypes.object,
  /**
   * Make the tooltip always visible when the SpeedDial is open.
   * @default false
   * @deprecated Use `slotProps.tooltip.open` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  tooltipOpen: PropTypes.bool,
  /**
   * Placement of the tooltip.
   * @default 'left'
   * @deprecated Use `slotProps.tooltip.placement` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  tooltipPlacement: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  /**
   * Label to display in the tooltip.
   * @deprecated Use `slotProps.tooltip.title` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  tooltipTitle: PropTypes.node,
};

export default SpeedDialAction;
