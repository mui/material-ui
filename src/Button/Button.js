// @flow weak
import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import ButtonBase from '../internal/ButtonBase';
import Tooltip from '../internal/Tooltip';
import { getContrastText } from '../styles/palette';
import { isMobile } from '~/utils/utils';

export const styleSheet = createStyleSheet('Button', (theme) => {
  return {
    root: {
      fontSize: theme.fontSize,
      fontWeight: theme.fontWeight,
      fontFamily: theme.fontFamily,
      textTransform: theme.textTransform,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 88,
      height: 36,
      padding: '0px 16px',
      color: theme.color,
      backgroundColor: 'transparent',
      transition: theme.transition,
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: theme.hoverBackgroundColor,
      },
    },
    compact: {
      padding: '0 8px',
      minWidth: 64,
    },
    disabled: {
      opacity: 0.4,
    },
    label: {
      width: '100%',
    /*  display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit',*/
    },
    primary: {
      color: theme.primary[500],
      backgroundColor: theme.accent.A100,
    },
    secondary: {
      color: theme.accent.A200,
      backgroundColor: theme.primary[400],
    },
    accent: {
      color: theme.accent.A200,
    },
    contrast: {
      color: theme.contrastColor,
    },
    raised: {
      color: getContrastText(theme.raised[300]),
      backgroundColor: theme.raised[300],
      boxShadow: theme.shadows[2],
      '&$keyboardFocused': {
        boxShadow: theme.shadows[6],
      },
      '&:hover': {
        backgroundColor: theme.raised.A100,
      },
      '&:active': {
        boxShadow: theme.shadows[8],
      },
      '&$disabled': {
        boxShadow: theme.shadows[0],
      },
    },
    keyboardFocused: {},
    raisedPrimary: {
      color: getContrastText(theme.primary[500]),
      backgroundColor: theme.primary[500],
      '&:hover': {
        backgroundColor: theme.primary[700],
      },
    },
    raisedAccent: {
      color: getContrastText(theme.accent.A200),
      backgroundColor: theme.accent.A200,
      '&:hover': {
        backgroundColor: theme.accent.A400,
      },
    },
    fab: {
      borderRadius: '50%',
      padding: 0,
      minWidth: 0,
      width: 56,
      height: 56,
      boxShadow: theme.shadows[6],
      '&:active': {
        boxShadow: theme.shadows[12],
      },
    },
  };
});
styleSheet.registerLocalTheme((globalTheme) => {
  const { palette, shadows, transitions, typography } = globalTheme;
  return {
    shadows,
    fontSize: typography.fontSize,
    fontWeight: typography.fontWeightMedium,
    fontFamily: typography.fontFamily,
    textTransform: 'uppercase',
    raised: palette.grey,
    primary: palette.primary,
    accent: palette.accent,
    color: palette.text.primary,
    contrastColor: palette.type === 'light' ? palette.shades.dark.primary : palette.shades.light.secondary,
    hoverBackgroundColor: palette.text.divider,
    transition: transitions.multi(['background-color', 'box-shadow'], '250ms'),
  };
});
/**
 * Buttons communicate the action that will occur when the user
 * touches them.
 *
 * ```jsx
 * <Button>Hello World</Button>
 * ```
 */
export default class Button extends Component {
  static propTypes = {
    /**
     * If true, the button will use the theme's accent color.
     */
    accent: PropTypes.bool,
    /**
     * The content of the button.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Uses a smaller minWidth, ideal for things like card actions.
     */
    compact: PropTypes.bool,
    /**
     * The element or component used for the root node.
     */
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * If true, the button will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If true, well use floating action button styling.
     */
    fab: PropTypes.bool,
    /**
     * If true, the button will have a keyboard focus ripple.
     * Ripple must also be true.
     */
    focusRipple: PropTypes.bool,
    /**
     * The URL to link to when the button is clicked.
     * If set, an `a` element will be used as the root node.
     */
    href: PropTypes.string,
    /**
     * If true, the button will use the theme's primary color.
     */
    primary: PropTypes.bool,
    /**
     * If true, the button will use raised styling.
     */
    raised: PropTypes.bool,
    /**
     * If true, the button will have a ripple.
     */
    ripple: PropTypes.bool,
    /**
     * @ignore
     */
    type: PropTypes.string,
    tooltipPosition: PropTypes.cornersAndCenter,
    tooltip: PropTypes.node,
    onKeyboardFocus: PropTypes.func,
    /** @ignore */
    onMouseEnter: PropTypes.func,
    /** @ignore */
    onMouseLeave: PropTypes.func,
    /** @ignore */
    onMouseOut: PropTypes.func,
    touch: PropTypes.bool,
  };
  static defaultProps = {
    accent: false,
    tooltipPosition: 'bottom-center',
    component: 'button',
    compact: false,
    disabled: false,
    fab: false,
    focusRipple: true,
    primary: false,
    secondary: false,
    raised: false,
    ripple: true,
    type: 'button',
  };
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };
  state = {
    tooltipShown: false,
  };
  
  showTooltip() {
    if (this.props.tooltip) {
      this.setState({ tooltipShown: true });
    }
  }
  
  setKeyboardFocus() {
    this.refs.but.setKeyboardFocus();
  }
  
  hideTooltip() {
    if (this.props.tooltip) this.setState({ tooltipShown: false });
  }
  
  handleBlur = (event) => {
    this.hideTooltip();
    if (this.props.onBlur) this.props.onBlur(event);
  };
  handleFocus = (event) => {
    this.showTooltip();
    if (this.props.onFocus) this.props.onFocus(event);
  };
  
  handleMouseDown = (event) => {
    if (this.props.onMouseDown) this.props.onMouseDown(event);
  };
  handleMouseLeave = (event) => {
    if (!this.refs.but.isKeyboardFocused()) this.hideTooltip();
    //  if (this.props.onMouseLeave) this.props.onMouseLeave(event);
  };
  handleMouseOut = (event) => {
    if (this.props.disabled) this.hideTooltip();
    if (this.props.onMouseOut) this.props.onMouseOut(event);
  };
  handleMouseEnter = (event) => {
    this.showTooltip();
    if (this.props.onMouseEnter) this.props.onMouseEnter(event);
  };
  handleKeyboardFocus = (event, keyboardFocused) => {
    if (keyboardFocused && !this.props.disabled) {
      this.showTooltip();
      if (this.props.onFocus) this.props.onFocus(event);
    } else {
      this.hideTooltip();
      if (this.props.onBlur) this.props.onBlur(event);
    }
    if (this.props.onKeyboardFocus) {
      this.props.onKeyboardFocus(event, keyboardFocused);
    }
  };
  
  render() {
    const {
      accent,
      children,
      className: classNameProp,
      onMouseLeave,
      onMouseDown,
      onMouseEnter,
      onMouseOut,
      icon: iconProp,
      compact,
      disabled,
      fab,
      primary,
      secondary,
      raised,
      labelCls,
      labelchildCls,
      tooltip,
      label,
      tooltipPosition,
      tooltipStyles,
      classNameRipple,
      ...other
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const tooltipPositiona = tooltipPosition.split('-');
    const tooltipstyle = {
      boxSizing: 'border-box',
    }
    let icon;
    if (iconProp) {
      icon = <span className="material-icons" aria-hidden="true">{iconProp}</span>;
    }
    const tooltipElement = (!isMobile && tooltip) ? (
      <Tooltip
        ref="tooltip"
        label={tooltip}
        show={this.state.tooltipShown}
        touch={touch}
        style={Object.assign(tooltipstyle, tooltipStyles)}
        verticalPosition={tooltipPositiona[0]}
        horizontalPosition={tooltipPositiona[1]}
      />
    ) : null;
    const flat = !raised && !fab;
    const className = classNames({
      [classes.root]: true,
      [classes.raised]: raised || fab,
      [classes.fab]: fab,
      [classes.primary]: flat && primary,
      [classes.secondary]: flat && secondary,
      [classes.accent]: flat && accent,
      [classes.raisedPrimary]: !flat && primary,
      [classes.raisedAccent]: !flat && accent,
      [classes.compact]: compact,
      [classes.disabled]: disabled,
    }, classNameProp);
    return (
      <ButtonBase
        ref="but"
        className={className}
        disabled={disabled}
        classNameRipple={classNameRipple}
        keyboardFocusedClassName={classes.keyboardFocused}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouseEnter}
        onMouseOut={this.handleMouseOut}
        onKeyboardFocus={this.handleKeyboardFocus}
        {...other}
      >
        {tooltipElement}
        <span className={classNames(classes.label, labelCls)}>
          {icon}
          {children}
          {(label) && [<div className="clearfix"/>, <div className={labelchildCls}>{label}</div>]}
        </span>
      </ButtonBase>
    );
  }
}
