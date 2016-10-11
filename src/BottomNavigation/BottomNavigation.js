// @flow weak

import React, { PropTypes, Children, cloneElement } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

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
    ...other,
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.root, classNameProp);

  const children = Children.map(childrenProp, (child, index) => {
    return cloneElement(child, {
      selected: index === selectedIndex,
      showLabel: child.props.showLabel !== undefined ? child.props.showLabel : showLabel,
      onClick: onChangeIndex.bind(null, index),
    });
  });

  return (
    <div className={className} {...other}>{children}</div>
  );
}

BottomNavigation.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  selectedIndex: PropTypes.number,
  onChangeIndex: PropTypes.func.isRequired,
  showLabel: PropTypes.bool,
};

BottomNavigation.defaultProps = {
  showLabel: true,
};

BottomNavigation.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
