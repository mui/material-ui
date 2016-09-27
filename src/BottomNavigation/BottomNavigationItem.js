// @flow weak

import React, { PropTypes, cloneElement } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import ButtonBase from '../internal/ButtonBase';

export const styleSheet = createStyleSheet('BottomNavigationItem', (theme) => {
  const { palette, typography } = theme;

  return {
    root: {
      transition: 'color 0.2s, padding-top 0.2s',
      paddingTop: 8,
      paddingBottom: 10,
      paddingLeft: 12,
      paddingRight: 12,
      minWidth: 80,
      maxWidth: 168,
      background: 'none',
      color: palette.text.secondary,
      flex: '1',
    },
    selected: {
      paddingTop: 6,
      color: palette.primary[500],
    },
    selectedIconOnly: {
      paddingTop: 16,
    },
    label: {
      fontSize: 12,
      opacity: 1,
      transition: 'font-size 0.2s, opacity 0.2s',
      transitionDelay: '0.1s',
    },
    selectedLabel: {
      fontSize: typography.fontSize,
    },
    hiddenLabel: {
      opacity: 0,
      transitionDelay: '0s',
    },
    icon: {
      display: 'block',
    },
  };
}, { index: 5 });

export default function BottomNavigationItem(props, context) {
  const {
    label,
    icon: iconProp,
    selected,
    className: classNameProp,
    showLabel: showLabelProp,
    ...other,
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.root, {
    [classes.selected]: selected,
    [classes.selectedIconOnly]: !showLabelProp && !selected,
  }, classNameProp);
  const classNameIcon = classNames(classes.icon, iconProp.props.className);
  const classNameLabel = classNames(classes.label, {
    [classes.selectedLabel]: selected,
    [classes.hiddenLabel]: !showLabelProp && !selected,
  });
  const icon = cloneElement(iconProp, { className: classNameIcon });

  return (
    <ButtonBase className={className} {...other}>
      {icon}
      <div className={classNameLabel}>{label}</div>
    </ButtonBase>
  );
}

BottomNavigationItem.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.node,
  selected: PropTypes.bool,
  showLabel: PropTypes.bool,
};

BottomNavigationItem.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
