'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var Checkbox = require('../checkbox');
var StylePropable = require('../mixins/style-propable');
var TableHeaderColumn = require('./table-header-column');

var TableHeader = React.createClass({
  displayName: 'TableHeader',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    columns: React.PropTypes.array.isRequired,
    superHeaderColumns: React.PropTypes.array,
    onSelectAll: React.PropTypes.func,
    displaySelectAll: React.PropTypes.bool,
    enableSelectAll: React.PropTypes.bool,
    fixed: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      displaySelectAll: true,
      enableSelectAll: true,
      fixed: true
    };
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.tableHeader;
  },

  getStyles: function getStyles() {
    var styles = {
      root: {
        borderBottom: '1px solid ' + this.getTheme().borderColor
      }
    };

    return styles;
  },

  render: function render() {
    var className = 'mui-table-header';

    return React.createElement(
      'thead',
      { className: className, style: this.getStyles().root },
      this._getSuperHeaderRow(),
      this._getHeaderRow()
    );
  },

  getSuperHeaderRow: function getSuperHeaderRow() {
    return this.refs.superHeader;
  },

  getHeaderRow: function getHeaderRow() {
    return this.refs.header;
  },

  _getSuperHeaderRow: function _getSuperHeaderRow() {
    if (this.props.superHeaderColumns !== undefined) {
      return React.createElement(
        'tr',
        { className: 'mui-table-super-header-row', ref: 'superHeader' },
        this._getColumnHeaders(this.props.superHeaderColumns, 'sh')
      );
    }
  },

  _getHeaderRow: function _getHeaderRow() {
    var columns = this.props.columns.slice();
    if (this.props.displaySelectAll) {
      columns.splice(0, 0, this._getSelectAllCheckbox());
    }

    return React.createElement(
      'tr',
      { className: 'mui-table-header-row', ref: 'header' },
      this._getHeaderColumns(columns, 'h')
    );
  },

  _getHeaderColumns: function _getHeaderColumns(headerData, keyPrefix) {
    var headers = [];

    for (var index = 0; index < headerData.length; index++) {
      var _headerData$index = headerData[index];
      var content = _headerData$index.content;
      var tooltip = _headerData$index.tooltip;
      var style = _headerData$index.style;

      var props = _objectWithoutProperties(_headerData$index, ['content', 'tooltip', 'style']);

      var key = keyPrefix + index;

      headers.push(React.createElement(
        TableHeaderColumn,
        _extends({ key: key, style: style, tooltip: tooltip, columnNumber: index }, props),
        content
      ));
    }

    return headers;
  },

  _getSelectAllCheckbox: function _getSelectAllCheckbox() {
    var checkbox = React.createElement(Checkbox, {
      name: 'selectallcb',
      value: 'selected',
      disabled: !this.props.enableSelectAll,
      onCheck: this._onSelectAll });

    return {
      content: checkbox,
      style: {
        width: 72,
        paddingLeft: 24,
        paddingRight: 24
      }
    };
  },

  _onSelectAll: function _onSelectAll() {
    if (this.props.onSelectAll) this.props.onSelectAll();
  },

  _onColumnClick: function _onColumnClick(e, columnNumber) {
    if (this.props.onColumnClick) this.props.onColumnClick(e, columnNumber);
  }

});

module.exports = TableHeader;