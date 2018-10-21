// @inheritedComponent ListItem

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ListItem from '../ListItem';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    ...theme.typography.subheading,
    height: 24,
    boxSizing: 'content-box',
    width: 'auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&$selected': {},
  },
  /* Styles applied to the inner `component` element if `disableGutters={false}`. */
  gutters: theme.mixins.gutters(),
  /* Styles applied to the root element if `selected={true}`. */
  selected: {},
});

function MenuItem(props) {
  const {
    classes,
    className: classNameProp,
    component,
    selected,
    role,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    {
      [classes.selected]: selected,
    },
    classNameProp,
  );

  return (
    <ListItem
      button
      role={role}
      tabIndex={-1}
      selected={selected}
      className={className}
      component={component}
      classes={classNames({
        gutters: classes.gutters,
      })}
      {...other}
    />
  );
}

MenuItem.propTypes = {
  /**
   * Menu item contents.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
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
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
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
  role: 'menuitem',
};

export default withStyles(styles, { name: 'MuiMenuItem' })(MenuItem);
