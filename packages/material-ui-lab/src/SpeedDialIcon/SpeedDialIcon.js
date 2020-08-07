import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '../internal/svg-icons/Add';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    height: 24,
  },
  /* Styles applied to the icon component. */
  icon: {
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short,
    }),
  },
  /* Styles applied to the icon component if `open={true}`. */
  iconOpen: {
    transform: 'rotate(45deg)',
  },
  /* Styles applied to the icon when and `openIcon` is provided and if `open={true}`. */
  iconWithOpenIconOpen: {
    opacity: 0,
  },
  /* Styles applied to the `openIcon` if provided. */
  openIcon: {
    position: 'absolute',
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short,
    }),
    opacity: 0,
    transform: 'rotate(-45deg)',
  },
  /* Styles applied to the `openIcon` if provided and if `open={true}`. */
  openIconOpen: {
    transform: 'rotate(0deg)',
    opacity: 1,
  },
});

const SpeedDialIcon = React.forwardRef(function SpeedDialIcon(props, ref) {
  const { className, classes, icon: iconProp, open, openIcon: openIconProp, ...other } = props;

  const iconClassName = clsx(classes.icon, {
    [classes.iconOpen]: open,
    [classes.iconWithOpenIconOpen]: openIconProp && open,
  });

  const openIconClassName = clsx(classes.openIcon, { [classes.openIconOpen]: open });

  function formatIcon(icon, newClassName) {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { className: newClassName });
    }

    return icon;
  }

  return (
    <span className={clsx(classes.root, className)} ref={ref} {...other}>
      {openIconProp ? formatIcon(openIconProp, openIconClassName) : null}
      {iconProp ? formatIcon(iconProp, iconClassName) : <AddIcon className={iconClassName} />}
    </span>
  );
});

SpeedDialIcon.propTypes = {
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
   * The icon to display in the SpeedDial Floating Action Button.
   */
  icon: PropTypes.node,
  /**
   * @ignore
   * If `true`, the SpeedDial is open.
   */
  open: PropTypes.bool,
  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon: PropTypes.node,
};

SpeedDialIcon.muiName = 'SpeedDialIcon';

export default withStyles(styles, { name: 'MuiSpeedDialIcon' })(SpeedDialIcon);
