'use strict';

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var ClickAwayable = require('../mixins/click-awayable');
var TableHeader = require('./table-header');
var TableRow = require('./table-row');
var TableFooter = require('./table-footer');

var Table = React.createClass({
  displayName: 'Table',

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    rowData: React.PropTypes.array.isRequired,
    canSelectAll: React.PropTypes.bool,
    columnOrder: React.PropTypes.array,
    defaultColumnWidth: React.PropTypes.string,
    deselectOnClickaway: React.PropTypes.bool,
    displayRowCheckbox: React.PropTypes.bool,
    displaySelectAll: React.PropTypes.bool,
    fixedFooter: React.PropTypes.bool,
    fixedHeader: React.PropTypes.bool,
    footer: React.PropTypes.element,
    footerColumns: React.PropTypes.object,
    header: React.PropTypes.element,
    headerColumns: React.PropTypes.object,
    height: React.PropTypes.string,
    multiSelectable: React.PropTypes.bool,
    onCellClick: React.PropTypes.func,
    onCellHover: React.PropTypes.func,
    onCellHoverExit: React.PropTypes.func,
    onRowHover: React.PropTypes.func,
    onRowHoverExit: React.PropTypes.func,
    onRowSelection: React.PropTypes.func,
    preScanRowData: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    showRowHover: React.PropTypes.bool,
    stripedRows: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      canSelectAll: false,
      defaultColumnWidth: '50px',
      deselectOnClickaway: true,
      displayRowCheckbox: true,
      displaySelectAll: true,
      fixedFooter: true,
      fixedHeader: true,
      height: 'inherit',
      multiSelectable: false,
      preScanRowData: true,
      selectable: true,
      showRowHover: false,
      stripedRows: false
    };
  },

  getInitialState: function getInitialState() {
    // Determine what rows are 'pre-selected'.
    var preSelectedRows = [];
    if (this.props.selectable && this.props.preScanRowData) {
      for (var idx = 0; idx < this.props.rowData.length; idx++) {
        var row = this.props.rowData[idx];
        if (row.selected !== undefined && row.selected) {
          preSelectedRows.push(idx);

          if (!this.props.multiSelectable) {
            break;
          }
        }
      }
    }

    return {
      selectedRows: preSelectedRows
    };
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.table;
  },

  getStyles: function getStyles() {
    var styles = {
      root: {
        backgroundColor: this.getTheme().backgroundColor,
        padding: '0 ' + this.context.muiTheme.spacing.desktopGutter + 'px',
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

  componentClickAway: function componentClickAway() {
    if (this.props.deselectOnClickaway && this.state.selectedRows.length) {
      this.setState({ selectedRows: [] });
    }
  },

  render: function render() {
    var className = 'mui-table';
    var styles = this.getStyles();

    var tHead = this._getHeader();
    var tBody = this._getBody();
    var tFoot = this._getFooter();

    var headerTable = undefined,
        footerTable = undefined;
    var inlineHeader = undefined,
        inlineFooter = undefined;
    if (tHead !== undefined) {
      if (this.props.fixedHeader) {
        headerTable = React.createElement(
          'div',
          { className: 'mui-header-table' },
          React.createElement(
            'table',
            { ref: 'headerTable', className: className, style: styles.root },
            tHead
          )
        );
      } else {
        inlineHeader = tHead;
      }
    }
    if (tFoot !== undefined) {
      if (this.props.fixedFooter) {
        footerTable = React.createElement(
          'div',
          { className: 'mui-footer-table' },
          React.createElement(
            'table',
            { ref: 'footerTable', className: className, style: styles.root },
            tFoot
          )
        );
      } else {
        inlineFooter = tFoot;
      }
    }

    return React.createElement(
      'div',
      { className: 'mui-table-wrapper', style: styles.tableWrapper },
      headerTable,
      React.createElement(
        'div',
        { className: 'mui-body-table', style: styles.bodyTable },
        React.createElement(
          'table',
          { ref: 'bodyTable', className: className, style: styles.root },
          inlineHeader,
          inlineFooter,
          tBody
        )
      ),
      footerTable
    );
  },

  _getHeader: function _getHeader() {
    if (this.props.header) return this.props.header;

    if (this.props.headerColumns !== undefined) {
      var orderedHeaderColumns = this._orderColumnBasedData(this.props.headerColumns);
      return React.createElement(TableHeader, {
        columns: orderedHeaderColumns,
        enableSelectAll: this.props.canSelectAll && this.props.selectable,
        displaySelectAll: this.props.displaySelectAll,
        onSelectAll: this._onSelectAll });
    }
  },

  _getFooter: function _getFooter() {
    if (this.props.footer) return this.props.footer;

    if (this.props.footerColumns !== undefined) {
      var orderedFooterColumns = this._orderColumnBasedData(this.props.footerColumns);
      if (this.props.displaySelectAll) {
        orderedFooterColumns.splice(0, 0, { content: '' });
      }

      return React.createElement(TableFooter, { columns: orderedFooterColumns });
    }
  },

  _getBody: function _getBody() {
    var _this = this;

    var body = this._orderColumnBasedData(this.props.rowData, function (rowData, rowNumber) {
      var selected = _this._isRowSelected(rowNumber);
      var striped = _this.props.stripedRows && rowNumber % 2 === 0;
      var border = true;
      if (rowNumber === _this.props.rowData.length - 1) {
        border = false;
      }

      var row = React.createElement(TableRow, {
        key: 'r-' + rowNumber,
        rowNumber: rowNumber,
        columns: rowData,
        selected: selected,
        striped: striped,
        displayRowCheckbox: _this.props.displayRowCheckbox,
        hoverable: _this.props.showRowHover,
        displayBorder: border,
        selectable: _this.props.selectable,
        onRowClick: _this._handleRowClick,
        onCellClick: _this._handleCellClick,
        onRowHover: _this._handleRowHover,
        onRowHoverExit: _this._handleRowHoverExit,
        onCellHover: _this._handleCellHover,
        onCellHoverExit: _this._handleCellHoverExit });

      return row;
    });

    return React.createElement(
      'tbody',
      { style: { height: this.props.height } },
      body
    );
  },

  _orderColumnBasedData: function _orderColumnBasedData(columnBasedData, cb) {
    // If we do not have a columnOrder, return.
    if (this.props.columnOrder === undefined) return;

    var data = Object.prototype.toString.call(columnBasedData) !== '[object Array]' ? [columnBasedData] : columnBasedData;
    var orderedData = [];

    for (var rowIdx = 0; rowIdx < data.length; rowIdx++) {
      var rowData = data[rowIdx];
      var orderedRowData = [];

      for (var colIdx = 0; colIdx < this.props.columnOrder.length; colIdx++) {
        var columnId = this.props.columnOrder[colIdx];
        var columnData = rowData[columnId] || {};

        orderedRowData.push(columnData);
      }

      if (orderedRowData.length) {
        rowData = orderedRowData;
      }

      // Fixed table layout only requires widths on first row.
      if (rowIdx === 1 && data.length > 1) {
        rowData = this._setColumnWidths(rowData);
      }

      orderedData.push(cb !== undefined ? cb(rowData, rowIdx) : rowData);
    }

    return data.length === 1 ? orderedData[0] : orderedData;
  },

  _setColumnWidths: function _setColumnWidths(columnData) {
    var _this2 = this;

    columnData.forEach(function (column) {
      if (column.style === undefined) {
        column.style = {
          width: _this2.props.defaultColumnWidth,
          maxWidth: _this2.props.defaultColumnWidth
        };
      } else {
        if (column.style.width === undefined) column.style.width = _this2.props.defaultColumnWidth;
        if (column.style.maxWidth === undefined) column.style.maxWidth = _this2.props.defaultColumnWidth;
      }
    });

    return columnData;
  },

  _isRowSelected: function _isRowSelected(rowNumber) {
    if (this.state.allRowsSelected) {
      return true;
    }

    for (var i = 0; i < this.state.selectedRows.length; i++) {
      var selection = this.state.selectedRows[i];

      if (typeof selection === 'object') {
        if (this._isValueInRange(rowNumber, selection)) return true;
      } else {
        if (selection === rowNumber) return true;
      }
    }

    return false;
  },

  _isValueInRange: function _isValueInRange(value, range) {
    if (range.start <= value && value <= range.end || range.end <= value && value <= range.start) {
      return true;
    }

    return false;
  },

  _handleRowClick: function _handleRowClick(e, rowNumber) {
    e.stopPropagation();

    if (this.props.selectable) {
      // Prevent text selection while selecting rows.
      window.getSelection().removeAllRanges();
      this._processRowSelection(e, rowNumber);
    }
  },

  _processRowSelection: function _processRowSelection(e, rowNumber) {
    var selectedRows = this.state.selectedRows;

    if (e.shiftKey && this.props.multiSelectable && selectedRows.length) {
      var lastSelection = selectedRows[selectedRows.length - 1];

      if (typeof lastSelection === 'object') {
        lastSelection.end = rowNumber;
      } else {
        selectedRows.push({ start: lastSelection, end: rowNumber });
      }
    } else if ((e.ctrlKey && !e.metaKey || e.metaKey && !e.ctrlKey) && this.props.multiSelectable) {
      var idx = selectedRows.indexOf(rowNumber);
      if (idx < 0) {
        selectedRows.push(rowNumber);
      } else {
        selectedRows.splice(idx, 1);
      }
    } else {
      if (selectedRows.length === 1 && selectedRows[0] === rowNumber) {
        selectedRows = [];
      } else {
        selectedRows = [rowNumber];
      }
    }

    this.setState({ selectedRows: selectedRows });
    if (this.props.onRowSelection) this.props.onRowSelection(selectedRows);
  },

  _handleCellClick: function _handleCellClick(e, rowNumber, columnNumber) {
    e.stopPropagation();
    if (this.props.onCellClick) this.props.onCellClick(rowNumber, this._getColumnId(columnNumber));
  },

  _handleRowHover: function _handleRowHover(e, rowNumber) {
    if (this.props.onRowHover) this.props.onRowHover(rowNumber);
  },

  _handleRowHoverExit: function _handleRowHoverExit(e, rowNumber) {
    if (this.props.onRowHoverExit) this.props.onRowHoverExit(rowNumber);
  },

  _handleCellHover: function _handleCellHover(e, rowNumber, columnNumber) {
    if (this.props.onCellHover) this.props.onCellHover(rowNumber, this._getColumnId(columnNumber));
    this._handleRowHover(e, rowNumber);
  },

  _handleCellHoverExit: function _handleCellHoverExit(e, rowNumber, columnNumber) {
    if (this.props.onCellHoverExit) this.props.onCellHoverExit(rowNumber, this._getColumnId(columnNumber));
    this._handleRowHoverExit(e, rowNumber);
  },

  _onSelectAll: function _onSelectAll() {
    this.setState({ allRowsSelected: !this.state.allRowsSelected });
  },

  _getColumnId: function _getColumnId(columnNumber) {
    var columnId = columnNumber;
    if (this.props.displayRowCheckbox) columnId--;
    columnId = this.props.columnOrder.length ? this.props.columnOrder[columnId] : columnId;

    return columnId;
  }

});

module.exports = Table;