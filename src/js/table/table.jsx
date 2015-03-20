var React = require('react');
var Classable = require('../mixins/classable');
var TableHeader = require('./table-header');
var TableRow = require('./table-row');
var Paper = require('../paper');
var DOM = require('../utils/dom');

var Table = React.createClass({

  mixins: [Classable],

  propTypes: {
    columnOrder: React.PropTypes.array,
    columnHeaders: React.PropTypes.object,
    rowData: React.PropTypes.array,
    zDepth: React.PropTypes.number,
    fixedHeader: React.PropTypes.bool,
    stripedRows: React.PropTypes.bool,
    showRowHover: React.PropTypes.bool,
    selectEnabled: React.PropTypes.bool,
    multiSelectEnabled: React.PropTypes.bool,
    height: React.PropTypes.string,
    footer: React.PropTypes.element
  },

  getDefaultProps: function() {
    return {
      zDepth: 1,
      fixedHeader: true,
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
    this._setTableColumnWidths();
  },
  
  componentDidUpdate: function(prevProps, prevState) {
    this._setTableColumnWidths();
  },

  render: function() {
    var classes = this.getClasses('mui-table', {
      'mui-row-hover': this.props.showRowHover
    });

    return (
      <Paper ref="paperContainer" zDepth={this.props.zDepth} className="mui-table-container">
        <table ref="table" className={classes}>
          {this._getHeader()}
        
          {this._getFooter()}
        
          {this._getBody()}
        </table>
      </Paper>
    );
  },
  
  _getHeader: function() {
    var orderedColumnHeaders = this._orderColumnBasedData(this.props.columnHeaders);
    
    return (
      <TableHeader ref="header" headerItems={orderedColumnHeaders} />
    );
  },
  
  _getFooter: function() {
    if (this.props.footer) {
      return (
        <tfoot ref="footer">
          {this.props.footer}
        </tfoot>
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
          onColumnClick={this._handleCellClick} />
      );
      
      body.push(row);
    }
    
    return (
      <tbody ref="body" className={classes} style={{height: this.props.height}}>
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
  
  _setTableColumnWidths: function() {
    var table = this.refs.table.getDOMNode();
    var header = this.refs.header.getDOMNode();
    var body = this.refs.body.getDOMNode();
    var headerRows = header.childNodes;
    var headerColumns = headerRows[headerRows.length - 1].childNodes;
    var firstBodyRowColumns = body.childNodes[0].childNodes;
    var columnWidths = [];
    
    for (var i = 0; i < headerColumns.length; i++) {
      columnWidths.push(headerColumns[i].clientWidth);
    }
    
    // assign widths of headerNode children to fixedHeaderNode children.
    for (var i = 0; i < columnWidths.length; i++) {
      var headerColumn = headerColumns[i];
      var bodyRowColumn = firstBodyRowColumns[i];
      var width = columnWidths[i] + 'px';
      
      headerColumn.style.width = width;
      bodyRowColumn.style.width = width;
    }
    
    if (!DOM.hasClass(table, 'fixed-header')) DOM.addClass(table, 'fixed-header');
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
    else if ((e.ctrlKey || e.metaKey) && this.props.multiSelectEnabled) {
      selectedRows.push(rowNumber);
    }
    else {
      selectedRows = [rowNumber];
    }
    
    this.setState({selectedRows: selectedRows});
  },
  
  _handleCellClick: function(e, rowNumber, columnNumber) {
    console.log('clicked cell (' + rowNumber + ', ' + columnNumber + ')');
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
  }
  
});

module.exports = Table;
