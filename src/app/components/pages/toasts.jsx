/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('mui');
var CodeExample = require('../code-example/code-example.jsx');

var ToastsPage = React.createClass({

  render: function() {
    return (
    	<div>
  			<h2>Toasts</h2>
  			{this._getToastExample()}
  		</div>
    );
  },

  _getToastExample: function() {
    var code = 
      "<Toast />";

    return (
      <CodeExample code={code}>
        <button onClick={this._triggerToast}>
          Trigger Toast
        </button>
      	<mui.Toast ref="Toast" message="Connection timed out. Showing limited broadcasts." action="undo" />
      </CodeExample>
    );
  },

  _triggerToast: function() {
    this.refs.Toast.toggle();
  }

});

module.exports = ToastsPage;