var React = require('react');
var Classable = require('../mixins/classable');
var TableRowColumn = require('./table-row-column');

var TableRow = React.createClass({

  mixins: [Classable],

  propTypes: {
    rowNumber: React.PropTypes.number.isRequired,
    rowData: React.PropTypes.array.isRequired,
    onRowClick: React.PropTypes.func,
    onCellClick: React.PropTypes.func,
    onRowHover: React.PropTypes.func,
    onCellHover: React.PropTypes.func,
    selected: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      selected: false
    };
  },

  render: function() {
    var classes = this.getClasses('mui-table-row', {
      'mui-is-selected': this.props.selected
    });

    return (
      <tr className={classes} onClick={this._onRowClick}>
        {this._getColumns()}
      </tr>
    );
  },

  _getColumns: function() {
    var columns = [];

    for (var index = 0; index < this.props.rowData.length; index++) {
      var key = this.props.rowNumber + '-' + index;
      var colData = this.props.rowData[index];
      
      var columnComponent = (
        <TableRowColumn 
          key={key}
          columnNumber={index}
          colData={colData}
          onColumnClick={this._onCellClick}
          onColumnHover={this._onCellHover} />
      );

      columns.push(columnComponent);
    }

    return columns;
  },
  
  _onRowClick: function(e) {
    if (this.props.onRowClick) this.props.onRowClick(e, this.props.rowNumber);
  },
  
  _onRowHover: function(e) {
    if (this.props.onRowHover) this.props.onRowHover(e, this.props.rowNumber);
  },
  
  _onCellClick: function(e, columnIndex) {
    if (this.props.onCellClick) this.props.onCellClick(e, this.props.rowNumber, columnIndex);
    this._onRowClick(e);
  },
  
  _onCellHover: function(e, columnIndex) {
    if (this.props.onCellHove) this.props.onCellHover(e, this.props.rowNumber, columnIndex);
    this._onRowHover(e);
  }

});

module.exports = TableRow;
