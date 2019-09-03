// @inheritedComponent Tooltip

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export const styles = theme => ({
  /* Styles applied to the root (`Tooltip`) component. */
  root: {
    position: 'relative',
  },
  /* Styles applied to the `Tooltip` label wrapper element */
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.primary,
    padding: '5px 16px',
  },
  /* Styles applied to the `Button` component. */
  actionButton: {
    margin: 8,
    color: theme.palette.text.secondary,
    backgroundColor: emphasize(theme.palette.background.default, 0.12),
    '&:hover': {
      backgroundColor: emphasize(theme.palette.background.default, 0.15),
    },
  },
  /* Styles applied to the `Button` or `Paper` component if `open={true}`. */
  button: {
    transition: `${theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
    })}, opacity 0.8s`,
    opacity: 1,
  },
  /* Styles applied to the `Button` or `Paper` component if `open={false}`. */
  buttonClosed: {
    opacity: 0,
    transform: 'scale(0)',
  },
  /* Styles applied to the `Paper` component if `tooltipOpen={true}` */
  textLabel: {
    position: 'absolute',
    right: 65,
    top: 14,
    padding: '5px 16px',
    whiteSpace: 'nowrap'
  },
  /* Styles applied to the root (`span`) component if `tooltipOpen={true}`. */
  tooltipOpenContainer: {
    position: 'relative',
  },
});

const SpeedDialAction = React.forwardRef(function SpeedDialAction(props, ref) {
  const {
    ButtonProps,
    classes,
    className,
    delay = 0,
    icon,
    id,
    onClick,
    onKeyDown,
    open = false,
    TooltipClasses,
    tooltipOpen: tooltipOpenProp = false,
    tooltipPlacement = 'left',
    tooltipTitle,
    ...other
  } = props;

  const [tooltipOpen, setTooltipOpen] = React.useState(tooltipOpenProp);

  const handleTooltipClose = () => setTooltipOpen(false);

  const handleTooltipOpen = () => setTooltipOpen(true);

  const clickProps = { onClick };
  if (typeof document !== 'undefined' && 'ontouchstart' in document.documentElement) {
    let startTime;
    clickProps.onTouchStart = () => {
      startTime = new Date();
    };
    clickProps.onTouchEnd = event => {
      // only perform action if the touch is a tap, i.e. not long press
      if (new Date() - startTime < 500) {
        onClick();
      }
      event.preventDefault();
      event.stopPropagation();
    };
  }

  clickProps.style = { transitionDelay: `${delay}ms` };

  if (ButtonProps.style) {
    ButtonProps.style.transitionDelay = `${delay}ms`;
  }

  const actionButton = (
    <Fab
      size="small"
      className={clsx(
        className,
        classes.button,
        classes.actionButton,
        !open && classes.buttonClosed,
      )}
      tabIndex={-1}
      role="menuitem"
      onKeyDown={onKeyDown}
      {...clickProps}
      {...ButtonProps}
    >
      {icon}
    </Fab>
  );

  if (tooltipOpenProp) {
    return (
      <span className={classes.tooltipOpenContainer}>
        <Paper
          className={clsx(classes.textLabel, classes.button, !open && classes.buttonClosed)}
          {...clickProps}
        >
          <Typography color="inherit">{tooltipTitle}</Typography>
        </Paper>
        {actionButton}
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
      {actionButton}
    </Tooltip>
  );
});

SpeedDialAction.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Props applied to the [`Button`](/api/button/) component.
   */
  ButtonProps: PropTypes.object,
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
   * The Icon to display in the SpeedDial Floating Action Button.
   */
  icon: PropTypes.node,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  open: PropTypes.bool,
  /**
   * Classes applied to the [`Tooltip`](/api/tooltip/) element.
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
