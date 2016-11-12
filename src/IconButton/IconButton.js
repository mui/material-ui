// @flow weak
import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import Tooltip from '../internal/Tooltip';
import ButtonBase from '../internal/ButtonBase';
import { isMobile } from '~/utils/utils';
export const styleSheet = createStyleSheet('IconButton', (theme) => {
  return {
    iconButton: {
      /*     display: 'inline-flex',*/
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      flex: '0 0 auto',
      // fontSize: 24,
      //width: 48,
      // height: 48,
      padding: 0,
      borderRadius: '50%',
      backgroundColor: 'transparent',
      color: theme.color,
      zIndex: 1,
      // transition: theme.transition,
    },
    contrast: {
      color: theme.contrast,
    },
    label: {
      width: '100%',
      //   display: 'flex',
      alignItems: 'inherit',
      justifyContent: 'inherit',
      /* '& .material-icons': {
       width: '1em',
       height: '1em',
       },*/
    },
    keyboardFocused: {
      backgroundColor: theme.focusBackground,
    },
    primary: {
      color: theme.primary[500],
    },
    accent: {
      color: theme.accent.A200,
    },
  };
});
styleSheet.registerLocalTheme((theme) => {
  const { palette, transitions } = theme;
  return {
    color: palette.type === 'light' ?
      palette.text.secondary : palette.text.primary,
    contrast: palette.type === 'light' ?
      palette.shades.dark.text.primary : palette.shades.light.text.secondary,
    primary: palette.primary,
    accent: palette.accent,
    transition: transitions.create('background-color', '150ms'),
    focusBackground: palette.text.divider,
  };
});
/**
 * @see https://material.google.com/components/buttons.html
 *
 * ```js
 * import IconButton from 'material-ui/IconButton';
 *
 * const Component = () => <IconButton>delete</IconButton>;
 * ```
 */
export default class IconButton extends Component {
  static propTypes = {
    /**
     * The icon element. If a string is passed,
     * it will be used as a material icon font ligature.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    contrast: PropTypes.bool,
    /**
     * If true, the button will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If false, the ripple effect will be disabled.
     */
    ripple: PropTypes.bool,
    /**
     * @ignore
     */
    theme: PropTypes.object,
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
    contrast: false,
    disabled: false,
    tooltipPosition: 'bottom-center',
    ripple: true,
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
    if (this.props.onMouseLeave) this.props.onMouseLeave(event);
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
      children,
      passchild,
      className,
      contrast,
      theme,
      checkedIcon,
      onMouseLeave,
      onMouseDown,
      onMouseEnter,
      onMouseOut,
      onKeyboardFocus,
      checked,
      icon: iconProp,
      touch,
      tooltip,
      tooltipPosition,
      tooltipStyles,
      classNameRipple,
      labelCls,
      ...other,
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet, theme);
    const tooltipPositiona = tooltipPosition.split('-');
    const tooltipstyle = {
      boxSizing: 'border-box',
    }
    let icon;
    if (iconProp && !checked) {
      icon = <span className="material-icons" aria-hidden="true">{iconProp}</span>;
    } else if (checkedIcon && checked) {
      icon = <span className="material-icons" aria-hidden="true">{checkedIcon}</span>;
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
    return (<ButtonBase
        ref="but"
        className={classNames(classes.iconButton, {
          [classes.contrast]: contrast,
        }, className)}
        centerRipple
        classNameRipple={classNameRipple}
        keyboardFocusedClassName={classes.keyboardFocused}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseOut={this.handleMouseOut}
        onKeyboardFocus={this.handleKeyboardFocus}
        {...other}
      >
        {tooltipElement}
        <span className={classNames(classes.label, labelCls)}>
          {icon}
          {(passchild) && passchild }
          {children }
        </span>
      </ButtonBase>
    );
  }
}
