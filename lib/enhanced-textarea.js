'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var AutoPrefix = require('./styles/auto-prefix');

var EnhancedTextarea = React.createClass({
  displayName: 'EnhancedTextarea',

  mixins: [StylePropable],

  propTypes: {
    onChange: React.PropTypes.func,
    onHeightChange: React.PropTypes.func,
    textareaStyle: React.PropTypes.object,
    rows: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      rows: 1
    };
  },

  getInitialState: function getInitialState() {
    return {
      height: this.props.rows * 24
    };
  },

  componentDidMount: function componentDidMount() {
    this._syncHeightWithShadow();
  },

  getStyles: function getStyles() {
    var styles = {
      root: {
        width: '100%',
        resize: 'none',
        overflow: 'hidden',
        font: 'inherit',
        padding: 0
      }
    };
    return styles;
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

    var styles = this.getStyles().root;

    var textAreaStyles = {
      width: '100%',
      resize: 'none',
      overflow: 'hidden',
      font: 'inherit',
      padding: 0
    };

    var inputStyles = this.mergeAndPrefix(styles, {
      height: this.state.height + 'px'
    });

    inputStyles = this.mergeAndPrefix(inputStyles, textareaStyle);

    // Overflow also needed to here to remove the extra row
    // added to textareas in Firefox.
    var shadowStyles = this.mergeAndPrefix(textAreaStyles, {
      position: 'absolute',
      opacity: 0
    });

    if (this.props.hasOwnProperty('valueLink')) {
      other.value = this.props.valueLink.value;
    }
    if (this.props.disabled) {
      style.cursor = 'default';
    }

    return React.createElement(
      'div',
      { style: this.props.style },
      React.createElement('textarea', {
        ref: 'shadow',
        style: AutoPrefix.all(shadowStyles),
        tabIndex: '-1',
        rows: this.props.rows,
        defaultValue: this.props.defaultValue,
        readOnly: true,
        value: this.props.value,
        valueLink: this.props.valueLink }),
      React.createElement('textarea', _extends({}, other, {
        ref: 'input',
        rows: this.props.rows,
        style: AutoPrefix.all(inputStyles),
        onChange: this._handleChange }))
    );
  },

  getInputNode: function getInputNode() {
    return React.findDOMNode(this.refs.input);
  },

  setValue: function setValue(value) {
    this.getInputNode().value = value;
    this._syncHeightWithShadow(value);
  },

  _syncHeightWithShadow: function _syncHeightWithShadow(newValue, e) {
    var shadow = React.findDOMNode(this.refs.shadow);
    var currentHeight = this.state.height;
    var newHeight = undefined;

    if (newValue !== undefined) {
      shadow.value = newValue;
    }
    newHeight = shadow.scrollHeight;

    if (currentHeight !== newHeight) {
      this.setState({ height: newHeight });
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

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this._syncHeightWithShadow(nextProps.value);
    }
  }
});

module.exports = EnhancedTextarea;