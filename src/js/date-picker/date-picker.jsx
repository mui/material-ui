var React = require('react');
var Classable = require('../mixins/classable.js');
var DatePickerDialog = require('./date-picker-dialog.jsx');
var Input = require('../input.jsx');

var DatePicker = React.createClass({

  mixins: [Classable],

  propTypes: {
    initialDate: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      initialDate: new Date()
    };
  },

  getInitialState: function() {
    return {
      selectedDate: this.props.initialDate
    };
  },

  render: function() {
    var {
      ...other
    } = this.props;
    var classes = this.getClasses('mui-date-picker-input');

    return (
      <div className="mui-date-picker">
        <Input
          {...other}
          ref="input"
          className={classes}
          inlinePlaceholder={true}
          placeholder="Dialog Date Picker - Tall"
          onTouchTap={this._handleInputTouchTap} />
        <DatePickerDialog ref="dialogWindow" />
      </div>
      
    );
  },

  _handleInputTouchTap: function() {
    this.refs.input.blur();
    this.refs.dialogWindow.show();
  }

});

module.exports = DatePicker;