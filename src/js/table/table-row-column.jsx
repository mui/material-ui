var React = require('react');
var Classable = require('../mixins/classable');

var TableRowColumn = React.createClass({

  mixins: [Classable],

  propTypes: {
    colData: React.PropTypes.object.isRequired,
    columnNumber: React.PropTypes.number.isRequired,
    onColumnClick: React.PropTypes.func
  },

  render: function() {
    var classes = this.getClasses('mui-table-row-column');
    var value = this.props.colData.value;
    
    return (
      <td key={this.props.key} className={classes} onClick={this._onColumnClick}>
        {this.props.colData.content}
      </td>
    );
  },
  
  _onColumnClick: function(e) {
    if (this.props.onColumnClick) this.props.onColumnClick(e, this.props.columnNumber);
  }

});

module.exports = TableRowColumn;
