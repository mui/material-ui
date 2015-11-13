'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var Paper = require('./paper');
var EnhancedSwitch = require('./enhanced-switch');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');

var Toggle = React.createClass({
  displayName: 'Toggle',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    elementStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    onToggle: React.PropTypes.func,
    toggled: React.PropTypes.bool,
    defaultToggled: React.PropTypes.bool
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  getInitialState: function getInitialState() {
    return {
      switched: this.props.toggled || this.props.defaultToggled || this.props.valueLink && this.props.valueLink.value || false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.toggle;
  },

  getStyles: function getStyles() {
    var toggleSize = 20;
    var toggleTrackWidth = 36;
    var styles = {
      icon: {
        width: 36,
        padding: '4px 0px 6px 2px'
      },
      toggleElement: {
        width: toggleTrackWidth
      },
      track: {
        transition: Transitions.easeOut(),
        width: '100%',
        height: 14,
        borderRadius: 30,
        backgroundColor: this.getTheme().trackOffColor
      },
      thumb: {
        transition: Transitions.easeOut(),
        position: 'absolute',
        top: 1,
        left: 0,
        width: toggleSize,
        height: toggleSize,
        lineHeight: '24px',
        borderRadius: '50%',
        backgroundColor: this.getTheme().thumbOffColor
      },
      trackWhenSwitched: {
        backgroundColor: this.getTheme().trackOnColor
      },
      thumbWhenSwitched: {
        backgroundColor: this.getTheme().thumbOnColor,
        left: '100%'
      },
      trackWhenDisabled: {
        backgroundColor: this.getTheme().trackDisabledColor
      },
      thumbWhenDisabled: {
        backgroundColor: this.getTheme().thumbDisabledColor
      },
      label: {
        color: this.props.disabled ? this.getTheme().labelDisabledColor : this.getTheme().labelColor,
        width: 'calc(100% - ' + (toggleTrackWidth + 10) + 'px)'
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var onToggle = _props.onToggle;

    var other = _objectWithoutProperties(_props, ['onToggle']);

    var styles = this.getStyles();

    var trackStyles = this.mergeStyles(styles.track, this.props.trackStyle, this.state.switched && styles.trackWhenSwitched, this.props.disabled && styles.trackWhenDisabled);

    var thumbStyles = this.mergeStyles(styles.thumb, this.props.thumbStyle, this.state.switched && styles.thumbWhenSwitched, this.props.disabled && styles.thumbWhenDisabled);

    if (this.state.switched) {
      thumbStyles.marginLeft = '-' + thumbStyles.width;
    }

    var toggleElementStyles = this.mergeStyles(styles.toggleElement, this.props.elementStyle);

    var toggleElement = React.createElement(
      'div',
      { style: this.prepareStyles(toggleElementStyles) },
      React.createElement('div', { style: this.prepareStyles(trackStyles) }),
      React.createElement(Paper, { style: thumbStyles, circle: true, zDepth: 1 })
    );

    var customRippleStyle = this.mergeStyles({
      top: -10,
      left: -10
    }, this.props.rippleStyle);

    var rippleColor = this.state.switched ? this.getTheme().thumbOnColor : this.state.muiTheme.textColor;

    var iconStyle = this.mergeStyles(styles.icon, this.props.iconStyle);

    var labelStyle = this.mergeStyles(styles.label, this.props.labelStyle);

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switchElement: toggleElement,
      rippleStyle: customRippleStyle,
      rippleColor: rippleColor,
      iconStyle: iconStyle,
      trackStyle: trackStyles,
      thumbStyle: thumbStyles,
      labelStyle: labelStyle,
      switched: this.state.switched,
      onSwitch: this._handleToggle,
      onParentShouldUpdate: this._handleStateChange,
      defaultSwitched: this.props.defaultToggled,
      labelPosition: this.props.labelPosition ? this.props.labelPosition : "left"
    };

    if (this.props.hasOwnProperty('toggled')) enhancedSwitchProps.checked = this.props.toggled;

    return React.createElement(EnhancedSwitch, _extends({}, other, enhancedSwitchProps));
  },

  isToggled: function isToggled() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setToggled: function setToggled(newToggledValue) {
    this.refs.enhancedSwitch.setSwitched(newToggledValue);
  },

  _handleToggle: function _handleToggle(e, isInputChecked) {
    if (this.props.onToggle) this.props.onToggle(e, isInputChecked);
  },

  _handleStateChange: function _handleStateChange(newSwitched) {
    this.setState({ switched: newSwitched });
  }

});

module.exports = Toggle;