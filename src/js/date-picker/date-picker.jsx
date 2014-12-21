var React = require('react');
var Classable = require('../mixins/classable');

var DatePicker = React.createClass({

  mixins: [Classable],

  render: function() {
    var classes = this.getClasses('mui-date-picker', {
    });

    return (
      <div className={classes}>
        date picker
      </div>
    );
  }

});

module.exports = DatePicker;