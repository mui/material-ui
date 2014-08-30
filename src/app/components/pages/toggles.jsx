/**
 * @jsx React.DOM
 */

var React = require('react'),
    mui = require('mui');

var ButtonPage = React.createClass({

  render: function() {
    return (
    	<div>
    		<h2>Toggles</h2>
        <mui.Toggle onToggle={this._onToggle} />
    	</div>
    );
  },

  _onToggle: function(e, toggled) {
    console.log('Toggled: ', toggled);
  }

});

module.exports = ButtonPage;