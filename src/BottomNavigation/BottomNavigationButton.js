// @flow weak

import React, { Component, PropTypes, cloneElement, isValidElement } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import ButtonBase from '../internal/ButtonBase';

export const styleSheet = createStyleSheet('BottomNavigationButton', (theme) => {
  return {
    root: {
      transition: `${
        theme.transitions.create('color', '250ms')}, ${
        theme.transitions.create('padding-top', '250ms')}`,
      paddingTop: 8,
      paddingBottom: 10,
      paddingLeft: 12,
      paddingRight: 12,
      minWidth: 80,
      maxWidth: 168,
      background: 'none',
      color: theme.palette.text.secondary,
      flex: '1',
    },
    selected: {
      paddingTop: 6,
      color: theme.palette.primary[500],
    },
    selectedIconOnly: {
      paddingTop: 16,
    },
    label: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize - 2,
      opacity: 1,
      transition: 'font-size 0.2s, opacity 0.2s',
      transitionDelay: '0.1s',
    },
    selectedLabel: {
      fontSize: theme.typography.fontSize,
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

export default class BottomNavigationButton extends Component {
  static propTypes = {
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The icon element. If a string is passed, it will be used as a material icon font ligature.
     */
    icon: PropTypes.node,
    /**
     * @ignore
     */
    index: PropTypes.number,
    /**
     * The label element.
     */
    label: PropTypes.node,
    /**
     * @ignore
     */
    onChange: PropTypes.func,
    /**
     * @ignore
     */
    onClick: PropTypes.func,
    /**
     * @ignore
     */
    selected: PropTypes.bool,
    /**
     * If `true`, the BottomNavigationButton will show his label.
     */
    showLabel: PropTypes.bool,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  handleChange = (event) => {
    const { onChange, index, onClick } = this.props;

    onChange(event, index);

    if (onClick) {
      onClick(event);
    }
  };

  render() {
    const {
      label,
      icon: iconProp,
      selected,
      className: classNameProp,
      showLabel: showLabelProp,
      onChange, // eslint-disable-line no-unused-vars
      index, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const className = classNames(classes.root, {
      [classes.selected]: selected,
      [classes.selectedIconOnly]: !showLabelProp && !selected,
    }, classNameProp);
    const iconClassName = classNames(classes.icon,
      isValidElement(iconProp) ? iconProp.props.className : null);
    const icon = isValidElement(iconProp) ?
      cloneElement(iconProp, { className: iconClassName }) :
      <span className="material-icons">{iconProp}</span>;
    const labelClassName = classNames(classes.label, {
      [classes.selectedLabel]: selected,
      [classes.hiddenLabel]: !showLabelProp && !selected,
    });

    return (
      <ButtonBase
        className={className}
        focusRipple
        {...other}
        onClick={this.handleChange}
      >
        {icon}
        <span className={labelClassName}>
          {label}
        </span>
      </ButtonBase>
    );
  }
}
