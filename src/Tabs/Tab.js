// @flow weak

import React, { Component, PropTypes, cloneElement, isValidElement } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import ButtonBase from '../internal/ButtonBase';

export const styleSheet = createStyleSheet('Tab', (theme) => {
  return {
    root: {
      ...theme.typography.button,
      maxWidth: 264,
      minWidth: 72,
      [theme.breakpoints.up('md')]: {
        minWidth: 160,
      },
      background: 'none',
      padding: 0,
      minHeight: 48,
    },
    rootLabelIcon: {
      minHeight: 72,
    },
    rootAccent: {
      color: theme.palette.text.secondary,
    },
    rootAccentSelected: {
      color: theme.palette.accent[500],
    },
    rootInherit: {
      color: 'inherit',
      opacity: 0.7,
    },
    rootInheritSelected: {
      opacity: 1,
    },
    label: {
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      fontFamily: theme.typography.fontFamily,
      textTransform: 'uppercase',
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 6,
      paddingBottom: 6,
      display: 'block',
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 24,
        paddingRight: 24,
        fontSize: theme.typography.fontSize - 1,
      },
    },
    icon: {
      display: 'block',
    },
  };
});

export default class Tab extends Component {
  static propTypes = {
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * @ignore
     */
    fullWidth: PropTypes.bool,
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
     * @ignore
     */
    style: PropTypes.object,
    /**
     * @ignore
     */
    textColor: PropTypes.oneOfType([
      PropTypes.oneOf([
        'accent',
        'inherit',
      ]),
      PropTypes.string,
    ]),
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
      className: classNameProp,
      fullWidth,
      icon: iconProp,
      index, // eslint-disable-line no-unused-vars
      label: labelProp,
      onChange, // eslint-disable-line no-unused-vars
      selected,
      style: styleProp,
      textColor,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    let icon;

    if (iconProp !== undefined) {
      const iconClassName = classNames(classes.icon,
        isValidElement(iconProp) ? iconProp.props.className : null);
      icon = isValidElement(iconProp) ?
        cloneElement(iconProp, { className: iconClassName }) :
        <span className="material-icons">{iconProp}</span>;
    }

    let label;

    if (labelProp !== undefined) {
      label = (
        <span className={classes.label}>
          {labelProp}
        </span>
      );
    }

    const className = classNames(classes.root, {
      [classes.rootAccent]: textColor === 'accent',
      [classes.rootAccentSelected]: selected && textColor === 'accent',
      [classes.rootInherit]: textColor === 'inherit',
      [classes.rootInheritSelected]: selected && textColor === 'inherit',
      [classes.rootLabelIcon]: icon && label,
    }, classNameProp);

    let style = {};

    if (fullWidth) {
      style.width = '100%';
    }

    if (textColor !== 'accent' && textColor !== 'inherit') {
      style.color = textColor;
    }

    style = Object.keys(style).length > 0 ? {
      ...style,
      ...styleProp,
    } : styleProp;

    return (
      <ButtonBase
        focusRipple
        className={className}
        style={style}
        role="tab"
        aria-selected={selected}
        {...other}
        onClick={this.handleChange}
      >
        {icon}
        {label}
      </ButtonBase>
    );
  }
}
