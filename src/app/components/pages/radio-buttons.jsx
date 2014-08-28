/**
 * @jsx React.DOM
 */

var React = require('react'),
    RadioButton = require('../../../material-ui/js/radio-button.jsx');

var RadioButtonPage = React.createClass({

  propTypes: {
  },


  render: function() {
    return (
    	<div>
    		<h2>Radio Button</h2>
        <RadioButton onClick={this._onRadioButtonClick} />
    	</div>
    );
  },

  _onRadioButtonClick: function(e, checked) {
    console.log('Clicked:', checked);
  }

});

module.exports = RadioButtonPage;