import React from 'react';
import ContextPure from './mixins/context-pure';
import Transitions from './styles/transitions';
import Children from './utils/children';
import ColorManipulator from './utils/color-manipulator';
import {mergeStyles} from './utils/styles';
import Typography from './styles/typography';
import EnhancedButton from './enhanced-button';
import FlatButtonLabel from './buttons/flat-button-label';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

function validateLabel(props, propName, componentName) {
  if (!props.children && !props.label) {
    return new Error('Required prop label or children was not ' +
      'specified in ' + componentName + '.');
  }
}

const FlatButton = React.createClass({

  propTypes: {
    /**
     * Color of button when mouse is not hovering over it.
     */
    backgroundColor: React.PropTypes.string,

    /**
     * Elements passed into the button. For example, the font
     * icon passed into the GitHub button.
     */
    children: React.PropTypes.node,

    /**
     * Disables the button if set to true.
     */
    disabled: React.PropTypes.bool,

    /**
     * Color of button when mouse hovers over.
     */
    hoverColor: React.PropTypes.string,

    /**
     * URL to link to when button clicked if `linkButton` is set to true.
     */
    href: React.PropTypes.string,

    /**
     * Use this property to display an icon.
     */
    icon: React.PropTypes.node,

    /**
     * Label for the button.
     */
    label: validateLabel,

    /**
     * Place label before or after the passed children.
     */
    labelPosition: React.PropTypes.oneOf([
      'before',
      'after',
    ]),

    /**
     * Override the inline-styles of the button's label element.
     */
    labelStyle: React.PropTypes.object,

    /**
     * Enables use of `href` property to provide a URL to link to if set to true.
     */
    linkButton: React.PropTypes.bool,

    /**
     * Called when element is focused by the keyboard.
     */
    onKeyboardFocus: React.PropTypes.func,

    /**
     * Called when the mouse enters the element.
     */
    onMouseEnter: React.PropTypes.func,

    /**
     * Called when the mouse leaves the element.
     */
    onMouseLeave: React.PropTypes.func,

    /**
     * Called when a touch event is started inside the element.
     */
    onTouchStart: React.PropTypes.func,

    /**
     * If true, colors button according to
     * primaryTextColor from the Theme.
     */
    primary: React.PropTypes.bool,

    /**
     * Color for the ripple after button is clicked.
     */
    rippleColor: React.PropTypes.string,

    /**
     * If true, colors button according to secondaryTextColor from the theme.
     * The primary prop has precendent if set to true.
     */
    secondary: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    ContextPure,
  ],

  statics: {
    getRelevantContextKeys(muiTheme) {
      const buttonTheme = muiTheme.button;
      const flatButtonTheme = muiTheme.flatButton;

      return {
        buttonColor: flatButtonTheme.color,
        buttonFilterColor: flatButtonTheme.buttonFilterColor,
        buttonHeight: buttonTheme.height,
        buttonMinWidth: buttonTheme.minWidth,
        disabledTextColor: flatButtonTheme.disabledTextColor,
        primaryTextColor: flatButtonTheme.primaryTextColor,
        secondaryTextColor: flatButtonTheme.secondaryTextColor,
        textColor: flatButtonTheme.textColor,
        textTransform: flatButtonTheme.textTransform ? flatButtonTheme.textTransform :
                      (buttonTheme.textTransform ? buttonTheme.textTransform : 'uppercase'),
      };
    },
    getChildrenClasses() {
      return [
        EnhancedButton,
        FlatButtonLabel,
      ];
    },
  },

  getDefaultProps() {
    return {
      disabled: false,
      labelStyle: {},
      // labelPosition Should be after but we keep it like for now (prevent breaking changes)
      labelPosition: 'before',
      onKeyboardFocus: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      onTouchStart: () => {},
      primary: false,
      secondary: false,
    };
  },

  getInitialState() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      touch: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  _handleKeyboardFocus(e, isKeyboardFocused) {
    this.setState({isKeyboardFocused: isKeyboardFocused});
    this.props.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleMouseEnter(e) {
    //Cancel hover styles for touch devices
    if (!this.state.touch) this.setState({hovered: true});
    this.props.onMouseEnter(e);
  },

  _handleMouseLeave(e) {
    this.setState({hovered: false});
    this.props.onMouseLeave(e);
  },

  _handleTouchStart(e) {
    this.setState({touch: true});
    this.props.onTouchStart(e);
  },

  render() {
    const {
      children,
      disabled,
      hoverColor,
      backgroundColor,
      icon,
      label,
      labelStyle,
      labelPosition,
      primary,
      rippleColor,
      secondary,
      style,
      ...other,
    } = this.props;

    const {
      buttonColor,
      buttonHeight,
      buttonMinWidth,
      disabledTextColor,
      buttonFilterColor,
      primaryTextColor,
      secondaryTextColor,
      textColor,
      textTransform,
    } = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    const defaultTextColor = disabled ? disabledTextColor :
      primary ? primaryTextColor :
      secondary ? secondaryTextColor :
      textColor;

    const defaultHoverColor = ColorManipulator.fade(buttonFilterColor, 0.2);
    const defaultRippleColor = buttonFilterColor;
    const buttonHoverColor = hoverColor || defaultHoverColor;
    const buttonRippleColor = rippleColor || defaultRippleColor;
    const buttonBackgroundColor = backgroundColor || buttonColor;
    const hovered = (this.state.hovered || this.state.isKeyboardFocused) && !disabled;

    const mergedRootStyles = mergeStyles({
      color: defaultTextColor,
      transition: Transitions.easeOut(),
      fontSize: Typography.fontStyleButtonFontSize,
      letterSpacing: 0,
      textTransform: textTransform,
      fontWeight: Typography.fontWeightMedium,
      borderRadius: 2,
      userSelect: 'none',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: hovered ? buttonHoverColor : buttonBackgroundColor,
      lineHeight: buttonHeight + 'px',
      minWidth: buttonMinWidth,
      padding: 0,
      margin: 0,
      //This is need so that ripples do not bleed past border radius.
      //See: http://stackoverflow.com/questions/17298739
      transform: 'translate3d(0, 0, 0)',
    }, style);

    let iconCloned;
    const labelStyleIcon = {};

    if (icon) {
      iconCloned = React.cloneElement(icon, {
        color: mergedRootStyles.color,
        style: {
          verticalAlign: 'middle',
          marginLeft: labelPosition === 'before' ? 0 : 12,
          marginRight: labelPosition === 'before' ? 12 : 0,
        },
      });

      if (labelPosition === 'before') {
        labelStyleIcon.paddingRight = 8;
      } else {
        labelStyleIcon.paddingLeft = 8;
      }
    }

    const labelElement = label ? (
      <FlatButtonLabel label={label} style={mergeStyles(labelStyle, labelStyleIcon)} />
    ) : undefined;

    // Place label before or after children.
    const childrenFragment = labelPosition === 'before' ?
      {
        labelElement,
        iconCloned,
        children,
      }
      :
      {
        children,
        iconCloned,
        labelElement,
      };
    const enhancedButtonChildren = Children.create(childrenFragment);

    return (
      <EnhancedButton
        {...other}
        disabled={disabled}
        focusRippleColor={buttonRippleColor}
        focusRippleOpacity={0.3}
        onKeyboardFocus={this._handleKeyboardFocus}
        onMouseLeave={this._handleMouseLeave}
        onMouseEnter={this._handleMouseEnter}
        onTouchStart={this._handleTouchStart}
        style={mergedRootStyles}
        touchRippleColor={buttonRippleColor}
        touchRippleOpacity={0.3}
      >
        {enhancedButtonChildren}
      </EnhancedButton>
    );
  },
});

export default FlatButton;
