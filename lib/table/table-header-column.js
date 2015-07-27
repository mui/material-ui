'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Tooltip = require('../tooltip');

var TableHeaderColumn = React.createClass({
  displayName: 'TableHeaderColumn',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    tooltip: React.PropTypes.string,
    columnNumber: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func
  },

  getInitialState: function getInitialState() {
    return {
      hovered: false
    };
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.tableHeaderColumn;
  },

  getStyles: function getStyles() {
    var theme = this.getTheme();
    var styles = {
      root: {
        fontWeight: 'normal',
        fontSize: 12,
        paddingLeft: theme.spacing,
        paddingRight: theme.spacing,
        height: theme.height,
        textAlign: 'left',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        color: this.getTheme().textColor,
        position: 'relative'
      },
      tooltip: {
        boxSizing: 'border-box',
        marginTop: theme.height
      }
    };

    return styles;
  },

  render: function render() {
    var className = 'mui-table-header-column';
    var styles = this.getStyles();
    var handlers = {
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave,
      onClick: this._onClick
    };
    var tooltip = undefined;

    if (this.props.tooltip !== undefined) {
      tooltip = React.createElement(Tooltip, {
        label: this.props.tooltip,
        show: this.state.hovered,
        style: this.mergeStyles(styles.tooltip) });
    }

    return React.createElement(
      'th',
      _extends({
        key: this.props.key,
        className: className,
        style: this.mergeAndPrefix(styles.root, this.props.style)
      }, handlers),
      tooltip,
      this.props.children
    );
  },

  _onMouseEnter: function _onMouseEnter() {
    if (this.props.tooltip !== undefined) this.setState({ hovered: true });
  },

  _onMouseLeave: function _onMouseLeave() {
    if (this.props.tooltip !== undefined) this.setState({ hovered: false });
  },

  _onClick: function _onClick(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.columnNumber);
  }

});

module.exports = TableHeaderColumn;