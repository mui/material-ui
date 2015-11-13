'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var Checkbox = require('../checkbox');
var StylePropable = require('../mixins/style-propable');
var TableHeaderColumn = require('./table-header-column');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var TableHeader = React.createClass({
  displayName: 'TableHeader',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    adjustForCheckbox: React.PropTypes.bool,
    displaySelectAll: React.PropTypes.bool,
    enableSelectAll: React.PropTypes.bool,
    onSelectAll: React.PropTypes.func,
    selectAllSelected: React.PropTypes.bool,
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
      displaySelectAll: true,
      enableSelectAll: true,
      selectAllSelected: false
    };
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.tableHeader;
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
    var _props = this.props;
    var className = _props.className;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['className', 'style']);

    var classes = 'mui-table-header';
    if (className) classes += ' ' + className;

    var superHeaderRows = this._createSuperHeaderRows();
    var baseHeaderRow = this._createBaseHeaderRow();

    return React.createElement(
      'thead',
      { className: classes, style: this.prepareStyles(this.getStyles().root, style) },
      superHeaderRows,
      baseHeaderRow
    );
  },

  _createSuperHeaderRows: function _createSuperHeaderRows() {
    var numChildren = React.Children.count(this.props.children);
    if (numChildren === 1) return undefined;

    var superHeaders = [];
    for (var index = 0; index < numChildren - 1; index++) {
      var child = this.props.children[index];

      if (!React.isValidElement(child)) continue;

      var props = {
        className: 'mui-table-super-header-row',
        displayRowCheckbox: false,
        key: 'sh' + index,
        rowNumber: index
      };
      superHeaders.push(this._createSuperHeaderRow(child, props));
    }

    if (superHeaders.length) return superHeaders;
  },

  _createSuperHeaderRow: function _createSuperHeaderRow(child, props) {
    var children = [];
    if (this.props.adjustForCheckbox) {
      children.push(this._getCheckboxPlaceholder(props));
    }
    React.Children.forEach(child.props.children, function (child) {
      children.push(child);
    });

    return React.cloneElement(child, props, children);
  },

  _createBaseHeaderRow: function _createBaseHeaderRow() {
    var numChildren = React.Children.count(this.props.children);
    var child = numChildren === 1 ? this.props.children : this.props.children[numChildren - 1];
    var props = {
      className: 'mui-table-header-row',
      key: 'h' + numChildren,
      rowNumber: numChildren
    };

    var children = [this._getSelectAllCheckboxColumn(props)];
    React.Children.forEach(child.props.children, function (child) {
      children.push(child);
    });

    return React.cloneElement(child, props, children);
  },

  _getCheckboxPlaceholder: function _getCheckboxPlaceholder(props) {
    if (!this.props.adjustForCheckbox) return null;

    var key = 'hpcb' + props.rowNumber;
    return React.createElement(TableHeaderColumn, { key: key, style: { width: 24 } });
  },

  _getSelectAllCheckboxColumn: function _getSelectAllCheckboxColumn(props) {
    if (!this.props.displaySelectAll) return this._getCheckboxPlaceholder(props);

    var checkbox = React.createElement(Checkbox, {
      key: 'selectallcb',
      name: 'selectallcb',
      value: 'selected',
      disabled: !this.props.enableSelectAll,
      checked: this.props.selectAllSelected,
      onCheck: this._onSelectAll });

    var key = 'hpcb' + props.rowNumber;
    return React.createElement(
      TableHeaderColumn,
      { key: key, style: { width: 24 } },
      checkbox
    );
  },

  _onSelectAll: function _onSelectAll(e, checked) {
    if (this.props.onSelectAll) this.props.onSelectAll(checked);
  }

});

module.exports = TableHeader;