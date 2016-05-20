/**
 * PaginatorButton
 *
 */

import React, {Component, PropTypes} from 'react';
import IconButton from '../IconButton';
import ColorManipulator from '../utils/colorManipulator';
import {NavigationChevronLeft, NavigationChevronRight} from '../svg-icons';

class PaginatorButton extends Component {
  static propTypes = {
    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Disable ripple effect on touch focus, true by default
     */
    disableTouchRipple: React.PropTypes.bool,

    /**
     * Should button be disabled
     */
    disabled: React.PropTypes.bool.isRequired,

    /**
     * Icon class name
     */
    iconClassName: React.PropTypes.string,

    /**
     * Override the inline-styles of the icon element.
     */
    iconStyle: React.PropTypes.object,

    /**
     * True if this component should be left button
     */
    isLeftPaginatorButton: React.PropTypes.bool.isRequired,


    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * Icon
     */
    svgIcon: React.PropTypes.bool,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  static defaultProps = {
    disableTouchRipple: true,
  };

  render() {
    const {
      disabled,
      isLeftPaginatorButton,
      style,
      iconStyle,
      ...other,
    } = this.props;

    const {muiTheme} = this.context;

    // tab paginator button width comes from google's design guide
    // https://www.google.com/design/spec/components/tabs.html#tabs-specs
    const themeVariables = muiTheme.tabs;
    let iconClassName = this.props.iconClassName || 'material-icons';
    let materialIcon;

    if (iconClassName === 'material-icons') {
      materialIcon = isLeftPaginatorButton ? 'keyboard_arrow_left' : 'keyboard_arrow_right';
    }

    const svgIcon = this.props.svgIcon;

    if (svgIcon) {
      // remove IconClass
      iconClassName = '';
      materialIcon = isLeftPaginatorButton ? <NavigationChevronLeft /> : <NavigationChevronRight />;
    }

    const styles = {
      buttonStyle: {
        position: 'absolute',
        top: 0,
        zIndex: 1,
        width: 32,
        height: '100%',
        padding: 0,
        backgroundColor: themeVariables.backgroundColor,
      },
      iconStyle: {
        lineHeight: iconStyle && iconStyle.lineHeight ?
          iconStyle.lineHeight : '48px',
        color: iconStyle && iconStyle.color ?
          disabled ?
            ColorManipulator.fade(iconStyle.color, 0.3) :
            iconStyle.color : disabled ?
          muiTheme.tabs.textColor :
          muiTheme.tabs.selectedTextColor,
      },
    };

    if (isLeftPaginatorButton) {
      styles.buttonStyle.left = 0;
    } else {
      styles.buttonStyle.right = 0;
    }

    const btnIconStyle = this.mergeStyles(iconStyle, styles.iconStyle);
    const btnStyle = this.mergeStyles(styles.buttonStyle, style);

    return (
      <IconButton
        {...other}
        disableTouchRipple={this.props.disableTouchRipple}
        disabled={disabled}
        iconClassName={iconClassName}
        iconStyle={btnIconStyle}
        style={btnStyle}
      >
        {materialIcon}
      </IconButton>
    );
  }

  mergeStyles(...args) {
    return Object.assign({}, ...args);
  }
}

export default PaginatorButton;
