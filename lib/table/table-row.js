'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var TableRow = React.createClass({
  displayName: 'TableRow',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    displayBorder: React.PropTypes.bool,
    hoverable: React.PropTypes.bool,
    onCellClick: React.PropTypes.func,
    onCellHover: React.PropTypes.func,
    onCellHoverExit: React.PropTypes.func,
    onRowClick: React.PropTypes.func,
    onRowHover: React.PropTypes.func,
    onRowHoverExit: React.PropTypes.func,
    rowNumber: React.PropTypes.number,
    selectable: React.PropTypes.bool,
    selected: React.PropTypes.bool,
    striped: React.PropTypes.bool,
    style: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      displayBorder: true,
      displayRowCheckbox: true,
      hoverable: false,
      selectable: true,
      selected: false,
      striped: false
    };
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
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      hovered: false
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.tableRow;
  },

  getStyles: function getStyles() {
    var theme = this.getTheme();
    var cellBgColor = 'inherit';
    if (this.state.hovered) {
      cellBgColor = theme.hoverColor;
    } else if (this.props.selected) {
      cellBgColor = theme.selectedColor;
    } else if (this.props.striped) {
      cellBgColor = theme.stripeColor;
    }

    var styles = {
      root: {
        borderBottom: '1px solid ' + this.getTheme().borderColor,
        color: this.getTheme().textColor
      },
      cell: {
        backgroundColor: cellBgColor
      }
    };

    if (!this.props.displayBorder) {
      styles.root.borderBottom = '';
    }

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var displayBorder = _props.displayBorder;
    var hoverable = _props.hoverable;
    var onCellClick = _props.onCellClick;
    var onCellHover = _props.onCellHover;
    var onCellHoverExit = _props.onCellHoverExit;
    var onRowClick = _props.onRowClick;
    var onRowHover = _props.onRowHover;
    var onRowHoverExit = _props.onRowHoverExit;
    var rowNumber = _props.rowNumber;
    var selectable = _props.selectable;
    var selected = _props.selected;
    var striped = _props.striped;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['className', 'displayBorder', 'hoverable', 'onCellClick', 'onCellHover', 'onCellHoverExit', 'onRowClick', 'onRowHover', 'onRowHoverExit', 'rowNumber', 'selectable', 'selected', 'striped', 'style']);

    var classes = 'mui-table-row';
    if (className) classes += ' ' + className;
    var rowColumns = this._createColumns();

    return React.createElement(
      'tr',
      _extends({
        className: classes,
        style: this.prepareStyles(this.getStyles().root, style)
      }, other),
      rowColumns
    );
  },

  _createColumns: function _createColumns() {
    var _this = this;

    var columnNumber = 1;
    return React.Children.map(this.props.children, function (child) {
      if (React.isValidElement(child)) {
        return _this._createColumn(child, columnNumber++);
      }
    });
  },

  _createColumn: function _createColumn(child, columnNumber) {
    var key = this.props.rowNumber + '-' + columnNumber;
    var styles = this.getStyles();
    var handlers = {
      onClick: this._onCellClick,
      onHover: this._onCellHover,
      onHoverExit: this._onCellHoverExit
    };

    return React.cloneElement(child, _extends({
      columnNumber: columnNumber,
      hoverable: this.props.hoverable,
      key: child.props.key || key,
      style: this.mergeAndPrefix(styles.cell, child.props.style)
    }, handlers));
  },

  _onRowClick: function _onRowClick(e) {
    if (this.props.onRowClick) this.props.onRowClick(e, this.props.rowNumber);
  },

  _onRowHover: function _onRowHover(e) {
    if (this.props.onRowHover) this.props.onRowHover(e, this.props.rowNumber);
  },

  _onRowHoverExit: function _onRowHoverExit(e) {
    if (this.props.onRowHoverExit) this.props.onRowHoverExit(e, this.props.rowNumber);
  },

  _onCellClick: function _onCellClick(e, columnIndex) {
    if (this.props.selectable && this.props.onCellClick) this.props.onCellClick(e, this.props.rowNumber, columnIndex);
    e.ctrlKey = true;
    this._onRowClick(e);
  },

  _onCellHover: function _onCellHover(e, columnIndex) {
    if (this.props.hoverable) {
      this.setState({ hovered: true });
      if (this.props.onCellHover) this.props.onCellHover(e, this.props.rowNumber, columnIndex);
      this._onRowHover(e);
    }
  },

  _onCellHoverExit: function _onCellHoverExit(e, columnIndex) {
    if (this.props.hoverable) {
      this.setState({ hovered: false });
      if (this.props.onCellHoverExit) this.props.onCellHoverExit(e, this.props.rowNumber, columnIndex);
      this._onRowHoverExit(e);
    }
  }

});

module.exports = TableRow;