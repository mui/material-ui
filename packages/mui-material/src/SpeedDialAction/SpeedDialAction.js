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
    ...other
  } = props;

  const ownerState = { ...props, tooltipPlacement };
  const classes = useUtilityClasses(ownerState);

  const [tooltipOpen, setTooltipOpen] = React.useState(tooltipOpenProp);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const transitionStyle = { transitionDelay: `${delay}ms` };

  const fab = (
    <SpeedDialActionFab
      size="small"
      className={clsx(classes.fab, className)}
      tabIndex={-1}
      role="menuitem"
      ownerState={ownerState}
      {...FabProps}
      style={{
        ...transitionStyle,
        ...FabProps.style,
      }}
    >
      {icon}
    </SpeedDialActionFab>
  );

  if (tooltipOpenProp) {
    return (
      <SpeedDialActionStaticTooltip
        id={id}
        ref={ref}
        className={classes.staticTooltip}
        ownerState={ownerState}
        {...other}
      >
        <SpeedDialActionStaticTooltipLabel
          style={transitionStyle}
          id={`${id}-label`}
          className={classes.staticTooltipLabel}
          ownerState={ownerState}
        >
          {tooltipTitle}
        </SpeedDialActionStaticTooltipLabel>
        {React.cloneElement(fab, {
          'aria-labelledby': `${id}-label`,
        })}
      </SpeedDialActionStaticTooltip>
    );
  }

  if (!open && tooltipOpen) {
    setTooltipOpen(false);
  }

  return (
    <Tooltip
      id={id}
      ref={ref}
      title={tooltipTitle}
      placement={tooltipPlacement}
      onClose={handleTooltipClose}
      onOpen={handleTooltipOpen}
      open={open && tooltipOpen}
      classes={TooltipClasses}
      {...other}
    >
      {fab}
    </Tooltip>
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
   * Props applied to the [`Fab`](/material-ui/api/fab/) component.
   * @default {}
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * `classes` prop applied to the [`Tooltip`](/material-ui/api/tooltip/) element.
   */
  TooltipClasses: PropTypes.object,
  /**
   * Make the tooltip always visible when the SpeedDial is open.
   * @default false
   */
  tooltipOpen: PropTypes.bool,
  /**
   * Placement of the tooltip.
   * @default 'left'
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
   */
  tooltipTitle: PropTypes.node,
};

export default SpeedDialAction;
