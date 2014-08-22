/**
 * @jsx React.DOM
 */
 
var React = require('react'),
  Classable = require('./mixins/classable.js'),
  Icon = require('./icon.jsx'),
  Toggle = require('./toggle.jsx');

var MenuItem = React.createClass({

	mixins: [Classable],

  propTypes: {
    key: React.PropTypes.number.isRequired,
    icon: React.PropTypes.string,
    number: React.PropTypes.string,
    toggle: React.PropTypes.bool,
    onClick: React.PropTypes.func.isRequired,
    onToggle: React.PropTypes.func,
    selected: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return { 
      toggle: false
    };
  },

  render: function() {
    var classes = this.getClasses('mui-menu-item', {
      'mui-icon': this.props.icon != null,
      'mui-number': this.props.number != null,
      'mui-toggle': this.props.toggle === true
    });

    return (
    	<div key={this.props.key} className={classes} onClick={this._onClick}>
        <Icon className="mui-menu-item-icon" icon={this.props.icon} />
        {this.props.children}
        <span className="mui-menu-item-number">
          {this.props.number}
        </span>
        <Toggle className="mui-menu-item-toggle" onToggle={this._onToggleClick} />
      </div>
    );
  },

  _onClick: function(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.key);
  },

  _onToggleClick: function(e) {
    if (this.props.onToggle) this.props.onToggle(e);
  }

});

module.exports = MenuItem;