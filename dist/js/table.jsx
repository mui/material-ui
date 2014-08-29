/**
 * @jsx React.DOM
 */

var $ = require('jquery'),
  React = require('react'),
	Classable = require('./mixins/classable.js'),
  Paper = require('./paper.jsx');
  TableHeader = require('./table-header.jsx'),
  TableRows = require('./table-rows.jsx');

var Table = React.createClass({

	mixins: [Classable],

	propTypes: {
  },


  getDefaultProps: function() {
    return { 
    };
  },

  getInitialState: function() {
    return {
      headerItems: [
        { payload: '1', text: 'Details' },
        { payload: '2', text: 'Length' },
        { payload: '3', text: 'Created' },
        { payload: '4', text: 'Last Used' }
      ],

      rowItems: [
        { payload: '1', col1: '1col1', col2: '1Col2', col3: '1Col3', col4: '1Col4' },
        { payload: '2', col1: '2col1', col2: '2Col2', col3: '2Col3', col4: '2Col4' },
        { payload: '3', col1: '3col1', col2: '3col2', col3: '3Col3', col4: '3Col4' },
        { payload: '4', col1: '4col1', col2: '4col2', col3: '4Col3', col4: '4Col4' }
      ]
    }
  },

	render: function() {
    var classes = this.getClasses('mui-table');

    return (
      <Paper zDepth={this.props.zDepth} className={classes}>
			 <TableHeader headerItems={this.state.headerItems} />
       <TableRows rowItems={this.state.rowItems} />
      </Paper>
		);
	}

});

module.exports = Table;