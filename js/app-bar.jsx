/**
 * @jsx React.DOM
 */
 
var React = require('react'),
  Classable = require('./mixins/classable.js'),
  Paper = require('./paper.jsx');

var AppBar = React.createClass({

  mixins: [Classable],

  getInitialState: function() {
  	return {
  		classes: 'mui-app-bar'
  	}
  },

  getDefaultProps: function() {
  	return {
  		keyHeight: 1,
      title: ''
  	}
  },

  render: function() {
    return (
    	<Paper className={this.state.mergedClasses}>
        {this._getTitle()}
    		{this.props.children}
    	</Paper>
    );
  },

  _getTitle: function() {
    return this.props.title ? (
      <h1 className="mui-app-bar-title">{this.props.title}</h1>
    ) : null;
  }

});

module.exports = AppBar;
