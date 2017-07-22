// @flow weak

import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiBottomNavigation', theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    height: 56,
    backgroundColor: theme.palette.background.paper,
  },
}));

function BottomNavigation(props) {
  const {
    children: childrenProp,
    classes,
    className: classNameProp,
    value,
    onChange,
    showLabels,
    ...other
  } = props;

  const className = classNames(classes.root, classNameProp);

  const children = Children.map(childrenProp, (child, childIndex) => {
    return cloneElement(child, {
      selected: childIndex === value,
      showLabel: child.props.showLabel !== undefined ? child.props.showLabel : showLabels,
      value: child.props.value || childIndex,
      onChange,
    });
  });

  return (
    <div className={className} {...other}>
      {children}
    </div>
  );
}

BottomNavigation.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {any} value We default to the index of the child
   */
  onChange: PropTypes.func,
  /**
   * If `true`, all `BottomNavigationButton`s will show their labels.
   * By default only the selected `BottomNavigationButton` will show its label.
   */
  showLabels: PropTypes.bool,
  /**
   * The value of the currently selected `BottomNavigationButton`.
   */
  value: PropTypes.any,
};

BottomNavigation.defaultProps = {
  showLabels: false,
};

export default withStyles(styleSheet)(BottomNavigation);
