'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var StylePropable = require('../mixins/style-propable');

var LinkMenuItem = React.createClass({
  displayName: 'LinkMenuItem',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    index: React.PropTypes.number.isRequired,
    payload: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    target: React.PropTypes.string,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    className: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      active: false,
      disabled: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      hovered: false
    };
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.menuItem;
  },

  getStyles: function getStyles() {
    var style = {
      root: {
        userSelect: 'none',
        cursor: 'pointer',
        display: 'block',
        lineHeight: this.getTheme().height + 'px',
        paddingLeft: this.getTheme().padding,
        paddingRight: this.getTheme().padding
      },
      rootWhenHovered: {
        backgroundColor: this.getTheme().hoverColor
      },
      rootWhenSelected: {
        color: this.getTheme().selectedTextColor
      },
      rootWhenDisabled: {
        cursor: 'default',
        color: this.context.muiTheme.palette.disabledColor
      }
    };

    return style;
  },

  render: function render() {
    var onClickHandler = this.props.disabled ? this._stopLink : undefined;
    // Prevent context menu 'Open In New Tab/Window'
    var linkAttribute = this.props.disabled ? 'data-href' : 'href';
    var link = {};
    link[linkAttribute] = this.props.payload;

    var styles = this.getStyles();

    var linkStyles = this.mergeAndPrefix(styles.root, this.props.selected && styles.rootWhenSelected, this.props.selected && styles.rootWhenSelected, this.props.active && !this.props.disabled && styles.rootWhenHovered, this.props.style, this.props.disabled && styles.rootWhenDisabled);

    return React.createElement(
      'a',
      _extends({
        key: this.props.index,
        target: this.props.target,
        style: linkStyles }, link, {
        className: this.props.className,
        onClick: onClickHandler,
        onMouseEnter: this._handleMouseEnter,
        onMouseLeave: this._handleMouseLeave }),
      this.props.text
    );
  },

  _stopLink: function _stopLink(event) {
    event.preventDefault();
  },

  _handleMouseEnter: function _handleMouseEnter(e) {
    this.setState({ hovered: true });
    if (!this.props.disabled && this.props.onMouseEnter) this.props.onMouseEnter(e);
  },

  _handleMouseLeave: function _handleMouseLeave(e) {
    this.setState({ hovered: false });
    if (!this.props.disabled && this.props.onMouseLeave) this.props.onMouseLeave(e);
  }
});

module.exports = LinkMenuItem;