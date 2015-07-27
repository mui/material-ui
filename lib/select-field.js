'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var TextField = require('./text-field');
var DropDownMenu = require('./drop-down-menu');

var SelectField = React.createClass({
  displayName: 'SelectField',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    errorText: React.PropTypes.string,
    floatingLabelText: React.PropTypes.string,
    selectFieldRoot: React.PropTypes.string,
    underlineStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
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
    selectedIndex: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      fullWidth: false
    };
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
      input: {}
    };

    if (!this.props.floatingLabelText) {
      if (this.props.hintText) {
        styles.root.top = -5;
        styles.label.top = 1;
        styles.icon.top = 17;
      } else {
        styles.root.top = -8;
      }
    }

    return styles;
  },

  onChange: function onChange(e, index, payload) {
    if (payload) {
      e.target.value = payload[this.props.valueMember] || payload;
    }
    if (this.props.onChange) {
      this.props.onChange(e, index, payload);
    }
  },

  render: function render() {
    var styles = this.getStyles();
    var _props = this.props;
    var style = _props.style;
    var labelStyle = _props.labelStyle;
    var iconStyle = _props.iconStyle;
    var underlineStyle = _props.underlineStyle;
    var selectFieldRoot = _props.selectFieldRoot;
    var onChange = _props.onChange;
    var menuItems = _props.menuItems;
    var disabled = _props.disabled;
    var floatingLabelText = _props.floatingLabelText;
    var hintText = _props.hintText;
    var fullWidth = _props.fullWidth;
    var errorText = _props.errorText;

    var other = _objectWithoutProperties(_props, ['style', 'labelStyle', 'iconStyle', 'underlineStyle', 'selectFieldRoot', 'onChange', 'menuItems', 'disabled', 'floatingLabelText', 'hintText', 'fullWidth', 'errorText']);

    var textFieldProps = {
      style: this.mergeAndPrefix(styles.input, style),
      floatingLabelText: floatingLabelText,
      hintText: !hintText && !floatingLabelText ? ' ' : hintText,
      fullWidth: fullWidth,
      errorText: errorText
    };
    var dropDownMenuProps = {
      onChange: this.onChange,
      menuItems: menuItems,
      disabled: disabled,
      style: this.mergeAndPrefix(styles.root, selectFieldRoot),
      labelStyle: this.mergeAndPrefix(styles.label, labelStyle),
      iconStyle: this.mergeAndPrefix(styles.icon, iconStyle),
      underlineStyle: this.mergeAndPrefix(styles.underline),
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