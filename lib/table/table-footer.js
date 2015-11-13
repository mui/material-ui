'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var TableRowColumn = require('./table-row-column');
var StylePropable = require('../mixins/style-propable');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var TableFooter = React.createClass({
  displayName: 'TableFooter',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    adjustForCheckbox: React.PropTypes.bool,
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

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  getDefaultProps: function getDefaultProps() {
    return {
      adjustForCheckbox: true,
      style: {}
    };
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.tableFooter;
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
    var _props = this.props;
    var className = _props.className;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['className', 'style']);

    var classes = 'mui-table-footer';
    if (className) classes += ' ' + className;

    var footerRows = this._createRows();

    return React.createElement(
      'tfoot',
      _extends({ className: classes, style: this.prepareStyles(style) }, other),
      footerRows
    );
  },

  _createRows: function _createRows() {
    var _this = this;

    var rowNumber = 0;
    return React.Children.map(this.props.children, function (child) {
      return _this._createRow(child, rowNumber++);
    });
  },

  _createRow: function _createRow(child, rowNumber) {
    var styles = this.getStyles();
    var props = {
      className: 'mui-table-footer-row',
      displayBorder: false,
      key: 'f-' + rowNumber,
      rowNumber: rowNumber,
      style: this.mergeAndPrefix(styles.cell, child.props.style)
    };

    var children = [this._getCheckboxPlaceholder(props)];
    React.Children.forEach(child.props.children, function (child) {
      children.push(child);
    });

    return React.cloneElement(child, props, children);
  },

  _getCheckboxPlaceholder: function _getCheckboxPlaceholder(props) {
    if (!this.props.adjustForCheckbox) return null;

    var key = 'fpcb' + props.rowNumber;
    return React.createElement(TableRowColumn, { key: key, style: { width: 24 } });
  }

});

module.exports = TableFooter;