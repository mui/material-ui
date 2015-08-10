'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var StylePropable = require('../mixins/style-propable');

var TableRowColumn = React.createClass({
  displayName: 'TableRowColumn',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    columnNumber: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func,
    onHover: React.PropTypes.func,
    onHoverExit: React.PropTypes.func,
    hoverable: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      hoverable: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      hovered: false
    };
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.tableRowColumn;
  },

  getStyles: function getStyles() {
    var theme = this.getTheme();
    var styles = {
      paddingLeft: theme.spacing,
      paddingRight: theme.spacing,
      height: theme.height,
      textAlign: 'left',
      fontSize: 13,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    };

    if (React.Children.count(this.props.children) === 1 && !isNaN(this.props.children)) {
      styles.textAlign = 'right';
    }

    return styles;
  },

  render: function render() {
    var className = 'mui-table-row-column';
    var styles = this.getStyles();
    var handlers = {
      onClick: this._onClick,
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave
    };

    return React.createElement(
      'td',
      _extends({
        key: this.props.key,
        className: className,
        style: this.mergeAndPrefix(styles, this.props.style)
      }, handlers),
      this.props.children
    );
  },

  _onClick: function _onClick(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.columnNumber);
  },

  _onMouseEnter: function _onMouseEnter(e) {
    if (this.props.hoverable) {
      this.setState({ hovered: true });
      if (this.props.onHover) this.props.onHover(e, this.props.columnNumber);
    }
  },

  _onMouseLeave: function _onMouseLeave(e) {
    if (this.props.hoverable) {
      this.setState({ hovered: false });
      if (this.props.onHoverExit) this.props.onHoverExit(e, this.props.columnNumber);
    }
  }

});

module.exports = TableRowColumn;