/**
 * @jsx React.DOM
 */
 
var React = require('react'),
  Table = require('../../../../dist/js/table.jsx');


var TablesPage = React.createClass({

	getInitialState: function() {
  	return {
  	}
  },

  render: function() {
    return (
    	<div>
    		<h2>Tables</h2>
        {/*<Table zDepth={1} />*/}
    	</div>
    );
  }

});

module.exports = TablesPage;