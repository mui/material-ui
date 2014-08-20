/**
 * @jsx React.DOM
 */
 
var React = require('react'),
  Classable = require('./mixins/classable.js');

var MenuItem = React.createClass({

	mixins: [Classable],

  propTypes: {
    key: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool
  },

  render: function() {
    var classes = this.getClasses('mui-menu-item');

    return (
    	<div key={this.props.key} className={classes} onClick={this._onClick}>
        {this.props.children}
      </div>
    );
  },

  _onClick: function(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.key);
  }

});

module.exports = MenuItem;
