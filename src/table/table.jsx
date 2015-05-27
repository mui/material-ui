var React = require('react');
var StylePropable = require('../mixins/style-propable');
var ClickAwayable = require('../mixins/click-awayable');
var TableHeader = require('./table-header');
var TableRow = require('./table-row');
var TableFooter = require('./table-footer');
var DOM = require('../utils/dom');

// Consider making ClickAwayable to undo row selection
var Table = React.createClass({

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    columnOrder: React.PropTypes.array,
    headerColumns: React.PropTypes.object,
    rowData: React.PropTypes.array.isRequired,
    footerColumns: React.PropTypes.object,
    header: React.PropTypes.instanceOf(TableHeader),
    footer: React.PropTypes.instanceOf(TableFooter),
    fixedHeader: React.PropTypes.bool,
    fixedFooter: React.PropTypes.bool,
    stripedRows: React.PropTypes.bool,
    showRowHover: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    showRowSelectCheckbox: React.PropTypes.bool,
    multiSelectable: React.PropTypes.bool,
    canSelectAll: React.PropTypes.bool,
    displaySelectAll: React.PropTypes.bool,
    height: React.PropTypes.string,
    defaultColumnWidth: React.PropTypes.string,
    onRowSelection: React.PropTypes.func,
    onCellClick: React.PropTypes.func,
    onRowHover: React.PropTypes.func,
    onRowHoverExit: React.PropTypes.func,
    onCellHover: React.PropTypes.func,
    onCellHoverExit: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      columnOrder: [],
      headerColumns: [],
      footerColumns: [],
      fixedHeader: true,
      fixedFooter: true,
      height: 'inherit',
      defaultColumnWidth: '50px',
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      showRowSelectCheckbox: true,
      multiSelectable: false,
      canSelectAll: false,
      displaySelectAll: true
    };
  },

  getInitialState: function() {
    return {
      selectedRows: []
    };
  },

  getTheme: function() {
    return this.context.muiTheme.component.table;
  },

  getStyles: function() {
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
        height: (this.props.fixedHeader || this.props.fixedFooter) ? this.props.height : 'auto',
        overflowX: 'hidden',
        overflowY: 'auto'
      },
      tableWrapper: {
        height: (this.props.fixedHeader || this.props.fixedFooter) ? 'auto' : this.props.height,
        overflow: 'auto'
      }
    };

    return styles;
  },

  componentClickAway: function() {
    if (this.state.selectedRows.length) this.setState({ selectedRows: [] });
  },

  render: function() {
    var className = 'mui-table';
    var styles = this.getStyles();

    var tHead = this._getHeader();
    var tBody = this._getBody();
    var tFoot = this._getFooter();

    var headerTable, footerTable;
    if (tHead !== undefined) {
      headerTable = (
        <div className='mui-header-table'>
          <table ref='headerTable' className={className} style={styles.root}>
            {tHead}
          </table>
        </div>
      );
    }
    if (tFoot !== undefined) {
      footerTable = (
        <div className='mui-footer-table'>
          <table ref='footerTable' className={className} style={styles.root}>
            {tFoot}
          </table>
        </div>
      );
    }

    return (
      <div className='mui-table-wrapper' style={styles.tableWrapper}>
        {headerTable}
        <div className='mui-body-table' style={styles.bodyTable}>
          <table ref='bodyTable' className={className} style={styles.root}>
            {tBody}
          </table>
        </div>
        {footerTable}
      </div>
    );
  },

  _getHeader: function() {
    if(this.props.header) return this.props.header;

    if (this.props.headerColumns) {
      var orderedHeaderColumns = this._orderColumnBasedData(this.props.headerColumns);
      return (
        <TableHeader
          columns={orderedHeaderColumns}
          enableSelectAll={this.props.canSelectAll && this.props.selectable}
          displaySelectAll={this.props.displaySelectAll}
          onSelectAll={this._onSelectAll} />
      );
    }
  },

  _getFooter: function() {
    if (this.props.footer) return this.props.footer;

    if (this.props.footerColumns) {
      var orderedFooterColumns = this._orderColumnBasedData(this.props.footerColumns);
      if (this.props.displaySelectAll) {
        orderedFooterColumns.splice(0, 0, {content: ''});
      }

      return (
        <TableFooter columns={orderedFooterColumns} />
      );
    }
  },

  _getBody: function() {
    var body = this._orderColumnBasedData(this.props.rowData, function(rowData, rowNumber) {
      var selected = this._isRowSelected(rowNumber);
      var striped = this.props.stripedRows && (rowNumber % 2 === 0);
      var border = true;
      if (rowNumber === this.props.rowData.length - 1) {
        border = false;
      }

      var row = (
        <TableRow
          key={'r-' + rowNumber}
          rowNumber={rowNumber}
          columns={rowData}
          selected={selected}
          striped={striped}
          hoverable={this.props.showRowHover}
          displayBorder={border}
          selectable={this.props.selectable}
          onRowClick={this._handleRowClick}
          onColumnClick={this._handleCellClick}
          onRowHover={this._handleRowHover} />
      );

      return row;
    }.bind(this));

    return (
      <tbody style={{height: this.props.height}}>
        {body}
      </tbody>
    );
  },

  _orderColumnBasedData: function(columnBasedData, cb) {
    var data = (Object.prototype.toString.call(columnBasedData) !== '[object Array]') ? [columnBasedData] : columnBasedData;
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

      orderedData.push((cb !== undefined) ? cb(rowData, rowIdx) : rowData);
    }

    return (data.length === 1) ? orderedData[0] : orderedData;
  },

  _setColumnWidths: function(columnData) {
    columnData.forEach(function(column) {
      if (column.style === undefined) {
        column.style = {
          width: this.props.defaultColumnWidth,
          maxWidth: this.props.defaultColumnWidth
        }
      }
      else {
        if (column.style.width === undefined) column.style.width = this.props.defaultColumnWidth;
        if (column.style.maxWidth === undefined) column.style.maxWidth = this.props.defaultColumnWidth;
      }
    }.bind(this));

    return columnData;
  },

  _isRowSelected: function(rowNumber) {
    if (this.state.allRowsSelected) {
      return true;
    }

    for (var i = 0; i < this.state.selectedRows.length; i++) {
      var selection = this.state.selectedRows[i];

      if (typeof selection === 'object') {
        if (this._isValueInRange(rowNumber, selection)) return true;
      }
      else {
        if (selection === rowNumber) return true;
      }
    }

    return false;
  },

  _isValueInRange: function(value, range) {
    if ((range.start <= value && value <= range.end) || (range.end <= value && value <= range.start)) {
      return true;
    }

    return false;
  },

  _handleRowClick: function(e, rowNumber) {
    // Prevent text selection while selecting rows.
    window.getSelection().removeAllRanges();

    if (this.props.selectable) {
      this._processRowSelection(e, rowNumber);
    }
  },

  _processRowSelection: function(e, rowNumber) {
    var selectedRows = this.state.selectedRows;

    if (e.shiftKey && this.props.multiSelectable && selectedRows.length) {
      var lastSelection = selectedRows[selectedRows.length - 1];
      var start, end, direction;

      if (typeof lastSelection === 'object') {
        lastSelection.end = rowNumber;
      }
      else {
        selectedRows.push({start: lastSelection, end: rowNumber});
      }
    }
    else if (((e.ctrlKey && !e.metaKey) || (e.metaKey && !e.ctrlKey)) && this.props.multiSelectable) {
      var idx = selectedRows.indexOf(rowNumber);
      if (idx < 0) {
        selectedRows.push(rowNumber);
      }
      else {
        selectedRows.splice(idx, 1);
      }
    }
    else {
      if (selectedRows.length === 1 && selectedRows[0] === rowNumber) {
        selectedRows = [];
      }
      else {
        selectedRows = [rowNumber];
      }
    }

    this.setState({ selectedRows: selectedRows });
    if (this.props.onRowSelection) this.props.onRowSelection(selectedRows);
  },

  _handleCellClick: function(e, rowNumber, columnNumber) {
    if (this.props.onCellClick) this.props.onCellClick(rowNumber, columnNumber);
    this._handleRowClick(e, rowNumber);
  },

  _handleRowHover: function(e, rowNumber) {
    if (this.props.onRowHover) this.props.onRowHover(rowNumber);
  },

  _handleCellHover: function(e, rowNumber, columnNumber) {
    if (this.props.onCellHover) this.props.onCellHover(rowNumber, columnNumber);
    this._handleRowHover(e, rowNumber);
  },

  _onSelectAll: function() {
    this.setState({allRowsSelected: !this.state.allRowsSelected});
  }


});

module.exports = Table;
