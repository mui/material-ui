import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  root: {
    height: 24,
  },
  icon: {
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short,
    }),
  },
  iconOpen: {
    transform: 'rotate(45deg)',
  },
  // Style applied to the icon if there is an openIcon, when the SpeedDial is open
  iconWithOpenIconOpen: {
    opacity: 0,
  },
  openIcon: {
    position: 'absolute',
    transition: `${theme.transitions.create('transform', {
      duration: theme.transitions.duration.short,
    })}, ${theme.transitions.create('opacity', {
      duration: theme.transitions.duration.short,
    })}`,
    opacity: 0,
    transform: 'rotate(-45deg)',
  },
  openIconOpen: {
    transform: 'rotate(0deg)',
    opacity: 1,
  },
});

function SpeedDialIcon(props) {
  const { classes, icon: iconProp, open, openIcon: openIconProp, ...other } = props;

  const iconClassName = classNames(classes.icon, {
    [classes.iconOpen]: open,
    [classes.iconWithOpenIconOpen]: openIconProp && open,
  });
  const openIconClassName = classNames(classes.openIcon, { [classes.openIconOpen]: open });

  function formatIcon(icon, className) {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { className });
    }

    return icon;
  }

  return (
    <span className={classes.root} {...other}>
      {openIconProp ? formatIcon(openIconProp, openIconClassName) : null}
      {iconProp ? formatIcon(iconProp, iconClassName) : <AddIcon className={iconClassName} />}
    </span>
  );
}

SpeedDialIcon.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
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

export default withStyles(styles)(SpeedDialIcon);
