/**
 * @jsx React.DOM
 */

var React = require('react'),
  Classable = require('./mixins/classable.js'),
  Icon = require('./icon.jsx'),
  Paper = require('./paper.jsx');

var AppBar = React.createClass({

  mixins: [Classable],

  propTypes: {
    title : React.PropTypes.string,
    onMenuIconClick: React.PropTypes.func,
    zDepth: React.PropTypes.number
  },

  getDefaultProps: function() {
  	return {
      title: '',
      zDepth: 1
  	}
  },

  render: function() {
    var classes = this.getClasses('mui-app-bar'),
      title, menuIcon;

    if (this.props.title) title = <h1 className="mui-app-bar-title">{this.props.title}</h1>;
    if (this.props.onMenuIconClick) menuIcon = <Icon className="mui-app-bar-navigation-icon" icon="navigation-menu" onClick={this.props.onMenuIconClick} />;

    return (
    	<Paper rounded={false} className={classes} zDepth={this.props.zDepth}>
        {menuIcon}
        {title}
    		{this.props.children}
    	</Paper>
    );
  }

});

module.exports = AppBar;
