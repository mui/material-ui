'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');
var StylePropable = require('./mixins/style-propable');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');

var rowsHeight = 24;

var styles = {
  textarea: {
    width: '100%',
    resize: 'none',
    font: 'inherit',
    padding: 0
  },
  shadow: {
    width: '100%',
    resize: 'none',
    // Overflow also needed to here to remove the extra row
    // added to textareas in Firefox.
    overflow: 'hidden',
    // Visibility needed to hide the extra text area on ipads
    visibility: 'hidden',
    font: 'inherit',
    padding: 0,
    position: 'absolute'
  }
};

var EnhancedTextarea = React.createClass({
  displayName: 'EnhancedTextarea',

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
    onChange: React.PropTypes.func,
    onHeightChange: React.PropTypes.func,
    textareaStyle: React.PropTypes.object,
    rows: React.PropTypes.number,
    rowsMax: React.PropTypes.number,
    style: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      rows: 1
    };
  },

  getInitialState: function getInitialState() {
    return {
      height: this.props.rows * rowsHeight,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  componentDidMount: function componentDidMount() {
    this._syncHeightWithShadow();
  },

  render: function render() {
    var _props = this.props;
    var onChange = _props.onChange;
    var onHeightChange = _props.onHeightChange;
    var rows = _props.rows;
    var style = _props.style;
    var textareaStyle = _props.textareaStyle;
    var valueLink = _props.valueLink;

    var other = _objectWithoutProperties(_props, ['onChange', 'onHeightChange', 'rows', 'style', 'textareaStyle', 'valueLink']);

    var textareaStyles = this.mergeStyles(styles.textarea, textareaStyle, {
      height: this.state.height
    });

    var shadowStyles = styles.shadow;

    if (this.props.hasOwnProperty('valueLink')) {
      other.value = this.props.valueLink.value;
    }

    if (this.props.disabled) {
      style.cursor = 'default';
    }

    return React.createElement(
      'div',
      { style: this.prepareStyles(this.props.style) },
      React.createElement('textarea', {
        ref: 'shadow',
        style: this.prepareStyles(shadowStyles),
        tabIndex: '-1',
        rows: this.props.rows,
        defaultValue: this.props.defaultValue,
        readOnly: true,
        value: this.props.value,
        valueLink: this.props.valueLink }),
      React.createElement('textarea', _extends({}, other, {
        ref: 'input',
        rows: this.props.rows,
        style: this.prepareStyles(textareaStyles),
        onChange: this._handleChange }))
    );
  },

  getInputNode: function getInputNode() {
    return ReactDOM.findDOMNode(this.refs.input);
  },

  setValue: function setValue(value) {
    this.getInputNode().value = value;
    this._syncHeightWithShadow(value);
  },

  _syncHeightWithShadow: function _syncHeightWithShadow(newValue, e) {
    var shadow = ReactDOM.findDOMNode(this.refs.shadow);

    if (newValue !== undefined) {
      shadow.value = newValue;
    }

    var newHeight = shadow.scrollHeight;

    if (this.props.rowsMax > this.props.rows) {
      newHeight = Math.min(this.props.rowsMax * rowsHeight, newHeight);
    }

    newHeight = Math.max(newHeight, rowsHeight);

    if (this.state.height !== newHeight) {
      this.setState({
        height: newHeight
      });

      if (this.props.onHeightChange) {
        this.props.onHeightChange(e, newHeight);
      }
    }
  },

  _handleChange: function _handleChange(e) {
    this._syncHeightWithShadow(e.target.value);

    if (this.props.hasOwnProperty('valueLink')) {
      this.props.valueLink.requestChange(e.target.value);
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.value !== this.props.value) {
      this._syncHeightWithShadow(nextProps.value);
    }
    var newState = {};
    newState.muiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
  }
});

module.exports = EnhancedTextarea;