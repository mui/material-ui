let React = require('react'),
  Classable = require('./mixins/classable'),
  TableRowsItem = require('./table-rows-item');

let TableRow = React.createClass({

  mixins: [Classable],

  propTypes: {
    rowItems: React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {
    let classes = this.getClasses('mui-table-rows');

    return (
      <div className={classes}>
        {this._getChildren()}
      </div>
    );
  },

  _getChildren: function() {
    let children = [],
      rowItem,
      itemComponent

    for (let i=0; i < this.props.rowItems.length; i++) {
      rowItem = this.props.rowItems[i];

      /*
      for(let prop in rowItem) {
        if(rowItem.hasOwnProperty(prop)) {
          console.log(prop);
        }
      }
      console.log("--");
      */

      itemComponent = (
        <TableRowsItem />
      );

      children.push(itemComponent);
    }

    return children;
  }

});

module.exports = TableRow;
