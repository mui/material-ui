// @inheritedComponent ListItem

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import ListItem from '../ListItem';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    ...theme.typography.subtitle1,
    height: 24,
    boxSizing: 'content-box',
    width: 'auto',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    '&$selected': {},
  },
  /* Styles applied to the root element if `disableGutters={false}`. */
  gutters: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  /* Styles applied to the root element if `selected={true}`. */
  selected: {},
});

const MenuItem = React.forwardRef(function MenuItem(props, ref) {
  const { classes, className, component, disableGutters, role, selected, ...other } = props;

  return (
    <ListItem
      button
      role={role}
      tabIndex={-1}
      component={component}
      selected={selected}
      disableGutters={disableGutters}
      className={clsx(
        classes.root,
        {
          [classes.selected]: selected,
          [classes.gutters]: !disableGutters,
        },
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

MenuItem.propTypes = {
  /**
   * Menu item contents.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the left and right padding is removed.
   */
  disableGutters: PropTypes.bool,
  /**
   * @ignore
   */
  role: PropTypes.string,
  /**
   * @ignore
   */
  selected: PropTypes.bool,
};

MenuItem.defaultProps = {
  component: 'li',
  disableGutters: false,
  role: 'menuitem',
};

export default withStyles(styles, { name: 'MuiMenuItem' })(MenuItem);
