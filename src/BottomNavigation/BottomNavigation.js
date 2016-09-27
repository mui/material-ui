// @flow weak

import React, { PropTypes, Children, cloneElement } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('BottomNavigation', (theme) => {
  return {
    root: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      height: 56,
      backgroundColor: theme.palette.background.paper,
    },
  };
}, { index: 5 });

export default function BottomNavigation(props, context) {
  const {
    children: childrenProp,
    className: classNameProp,
    selectedIndex,
    showLabel,
    ...other,
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.root, classNameProp);

  const children = Children.map(childrenProp, (child, index) => {
    return cloneElement(child, {
      selected: index === selectedIndex,
      showLabel,
    });
  });

  return (
    <div className={className} {...other}>{children}</div>
  );
}

BottomNavigation.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  selectedIndex: PropTypes.number,
  showLabel: PropTypes.bool,
};

BottomNavigation.defaultProps = {
  showLabel: true,
};

BottomNavigation.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
