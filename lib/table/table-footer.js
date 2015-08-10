'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');

var TableFooter = React.createClass({
  displayName: 'TableFooter',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    columns: React.PropTypes.array.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {};
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.tableFooter;
  },

  getStyles: function getStyles() {

    var styles = {
      cell: {
        borderTop: '1px solid ' + this.getTheme().borderColor,
        verticalAlign: 'bottom',
        padding: 20,
        textAlign: 'left',
        whiteSpace: 'nowrap'
      }
    };

    return styles;
  },

  render: function render() {
    var className = 'mui-table-footer';

    return React.createElement(
      'tfoot',
      { className: className },
      this._getFooterRow()
    );
  },

  _getFooterRow: function _getFooterRow() {
    return React.createElement(
      'tr',
      { className: 'mui-table-footer-row' },
      this._getColumnHeaders(this.props.columns, 'f')
    );
  },

  _getColumnHeaders: function _getColumnHeaders(footerData, keyPrefix) {
    var footers = [];
    var styles = this.getStyles();

    for (var index = 0; index < footerData.length; index++) {
      var _footerData$index = footerData[index];
      var content = _footerData$index.content;

      var props = _objectWithoutProperties(_footerData$index, ['content']);

      if (content === undefined) content = footerData[index];
      var key = keyPrefix + index;
      props.style = props.style !== undefined ? this.mergeAndPrefix(props.style, styles.cell) : styles.cell;

      footers.push(React.createElement(
        'td',
        _extends({ key: key, className: 'mui-table-footer-column' }, props),
        content
      ));
    }

    return footers;
  }

});

module.exports = TableFooter;