// @inheritedComponent Tooltip

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { capitalize } from '@material-ui/core/utils';

export const styles = (theme) => ({
  /* Styles applied to the Fab component. */
  fab: {
    margin: 8,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: emphasize(theme.palette.background.paper, 0.15),
    },
    transition: `${theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
    })}, opacity 0.8s`,
    opacity: 1,
  },
  /* Styles applied to the Fab component if `open={false}`. */
  fabClosed: {
    opacity: 0,
    transform: 'scale(0)',
  },
  /* Styles applied to the root element if `tooltipOpen={true}`. */
  staticTooltip: {
    position: 'relative',
    display: 'flex',
    '& $staticTooltipLabel': {
      transition: theme.transitions.create(['transform', 'opacity'], {
        duration: theme.transitions.duration.shorter,
      }),
      opacity: 1,
    },
  },
  /* Styles applied to the root element if `tooltipOpen={true}` and `open={false}`. */
  staticTooltipClosed: {
    '& $staticTooltipLabel': {
      opacity: 0,
      transform: 'scale(0.5)',
    },
  },
  /* Styles applied to the static tooltip label if `tooltipOpen={true}`. */
  staticTooltipLabel: {
    position: 'absolute',
    ...theme.typography.body1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    color: theme.palette.text.secondary,
    padding: '4px 16px',
    wordBreak: 'keep-all',
  },
  /* Styles applied to the root if `tooltipOpen={true}` and `tooltipPlacement="left"`` */
  tooltipPlacementLeft: {
    alignItems: 'center',
    '& $staticTooltipLabel': {
      transformOrigin: '100% 50%',
      right: '100%',
      marginRight: 8,
    },
  },
  /* Styles applied to the root if `tooltipOpen={true}` and `tooltipPlacement="right"`` */
  tooltipPlacementRight: {
    alignItems: 'center',
    '& $staticTooltipLabel': {
      transformOrigin: '0% 50%',
      left: '100%',
      marginLeft: 8,
    },
  },
});

const SpeedDialAction = React.forwardRef(function SpeedDialAction(props, ref) {
  const {
    classes,
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

  const [tooltipOpen, setTooltipOpen] = React.useState(tooltipOpenProp);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const transitionStyle = { transitionDelay: `${delay}ms` };

  const fab = (
    <Fab
      size="small"
      className={clsx(classes.fab, !open && classes.fabClosed, className)}
      tabIndex={-1}
      role="menuitem"
      aria-describedby={`${id}-label`}
      {...FabProps}
      style={{
        ...transitionStyle,
        ...FabProps.style,
      }}
    >
      {icon}
    </Fab>
  );

  if (tooltipOpenProp) {
    return (
      <span
        id={id}
        ref={ref}
        className={clsx(
          classes.staticTooltip,
          !open && classes.staticTooltipClosed,
          classes[`tooltipPlacement${capitalize(tooltipPlacement)}`],
        )}
        {...other}
      >
        <span style={transitionStyle} id={`${id}-label`} className={classes.staticTooltipLabel}>
          {tooltipTitle}
        </span>
        {fab}
      </span>
    );
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

SpeedDialAction.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   */
  delay: PropTypes.number,
  /**
   * Props applied to the [`Fab`](/api/fab/) component.
   */
  FabProps: PropTypes.object,
  /**
   * The Icon to display in the SpeedDial Fab.
   */
  icon: PropTypes.node,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,
  /**
   * If `true`, the tooltip is shown.
   */
  open: PropTypes.bool,
  /**
   * `classes` prop applied to the [`Tooltip`](/api/tooltip/) element.
   */
  TooltipClasses: PropTypes.object,
  /**
   * Make the tooltip always visible when the SpeedDial is open.
   */
  tooltipOpen: PropTypes.bool,
  /**
   * Placement of the tooltip.
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

export default withStyles(styles, { name: 'MuiSpeedDialAction' })(SpeedDialAction);
