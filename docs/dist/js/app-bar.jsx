/**
 * @jsx React.DOM
 */

var React = require('react'),
  Classable = require('./mixins/classable.js'),
  Paper = require('./paper.jsx');

var AppBar = React.createClass({

  mixins: [Classable],

  propTypes: {
    title : React.PropTypes.string
  },

  getDefaultProps: function() {
  	return {
      title: ''
  	}
  },

  render: function() {
    var classes = this.getClasses('mui-app-bar'),
      title;

    if (this.props.title) title = <h1 className="mui-app-bar-title">{this.props.title}</h1>;

    return (
    	<Paper rounded={false} className={classes}>
        {title}
    		{this.props.children}
    	</Paper>
    );
  }

});

module.exports = AppBar;
