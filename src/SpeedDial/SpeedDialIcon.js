import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '../styles';
import Icon from '../Icon';
import AddIcon from '../internal/svg-icons/Add';

const styles = theme => ({
  root: {
    height: 24,
  },
  icon: {
    transition: `${theme.transitions.create('transform', {
      duration: theme.transitions.duration.short,
    })}, ${theme.transitions.create('opacity', {
      duration: theme.transitions.duration.short,
    })}`,
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
  },
  openIconOpen: {
    transform: 'rotate(0deg)',
    opacity: 1,
  },
});

class SpeedDialIcon extends React.Component {
  render() {
    const { classes, icon: iconProp, open, openIcon: openIconProp, ...other } = this.props;

    const iconClassName = classNames(classes.icon, {
      [classes.iconOpen]: !iconProp && open,
      [classes.iconWithOpenIconOpen]: openIconProp && open,
    });
    const openIconClassName = classNames(classes.openIcon, { [classes.openIconOpen]: open });

    function formatIcon(icon, className) {
      if (React.isValidElement(icon)) {
        return React.cloneElement(icon, { className });
      } else if (typeof icon === 'string') {
        return <Icon className={className}>{icon}</Icon>;
      }
      return icon;
    }

    const icon = iconProp ? (
      formatIcon(iconProp, iconClassName)
    ) : (
      <AddIcon className={iconClassName} />
    );
    const openIcon = openIconProp ? formatIcon(openIconProp, openIconClassName) : null;

    return (
      <span className={classes.root} {...other}>
        {openIcon}
        {icon}
      </span>
    );
  }
}

SpeedDialIcon.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * The Icon to display in the SpeedDial Floating Action Button.
   */
  icon: PropTypes.node,
  /**
   * @ignore
   * If `true`, the SpeedDial is open.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The Icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon: PropTypes.node,
};

SpeedDialIcon.defaultProps = {
  hidden: false,
  open: false,
};

SpeedDialIcon.muiName = 'SpeedDialIcon';

export default withStyles(styles)(SpeedDialIcon);
