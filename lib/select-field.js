'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
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
    underlineStyle: React.PropTypes.string,
    labelStyle: React.PropTypes.string,
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
    return {};
  },

  getStyles: function getStyles() {
    var styles = {
      root: {
        height: '46px',
        position: 'relative',
        width: '100%',
        top: '16px'
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
    if (this.props.hintText && !this.props.floatingLabelText) {
      styles.root.top = '-5px';
      styles.label.top = '1px';
      styles.icon.top = '17px';
    }
    if (!this.props.hintText && !this.props.floatingLabelText) {
      styles.root.top = '-8px';
    }
    return styles;
  },

  onChange: function onChange(e, index, payload) {
    if (payload) {
      e.target.value = payload[this.props.valueMember] || payload;
    }
    if (this.props.onChange) {
      this.props.onChange(e);
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

    var other = _objectWithoutProperties(_props, ['style', 'labelStyle', 'iconStyle', 'underlineStyle', 'selectFieldRoot', 'onChange', 'menuItems', 'disabled', 'floatingLabelText', 'hintText']);

    var textFieldProps = {
      style: this.mergeAndPrefix(styles.input, style),
      floatingLabelText: floatingLabelText,
      hintText: !hintText && !floatingLabelText ? ' ' : hintText
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