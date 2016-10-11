// @flow weak

import React, { PropTypes, cloneElement } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import ButtonBase from '../internal/ButtonBase';

export const styleSheet = createStyleSheet('BottomNavigationButton', (theme) => {
  const { palette, typography, transitions } = theme;

  return {
    root: {
      transition: `${transitions.create('color', '250ms')}, ${transitions.create('padding-top', '250ms')}`,
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
});

export default function BottomNavigationButton(props, context) {
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
  const classNameIcon = classNames(classes.icon,
    iconProp && typeof iconProp !== 'string' ? iconProp.props.className : null);
  const classNameLabel = classNames(classes.label, {
    [classes.selectedLabel]: selected,
    [classes.hiddenLabel]: !showLabelProp && !selected,
  });
  const icon = typeof iconProp === 'string' ?
    <span className="material-icons">{iconProp}</span> :
    cloneElement(iconProp, { className: classNameIcon });

  return (
    <ButtonBase className={className} {...other}>
      {icon}
      <div className={classNameLabel}>{label}</div>
    </ButtonBase>
  );
}

BottomNavigationButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node,
  icon: PropTypes.node,
  selected: PropTypes.bool,
  showLabel: PropTypes.bool,
};

BottomNavigationButton.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
