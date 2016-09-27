// @flow weak

import React, { PropTypes, Children, cloneElement } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';

export const styleSheet = createStyleSheet('BottomNavigation', (theme) => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      height: 56,
      backgroundColor: theme.palette.background.paper,
    },
  };
});

export default function BottomNavigation(props, context) {
  const {
    children: childrenProp,
    className: classNameProp,
    selectedIndex,
    showLabel,
    onChangeIndex,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.root, classNameProp);

  const children = Children.map(childrenProp, (child, index) => {
    return cloneElement(child, {
      selected: index === selectedIndex,
      showLabel: child.props.showLabel !== undefined ? child.props.showLabel : showLabel,
      index,
      onChangeIndex,
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
   * The content of the BottomNavigation.
   */
  children: PropTypes.node.isRequired,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Function called when index change.
   */
  onChangeIndex: PropTypes.func,
  /**
   * The index of the currently selected navigation item.
   */
  selectedIndex: PropTypes.number,
  /**
   * If true, all the selected BottomNavigationButton will show his label.
   * If false, only the selected BottomNavigationButton will show his label.
   */
  showLabel: PropTypes.bool.isRequired,
};

BottomNavigation.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
