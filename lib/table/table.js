'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');
var StylePropable = require('../mixins/style-propable');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var Table = React.createClass({
  displayName: 'Table',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    allRowsSelected: React.PropTypes.bool,
    fixedFooter: React.PropTypes.bool,
    fixedHeader: React.PropTypes.bool,
    height: React.PropTypes.string,
    multiSelectable: React.PropTypes.bool,
    onCellClick: React.PropTypes.func,
    onCellHover: React.PropTypes.func,
    onCellHoverExit: React.PropTypes.func,
    onRowHover: React.PropTypes.func,
    onRowHoverExit: React.PropTypes.func,
    onRowSelection: React.PropTypes.func,
    selectable: React.PropTypes.bool,
    style: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      allRowsSelected: false,
      fixedFooter: true,
      fixedHeader: true,
      height: 'inherit',
      multiSelectable: false,
      selectable: true
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
      allRowsSelected: this.props.allRowsSelected
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.table;
  },

  getStyles: function getStyles() {
    var styles = {
      root: {
        backgroundColor: this.getTheme().backgroundColor,
        padding: '0 ' + this.state.muiTheme.rawTheme.spacing.desktopGutter + 'px',
        width: '100%',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        tableLayout: 'fixed'
      },
      bodyTable: {
        height: this.props.fixedHeader || this.props.fixedFooter ? this.props.height : 'auto',
        overflowX: 'hidden',
        overflowY: 'auto'
      },
      tableWrapper: {
        height: this.props.fixedHeader || this.props.fixedFooter ? 'auto' : this.props.height,
        overflow: 'auto'
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var className = _props.className;
    var fixedFooter = _props.fixedFooter;
    var fixedHeader = _props.fixedHeader;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['children', 'className', 'fixedFooter', 'fixedHeader', 'style']);

    var classes = 'mui-table';
    if (className) classes += ' ' + className;
    var styles = this.getStyles();

    var tHead = undefined,
        tFoot = undefined,
        tBody = undefined;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var child = _step.value;

        if (!React.isValidElement(child)) continue;

        var displayName = child.type.displayName;
        if (displayName === 'TableBody') {
          tBody = this._createTableBody(child);
        } else if (displayName === 'TableHeader') {
          tHead = this._createTableHeader(child);
        } else if (displayName === 'TableFooter') {
          tFoot = this._createTableFooter(child);
        }
      }

      // If we could not find a table-header and a table-body, do not attempt to display anything.
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (!tBody && !tHead) return null;

    var mergedTableStyle = this.prepareStyles(styles.root, style);
    var headerTable = undefined,
        footerTable = undefined;
    var inlineHeader = undefined,
        inlineFooter = undefined;
    if (fixedHeader) {
      headerTable = React.createElement(
        'div',
        { className: 'mui-header-table' },
        React.createElement(
          'table',
          { className: className, style: mergedTableStyle },
          tHead
        )
      );
    } else {
      inlineHeader = tHead;
    }
    if (tFoot !== undefined) {
      if (fixedFooter) {
        footerTable = React.createElement(
          'div',
          { className: 'mui-footer-table' },
          React.createElement(
            'table',
            { className: className, style: mergedTableStyle },
            tFoot
          )
        );
      } else {
        inlineFooter = tFoot;
      }
    }

    return React.createElement(
      'div',
      { className: 'mui-table-wrapper', style: this.prepareStyles(styles.tableWrapper) },
      headerTable,
      React.createElement(
        'div',
        { className: 'mui-body-table', style: this.prepareStyles(styles.bodyTable), ref: 'tableDiv' },
        React.createElement(
          'table',
          { className: classes, style: mergedTableStyle, ref: 'tableBody' },
          inlineHeader,
          inlineFooter,
          tBody
        )
      ),
      footerTable
    );
  },

  isScrollbarVisible: function isScrollbarVisible() {
    var tableDivHeight = ReactDOM.findDOMNode(this.refs.tableDiv).clientHeight;
    var tableBodyHeight = ReactDOM.findDOMNode(this.refs.tableBody).clientHeight;

    return tableBodyHeight > tableDivHeight;
  },

  _createTableHeader: function _createTableHeader(base) {
    return React.cloneElement(base, {
      enableSelectAll: base.props.enableSelectAll && this.props.selectable && this.props.multiSelectable,
      onSelectAll: this._onSelectAll,
      selectAllSelected: this.state.allRowsSelected
    });
  },

  _createTableBody: function _createTableBody(base) {
    return React.cloneElement(base, {
      allRowsSelected: this.state.allRowsSelected,
      multiSelectable: this.props.multiSelectable,
      onCellClick: this._onCellClick,
      onCellHover: this._onCellHover,
      onCellHoverExit: this._onCellHoverExit,
      onRowHover: this._onRowHover,
      onRowHoverExit: this._onRowHoverExit,
      onRowSelection: this._onRowSelection,
      selectable: this.props.selectable,
      style: this.mergeAndPrefix({ height: this.props.height }, base.props.style)
    });
  },

  _createTableFooter: function _createTableFooter(base) {
    return base;
  },

  _onCellClick: function _onCellClick(rowNumber, columnNumber) {
    if (this.props.onCellClick) this.props.onCellClick(rowNumber, columnNumber);
  },

  _onCellHover: function _onCellHover(rowNumber, columnNumber) {
    if (this.props.onCellHover) this.props.onCellHover(rowNumber, columnNumber);
  },

  _onCellHoverExit: function _onCellHoverExit(rowNumber, columnNumber) {
    if (this.props.onCellHoverExit) this.props.onCellHoverExit(rowNumber, columnNumber);
  },

  _onRowHover: function _onRowHover(rowNumber) {
    if (this.props.onRowHover) this.props.onRowHover(rowNumber);
  },

  _onRowHoverExit: function _onRowHoverExit(rowNumber) {
    if (this.props.onRowHoverExit) this.props.onRowHoverExit(rowNumber);
  },

  _onRowSelection: function _onRowSelection(selectedRows) {
    if (this.state.allRowsSelected) this.setState({ allRowsSelected: false });
    if (this.props.onRowSelection) this.props.onRowSelection(selectedRows);
  },

  _onSelectAll: function _onSelectAll() {
    if (this.props.onRowSelection) {
      if (!this.state.allRowsSelected) {
        this.props.onRowSelection('all');
      } else {
        this.props.onRowSelection('none');
      }
    }

    this.setState({ allRowsSelected: !this.state.allRowsSelected });
  }

});

module.exports = Table;