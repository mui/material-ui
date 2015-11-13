'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var TextField = require('./text-field');
var DropDownMenu = require('./drop-down-menu');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');
var ContextPure = require('./mixins/context-pure');

var SelectField = React.createClass({
  displayName: 'SelectField',

  mixins: [StylePropable, ContextPure],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  statics: {
    getChildrenClasses: function getChildrenClasses() {
      return [TextField, DropDownMenu];
    }
  },

  propTypes: {
    errorText: React.PropTypes.string,
    floatingLabelText: React.PropTypes.string,
    selectFieldRoot: React.PropTypes.object,
    underlineStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    errorStyle: React.PropTypes.object,
    hintText: React.PropTypes.string,
    id: React.PropTypes.string,
    multiLine: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onEnterKeyDown: React.PropTypes.func,
    type: React.PropTypes.string,
    rows: React.PropTypes.number,
    inputStyle: React.PropTypes.object,
    iconStyle: React.PropTypes.object,
    floatingLabelStyle: React.PropTypes.object,
    autoWidth: React.PropTypes.bool,
    menuItems: React.PropTypes.array.isRequired,
    menuItemStyle: React.PropTypes.object,
    selectedIndex: React.PropTypes.number,
    style: React.PropTypes.object
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
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      fullWidth: false
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  getStyles: function getStyles() {
    var styles = {
      root: {
        height: 46,
        position: 'relative',
        width: '100%',
        top: 16,
        fontSize: 16
      },
      label: {
        paddingLeft: 0,
        top: 4,
        width: '100%'
      },
      icon: {
        top: 20,
        right: 0
      },
      underline: {
        borderTop: 'none'
      },
      input: {},
      error: {}
    };

    if (!this.props.floatingLabelText) {
      styles.label.top = -6;
      styles.icon.top = 11;

      if (this.props.hintText) {
        styles.root.top = -5;
      } else {
        styles.root.top = -8;
      }
    } else {
      styles.error.bottom = -15;
    }

    return styles;
  },

  render: function render() {
    var styles = this.getStyles();
    var _props = this.props;
    var style = _props.style;
    var labelStyle = _props.labelStyle;
    var iconStyle = _props.iconStyle;
    var underlineStyle = _props.underlineStyle;
    var errorStyle = _props.errorStyle;
    var selectFieldRoot = _props.selectFieldRoot;
    var menuItems = _props.menuItems;
    var disabled = _props.disabled;
    var floatingLabelText = _props.floatingLabelText;
    var floatingLabelStyle = _props.floatingLabelStyle;
    var hintText = _props.hintText;
    var fullWidth = _props.fullWidth;
    var errorText = _props.errorText;

    var other = _objectWithoutProperties(_props, ['style', 'labelStyle', 'iconStyle', 'underlineStyle', 'errorStyle', 'selectFieldRoot', 'menuItems', 'disabled', 'floatingLabelText', 'floatingLabelStyle', 'hintText', 'fullWidth', 'errorText']);

    var textFieldProps = {
      style: this.mergeAndPrefix(styles.input, style),
      floatingLabelText: floatingLabelText,
      floatingLabelStyle: floatingLabelStyle,
      hintText: !hintText && !floatingLabelText ? ' ' : hintText,
      fullWidth: fullWidth,
      errorText: errorText,
      errorStyle: this.mergeAndPrefix(styles.error, errorStyle)
    };
    var dropDownMenuProps = {
      menuItems: menuItems,
      disabled: disabled,
      style: this.mergeAndPrefix(styles.root, selectFieldRoot),
      labelStyle: this.mergeAndPrefix(styles.label, labelStyle),
      iconStyle: this.mergeAndPrefix(styles.icon, iconStyle),
      underlineStyle: this.mergeAndPrefix(styles.underline, underlineStyle),
      autoWidth: false
    };

    return React.createElement(
      TextField,
      textFieldProps,
      React.createElement(DropDownMenu, _extends({}, dropDownMenuProps, other))
    );
  }
});

module.exports = SelectField;