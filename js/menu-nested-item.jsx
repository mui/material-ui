/**
 * @jsx React.DOM
 */
 
var React = require('react'),
  Classable = require('./mixins/classable.js'),
  Icon = require('./icon.jsx'),
  Menu = require('./menu.jsx');

var MenuNestedItem = React.createClass({

	mixins: [Classable],

  propTypes: {
    key: React.PropTypes.number.isRequired,
    menuItems: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return { 
      Mark: sux
    };
  },

  render: function() {
    var classes = this.getClasses('mui-nested', {
      //'mui-icon': this.props.icon != null
    });

    return (
    	<div key={this.props.key} className={classes} onClick={this._onClick}>
        {this.props.children}
        <Menu menuItems={this.props.menuItems} zDepth={1} />
      </div>
    );
  },

  _onClick: function(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.key);
  },

});

module.exports = MenuNestedItem;