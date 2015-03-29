var React = require('react');
var Classable = require('../mixins/classable');
var ClickAwayable = require('../mixins/click-awayable');
var TableHeader = require('./table-header');
var TableRow = require('./table-row');
var TableFooter = require('./table-footer');
var DOM = require('../utils/dom');

// Consider making ClickAwayable to undo row selection
var Table = React.createClass({

  mixins: [Classable, ClickAwayable],

  propTypes: {
    columnOrder: React.PropTypes.array,
    headerColumns: React.PropTypes.object,
    rowData: React.PropTypes.array,
    footerColumns: React.PropTypes.object,
    header: React.PropTypes.element,
    footer: React.PropTypes.element,
    fixedHeader: React.PropTypes.bool,
    fixedFooter: React.PropTypes.bool,
    stripedRows: React.PropTypes.bool,
    showRowHover: React.PropTypes.bool,
    selectEnabled: React.PropTypes.bool,
    multiSelectEnabled: React.PropTypes.bool,
    height: React.PropTypes.string,
    onRowSelection: React.PropTypes.func,
    onCellClick: React.PropTypes.func,
    onRowHover: React.PropTypes.func,
    onCellHover: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      fixedHeader: true,
      fixedFooter: true,
      height: 'inherit',
      stripedRows: false,
      showRowHover: false,
      selectEnabled: true,
      multiSelectEnabled: false
    };
  },
  
  getInitialState: function() {
    return {
      selectedRows: []
    };
  },
  
  componentDidMount: function() {
    this._updateFixedTableComponents();
  },
  
  componentDidUpdate: function(prevProps, prevState) {
    this._updateFixedTableComponents();
  },
  
  componentClickAway: function() {
    this.setState({ selectedRows: [] });
  },

  render: function() {
    var classes = this.getClasses('mui-table', {
      'mui-row-hover': this.props.showRowHover
    });
    
    var tHead = this._getHeader();
    var tBody = this._getBody();
    var tFoot = this._getFooter();
    
    var headerTable, footerTable;
    if (tHead !== undefined) {
      headerTable = (
        <div className="mui-head-table">
          <table ref="headerTable" className={classes}>
            {tHead}
          </table>
        </div>
      );
    }
    if (tFoot !== undefined) {
      footerTable = (
        <div className="mui-footer-table">
          <table ref="footerTable" className={classes}>
            {tFoot}
          </table>
        </div>
      );
    }
    
    var style = {
      muiTableWrapper: {
        border: 'solid 1px #e0e0e0'
      },
      muiTableBody: {
        height: this.props.height,
        overflow: (this.props.fixedHeader || this.props.fixedFooter) ? 'auto' : 'visible'
      }
    };
    
    return (
      <div className="mui-table-wrapper" style={style.muiTableWrapper}>
        {headerTable}
        <div className="mui-table-body" style={style.muiTableBody}>
          <table ref="bodyTable" className={classes}>
            {tHead}
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
        <TableHeader headerItems={orderedHeaderColumns} />
      );
    }
  },
  
  _getFooter: function() {
    if (this.props.footer) return this.props.footer;
    
    if (this.props.footerColumns) {
      var orderedFooterColumns = this._orderColumnBasedData(this.props.footerColumns);
      return (
        <TableFooter footerItems={orderedFooterColumns} />
      );
    }
  },
  
  _getBody: function() {
    var classes = (this.props.stripedRows) ? 'striped' : '';
    var body = [];
    
    for (var rowNum = 0; rowNum < this.props.rowData.length; rowNum++) {
      var rowData = this._orderColumnBasedData(this.props.rowData[rowNum]);
      var selected = this._isRowSelected(rowNum);
      var row = (
        <TableRow 
          key={'r-' + rowNum} 
          rowNumber={rowNum} 
          rowData={rowData} 
          selected={selected} 
          onRowClick={this._handleRowClick}
          onColumnClick={this._handleCellClick}
          onRowHover={this._handleRowHover} />
      );
      
      body.push(row);
    }
    
    return (
      <tbody className={classes} style={{height: this.props.height}}>
        {body}
      </tbody>
    );
  },
  
  _orderColumnBasedData: function(columnBasedData) {
    var data = [];
    for (var index = 0; index < this.props.columnOrder.length; index++) {
      var columnId = this.props.columnOrder[index];
      var columnData = columnBasedData[columnId] || undefined;
      data.push(columnData);
    }
    
    return data;
  },
  
  _isRowSelected: function(rowNumber) {
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
  
  _updateFixedTableComponents: function() {
    if (this.props.fixedHeader) this._updateFixedHeader();
    if (this.props.fixedHeader || this.props.fixedFooter) this._updateFixedColumnWidths();
  },
  
  _updateFixedHeader: function() {
    var bodyTable = this.refs.bodyTable.getDOMNode();
    var bodyTableHeader = bodyTable.getElementsByTagName('thead')[0];
    var headerHeightOffset = bodyTableHeader.clientHeight + 1; // +1 for border width
    
    bodyTable.style.marginTop = '-' + headerHeightOffset + 'px';
  },
  
  _updateFixedColumnWidths: function() {
    var columnsToUpdate = {};
    var columnWidths = [];
    
    // Get header columns to update
    if (this.props.fixedHeader && (this.props.headerColumns || this.props.header)) {
      var headerTable = this.refs.headerTable.getDOMNode();
      var headerTableHeader = headerTable.getElementsByTagName('thead')[0];
      var headerTableHeaderColumns = headerTableHeader.children[0].children;
      columnsToUpdate.headerTableHeaderColumns = headerTableHeaderColumns;
    }
    
    // Get footer columns to update
    if (this.props.fixedFooter && (this.props.footerColumns || this.props.footer)) {
      var footerTable = this.refs.footerTable.getDOMNode();
      var footerTableFooter = footerTable.getElementsByTagName('tfoot')[0];
      var footerTableFooterColumns = footerTableFooter.children[0].children;
      columnsToUpdate.footerTableFooterColumns = footerTableFooterColumns;
    }
    
    // No fixed components to adjust, nothing to do.
    if (Object.keys(columnsToUpdate).length === 0) return;
    
    var bodyTable = this.refs.bodyTable.getDOMNode();
    var bodyTableBody = bodyTable.getElementsByTagName('tbody')[0];
    var firstBodyRowColumns = bodyTableBody.children[0].children;
    columnsToUpdate.firstBodyRowColumns = firstBodyRowColumns;
    
    // Collect column widths
    for (var i = 0; i < firstBodyRowColumns.length; i++) {
      columnWidths.push(firstBodyRowColumns[i].clientWidth);
    }
    
    // Assign widths
    var keys = Object.keys(columnsToUpdate);
    for (var i = 0; i < columnWidths.length; i++) {
      var width = columnWidths[i] + 'px';
      
      keys.forEach(function(key) {
        columnsToUpdate[key][i].style.width = width;
      });
    }
  },
  
  _handleRowClick: function(e, rowNumber) {
    // Prevent text selection while selecting rows.
    window.getSelection().removeAllRanges();
    
    if (this.props.selectEnabled) {
      this._processRowSelection(e, rowNumber);
    }
  },
  
  _processRowSelection: function(e, rowNumber) {
    var rowData = this.props.rowData[rowNumber];
    var selectedRows = this.state.selectedRows;
    
    if (e.shiftKey && this.props.multiSelectEnabled && selectedRows.length) {
      var lastSelection = selectedRows[selectedRows.length - 1];
      var start, end, direction;
      
      if (typeof lastSelection === 'object') {
        lastSelection.end = rowNumber;
      }
      else {
        selectedRows.push({start: lastSelection, end: rowNumber});
      }
    }
    else if (((e.ctrlKey && !e.metaKey) || (e.metaKey && !e.ctrlKey)) && this.props.multiSelectEnabled) {
      if (selectedRows.indexOf(rowNumber) < 0) {
        selectedRows.push(rowNumber);
      }
    }
    else {
      selectedRows = [rowNumber];
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
  }
});

module.exports = Table;
