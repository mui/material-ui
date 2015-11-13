'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var EnhancedSwitch = require('./enhanced-switch');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var CheckboxOutline = require('./svg-icons/toggle/check-box-outline-blank');
var CheckboxChecked = require('./svg-icons/toggle/check-box');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');

var Checkbox = React.createClass({
  displayName: 'Checkbox',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
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

  propTypes: {
    checked: React.PropTypes.bool,
    checkedIcon: React.PropTypes.element,
    defaultChecked: React.PropTypes.bool,
    iconStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    onCheck: React.PropTypes.func,
    unCheckedIcon: React.PropTypes.element
  },

  getInitialState: function getInitialState() {
    return {
      switched: this.props.checked || this.props.defaultChecked || this.props.valueLink && this.props.valueLink.value || false,
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
    return this.state.muiTheme.checkbox;
  },

  getStyles: function getStyles() {
    var checkboxSize = 24;
    var styles = {
      icon: {
        height: checkboxSize,
        width: checkboxSize
      },
      check: {
        position: 'absolute',
        opacity: 0,
        transform: 'scale(0)',
        transitionOrigin: '50% 50%',
        transition: Transitions.easeOut('450ms', 'opacity', '0ms') + ', ' + Transitions.easeOut('0ms', 'transform', '450ms'),
        fill: this.getTheme().checkedColor
      },
      box: {
        position: 'absolute',
        opacity: 1,
        fill: this.getTheme().boxColor,
        transition: Transitions.easeOut('2s', null, '200ms')
      },
      checkWhenSwitched: {
        opacity: 1,
        transform: 'scale(1)',
        transition: Transitions.easeOut('0ms', 'opacity', '0ms') + ', ' + Transitions.easeOut('800ms', 'transform', '0ms')
      },
      boxWhenSwitched: {
        transition: Transitions.easeOut('100ms', null, '0ms'),
        fill: this.getTheme().checkedColor
      },
      checkWhenDisabled: {
        fill: this.getTheme().disabledColor
      },
      boxWhenDisabled: {
        fill: this.getTheme().disabledColor
      },
      label: {
        color: this.props.disabled ? this.getTheme().labelDisabledColor : this.getTheme().labelColor
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var iconStyle = _props.iconStyle;
    var onCheck = _props.onCheck;
    var checkedIcon = _props.checkedIcon;
    var unCheckedIcon = _props.unCheckedIcon;

    var other = _objectWithoutProperties(_props, ['iconStyle', 'onCheck', 'checkedIcon', 'unCheckedIcon']);

    var styles = this.getStyles();
    var boxStyles = this.mergeStyles(styles.box, this.state.switched && styles.boxWhenSwitched, iconStyle, this.props.disabled && styles.boxWhenDisabled);
    var checkStyles = this.mergeStyles(styles.check, this.state.switched && styles.checkWhenSwitched, iconStyle, this.props.disabled && styles.checkWhenDisabled);

    var checkedElement = checkedIcon ? React.cloneElement(checkedIcon, {
      style: this.mergeStyles(checkStyles, checkedIcon.props.style)
    }) : React.createElement(CheckboxChecked, {
      style: checkStyles
    });

    var unCheckedElement = unCheckedIcon ? React.cloneElement(unCheckedIcon, {
      style: this.mergeStyles(boxStyles, unCheckedIcon.props.style)
    }) : React.createElement(CheckboxOutline, {
      style: boxStyles
    });

    var checkboxElement = React.createElement(
      'div',
      null,
      unCheckedElement,
      checkedElement
    );

    var rippleColor = this.state.switched ? checkStyles.fill : boxStyles.fill;
    var mergedIconStyle = this.mergeStyles(styles.icon, iconStyle);

    var labelStyle = this.mergeStyles(styles.label, this.props.labelStyle);

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switched: this.state.switched,
      switchElement: checkboxElement,
      rippleColor: rippleColor,
      iconStyle: mergedIconStyle,
      onSwitch: this._handleCheck,
      labelStyle: labelStyle,
      onParentShouldUpdate: this._handleStateChange,
      defaultSwitched: this.props.defaultChecked,
      labelPosition: this.props.labelPosition ? this.props.labelPosition : "right"
    };

    return React.createElement(EnhancedSwitch, _extends({}, other, enhancedSwitchProps));
  },

  isChecked: function isChecked() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setChecked: function setChecked(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },

  _handleCheck: function _handleCheck(e, isInputChecked) {
    if (this.props.onCheck) this.props.onCheck(e, isInputChecked);
  },

  _handleStateChange: function _handleStateChange(newSwitched) {
    this.setState({ switched: newSwitched });
  }

});

module.exports = Checkbox;