let React = require('react'),
  Classable = require('./mixins/classable');

let TableRowItem = React.createClass({

  mixins: [Classable],

  propTypes: {
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {
    let classes = this.getClasses('mui-table-rows-item');

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
