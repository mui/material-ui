var React = require('react');
var Classable = require('../mixins/classable');
var DialogWindow = require('../dialog-window.jsx');

var DatePicker = React.createClass({

  mixins: [Classable],

  render: function() {
    var {
      className,
      ...other
    } = this.props;
    var classes = this.getClasses('mui-date-picker', {
    });

    return (
      <DialogWindow {...other}
        ref="dialogWindow"
        className={classes}>
        date picker
      </DialogWindow>
    );
  },

  show: function() {
    this.refs.dialogWindow.show();
  }

});

module.exports = DatePicker;