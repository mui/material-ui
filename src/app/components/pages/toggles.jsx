/**
 * @jsx React.DOM
 */

var React = require('react'),
    mui = require('mui'),
    CodeExample = require('../code-example/code-example.jsx');

var TogglePage = React.createClass({

  render: function() {
    return (
    	<div>
    		<h2>Toggles</h2>
        {this._getToggleExample()}
    	</div>
    );
  },

  _getToggleExample: function() {
    var code = 
      '<Toggle />';

    return (
      <CodeExample code={code}>
        <mui.Toggle onToggle={this._onToggle} />
      </CodeExample>
    );
  },

  _onToggle: function(e, toggled) {
    console.log('Toggled: ', toggled);
  }

});

module.exports = TogglePage;