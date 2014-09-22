/**
 * @jsx React.DOM
 */
 
var React = require('react'),
  Classable = require('./mixins/classable.js'),
  Icon = require('./icon.jsx'),
  Toggle = require('./toggle.jsx'),

  Types = {
    SUBHEADER: 'SUBHEADER',
    NESTED: 'NESTED'
  };

var MenuItem = React.createClass({

	mixins: [Classable],

  propTypes: {
    key: React.PropTypes.number.isRequired,
    icon: React.PropTypes.string,
    iconRight: React.PropTypes.string,
    number: React.PropTypes.string,
    data: React.PropTypes.string,
    toggle: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    selected: React.PropTypes.bool
  },

  statics: {
    Types: Types
  },

  getDefaultProps: function() {
    return { 
      toggle: false
    };
  },

  render: function() {
    var classes = this.getClasses('mui-menu-item', {
        'mui-selected': this.props.selected
      }),
      icon,
      data,
      iconRight,
      menuItemNumber,
      toggle;

    if (this.props.icon) icon = <Icon className="mui-menu-item-icon" icon={this.props.icon} />;
    if (this.props.data) data = <span className="mui-menu-item-data">{this.props.data}</span>;
    if (this.props.iconRight) iconRight = <Icon className="mui-menu-item-icon-right" icon={this.props.iconRight} />;
    if (this.props.number !== undefined) menuItemNumber = <span className="mui-menu-item-number">{this.props.number}</span>;
    if (this.props.toggle) toggle = <Toggle onToggle={this._onToggleClick} />;

    return (
    	<div key={this.props.key} className={classes} onClick={this._onClick}>
        {icon}
        {this.props.children}
        {data}
        {menuItemNumber}
        {toggle}
        {iconRight}
      </div>
    );
  },

  _onClick: function(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.key);
  },

  _onToggleClick: function(e, toggled) {
    if (this.props.onToggle) this.props.onToggle(e, this.props.key, toggled);
  }

});

module.exports = MenuItem;
