let React = require('react');
let StylePropable = require('../mixins/style-propable');
let ClickAwayable = require('../mixins/click-awayable');
let TableHeader = require('./table-header');
let TableRow = require('./table-row');
let TableFooter = require('./table-footer');


let Table = React.createClass({

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
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
    stripedRows: React.PropTypes.bool,
  },

  getDefaultProps() {
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
      stripedRows: false,
    };
  },

  getInitialState() {
    // Determine what rows are 'pre-selected'.
    let preSelectedRows = [];
    if (this.props.selectable && this.props.preScanRowData) {
      for (let idx = 0; idx < this.props.rowData.length; idx++) {
        let row = this.props.rowData[idx];
        if (row.selected !== undefined && row.selected) {
          preSelectedRows.push(idx);

          if (!this.props.multiSelectable) {
            break;
          }
        }
      }
    }

    return {
      selectedRows: preSelectedRows,
    };
  },

  getTheme() {
    return this.context.muiTheme.component.table;
  },

  getStyles() {
    let styles = {
      root: {
        backgroundColor: this.getTheme().backgroundColor,
        padding: '0 ' + this.context.muiTheme.spacing.desktopGutter + 'px',
        width: '100%',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        tableLayout: 'fixed',
      },
      bodyTable: {
        height: (this.props.fixedHeader || this.props.fixedFooter) ? this.props.height : 'auto',
        overflowX: 'hidden',
        overflowY: 'auto',
      },
      tableWrapper: {
        height: (this.props.fixedHeader || this.props.fixedFooter) ? 'auto' : this.props.height,
        overflow: 'auto',
      },
    };

    return styles;
  },

  componentClickAway() {
    if (this.props.deselectOnClickaway && this.state.selectedRows.length) {
      this.setState({ selectedRows: [] });
    }
  },

  render() {
    let className = 'mui-table';
    let styles = this.getStyles();

    let tHead = this._getHeader();
    let tBody = this._getBody();
    let tFoot = this._getFooter();

    let headerTable, footerTable;
    let inlineHeader, inlineFooter;
    if (tHead !== undefined) {
      if (this.props.fixedHeader) {
        headerTable = (
          <div className='mui-header-table'>
            <table ref='headerTable' className={className} style={styles.root}>
              {tHead}
            </table>
          </div>
        );
      }
      else {
        inlineHeader = tHead;
      }
    }
    if (tFoot !== undefined) {
      if (this.props.fixedFooter) {
        footerTable = (
          <div className='mui-footer-table'>
            <table ref='footerTable' className={className} style={styles.root}>
              {tFoot}
            </table>
          </div>
        );
      }
      else {
        inlineFooter = tFoot;
      }
    }

    return (
      <div className='mui-table-wrapper' style={styles.tableWrapper}>
        {headerTable}
        <div className='mui-body-table' style={styles.bodyTable}>
          <table ref='bodyTable' className={className} style={styles.root}>
            {inlineHeader}
            {inlineFooter}
            {tBody}
          </table>
        </div>
        {footerTable}
      </div>
    );
  },

  _getHeader() {
    if (this.props.header) return this.props.header;

    if (this.props.headerColumns !== undefined) {
      let orderedHeaderColumns = this._orderColumnBasedData(this.props.headerColumns);
      return (
        <TableHeader
          columns={orderedHeaderColumns}
          enableSelectAll={this.props.canSelectAll && this.props.selectable}
          displaySelectAll={this.props.displaySelectAll}
          onSelectAll={this._onSelectAll} />
      );
    }
  },

  _getFooter() {
    if (this.props.footer) return this.props.footer;

    if (this.props.footerColumns !== undefined) {
      let orderedFooterColumns = this._orderColumnBasedData(this.props.footerColumns);
      if (this.props.displaySelectAll) {
        orderedFooterColumns.splice(0, 0, {content: ''});
      }

      return (
        <TableFooter columns={orderedFooterColumns} />
      );
    }
  },

  _getBody() {
    let body = this._orderColumnBasedData(this.props.rowData, (rowData, rowNumber) => {
      let selected = this._isRowSelected(rowNumber);
      let striped = this.props.stripedRows && (rowNumber % 2 === 0);
      let border = true;
      if (rowNumber === this.props.rowData.length - 1) {
        border = false;
      }

      let row = (
        <TableRow
          key={'r-' + rowNumber}
          rowNumber={rowNumber}
          columns={rowData}
          selected={selected}
          striped={striped}
          displayRowCheckbox={this.props.displayRowCheckbox}
          hoverable={this.props.showRowHover}
          displayBorder={border}
          selectable={this.props.selectable}
          onRowClick={this._handleRowClick}
          onCellClick={this._handleCellClick}
          onRowHover={this._handleRowHover}
          onRowHoverExit={this._handleRowHoverExit}
          onCellHover={this._handleCellHover}
          onCellHoverExit={this._handleCellHoverExit} />
      );

      return row;
    });

    return (
      <tbody style={{height: this.props.height}}>
        {body}
      </tbody>
    );
  },

  _orderColumnBasedData(columnBasedData, cb) {
    // If we do not have a columnOrder, return.
    if (this.props.columnOrder === undefined) return;

    let data = (Object.prototype.toString.call(columnBasedData) !== '[object Array]') ? [columnBasedData] : columnBasedData;
    let orderedData = [];

    for (let rowIdx = 0; rowIdx < data.length; rowIdx++) {
      let rowData = data[rowIdx];
      let orderedRowData = [];

      for (let colIdx = 0; colIdx < this.props.columnOrder.length; colIdx++) {
        let columnId = this.props.columnOrder[colIdx];
        let columnData = rowData[columnId] || {};

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

  _setColumnWidths(columnData) {
    columnData.forEach((column) => {
      if (column.style === undefined) {
        column.style = {
          width: this.props.defaultColumnWidth,
          maxWidth: this.props.defaultColumnWidth,
        };
      }
      else {
        if (column.style.width === undefined) column.style.width = this.props.defaultColumnWidth;
        if (column.style.maxWidth === undefined) column.style.maxWidth = this.props.defaultColumnWidth;
      }
    });

    return columnData;
  },

  _isRowSelected(rowNumber) {
    if (this.state.allRowsSelected) {
      return true;
    }

    for (let i = 0; i < this.state.selectedRows.length; i++) {
      let selection = this.state.selectedRows[i];

      if (typeof selection === 'object') {
        if (this._isValueInRange(rowNumber, selection)) return true;
      }
      else {
        if (selection === rowNumber) return true;
      }
    }

    return false;
  },

  _isValueInRange(value, range) {
    if ((range.start <= value && value <= range.end) || (range.end <= value && value <= range.start)) {
      return true;
    }

    return false;
  },

  _handleRowClick(e, rowNumber) {
    e.stopPropagation();

    if (this.props.selectable) {
      // Prevent text selection while selecting rows.
      window.getSelection().removeAllRanges();
      this._processRowSelection(e, rowNumber);
    }
  },

  _processRowSelection(e, rowNumber) {
    let selectedRows = this.state.selectedRows;

    if (e.shiftKey && this.props.multiSelectable && selectedRows.length) {
      let lastSelection = selectedRows[selectedRows.length - 1];

      if (typeof lastSelection === 'object') {
        lastSelection.end = rowNumber;
      }
      else {
        selectedRows.push({start: lastSelection, end: rowNumber});
      }
    }
    else if (((e.ctrlKey && !e.metaKey) || (e.metaKey && !e.ctrlKey)) && this.props.multiSelectable) {
      let idx = selectedRows.indexOf(rowNumber);
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

  _handleCellClick(e, rowNumber, columnNumber) {
    e.stopPropagation();
    if (this.props.onCellClick) this.props.onCellClick(rowNumber, this._getColumnId(columnNumber));
  },

  _handleRowHover(e, rowNumber) {
    if (this.props.onRowHover) this.props.onRowHover(rowNumber);
  },

  _handleRowHoverExit(e, rowNumber) {
    if (this.props.onRowHoverExit) this.props.onRowHoverExit(rowNumber);
  },

  _handleCellHover(e, rowNumber, columnNumber) {
    if (this.props.onCellHover) this.props.onCellHover(rowNumber, this._getColumnId(columnNumber));
    this._handleRowHover(e, rowNumber);
  },

  _handleCellHoverExit(e, rowNumber, columnNumber) {
    if (this.props.onCellHoverExit) this.props.onCellHoverExit(rowNumber, this._getColumnId(columnNumber));
    this._handleRowHoverExit(e, rowNumber);
  },

  _onSelectAll() {
    this.setState({allRowsSelected: !this.state.allRowsSelected});
  },

  _getColumnId(columnNumber) {
    let columnId = columnNumber;
    if (this.props.displayRowCheckbox) columnId--;
    columnId = (this.props.columnOrder.length) ? this.props.columnOrder[columnId] : columnId;

    return columnId;
  },

});

module.exports = Table;
