/**
 * @jsx React.DOM
 */

var React = require('react'),
  Toggle = require('../../../material-ui/js/toggle.jsx');

var ButtonPage = React.createClass({

  render: function() {
    return (
    	<div>
    		<h2>Toggles</h2>
        <Toggle onToggle={this._onToggle} />
    	</div>
    );
  },

  _onToggle: function(e, toggled) {
    console.log('Toggled: ', toggled);
  }

});

module.exports = ButtonPage;