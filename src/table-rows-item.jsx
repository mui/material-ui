var React = require('react'),
  Classable = require('./mixins/classable');

var TableRowItem = React.createClass({

  mixins: [Classable],

  propTypes: {
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {
    var classes = this.getClasses('mui-table-rows-item');

    return (
      <div className={classes}>
        (TableRowItem)
        <div className="mui-table-rows-actions">
          (Actions)
        </div>
      </div>
    );
  }

});

module.exports = TableRowItem;
