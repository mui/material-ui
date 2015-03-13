var React = require('react');
var Classable = require('../mixins/classable');
var FontIcon = require('../font-icon');
var Toggle = require('../toggle');

var Types = {
  LINK: 'LINK',
  SUBHEADER: 'SUBHEADER',
  NESTED: 'NESTED'
};

var MenuItem = React.createClass({

  mixins: [Classable],

  propTypes: {
    index: React.PropTypes.number.isRequired,
    iconClassName: React.PropTypes.string,
    iconRightClassName: React.PropTypes.string,
    attribute: React.PropTypes.string,
    number: React.PropTypes.string,
    data: React.PropTypes.string,
    toggle: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onTouchTap: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    selected: React.PropTypes.bool
  },
  
  statics: {
    Types: Types
  },

  getDefaultProps: function() {
    return {
      toggle: false,
      disabled: false
    };
  },

  render: function() {
    var classes = this.getClasses('mui-menu-item', {
      'mui-is-selected': this.props.selected,
      'mui-is-disabled': this.props.disabled
    });
    var icon;
    var data;
    var iconRight;
    var attribute;
    var number;
    var toggle;

    if (this.props.iconClassName) icon = <FontIcon className={'mui-menu-item-icon ' + this.props.iconClassName} />;
    if (this.props.iconRightClassName) iconRight = <FontIcon className={'mui-menu-item-icon-right ' + this.props.iconRightClassName} />;
    if (this.props.data) data = <span className="mui-menu-item-data">{this.props.data}</span>;
    if (this.props.number !== undefined) number = <span className="mui-menu-item-number">{this.props.number}</span>;
    if (this.props.attribute !== undefined) attribute = <span className="mui-menu-item-attribute">{this.props.attribute}</span>;
    
    if (this.props.toggle) {
      var {
        toggle,
        onClick,
        onToggle,
        children,
        label,
        ...other
      } = this.props;
      toggle = <Toggle {...other} onToggle={this._handleToggle}/>;
    }

    return (
      <div
        key={this.props.index}
        className={classes}
        onTouchTap={this._handleTouchTap}
        onClick={this._handleOnClick}>

        {icon}
        {this.props.children}
        {data}
        {attribute}
        {number}
        {toggle}
        {iconRight}
        
      </div>
    );
  },

  _handleTouchTap: function(e) {
    if (!this.props.disabled && this.props.onTouchTap) this.props.onTouchTap(e, this.props.index);
  },

  _handleOnClick: function(e) {
    if (!this.props.disabled && this.props.onClick) this.props.onClick(e, this.props.index);
  },

  _handleToggle: function(e, toggled) {
    if (!this.props.disabled && this.props.onToggle) this.props.onToggle(e, this.props.index, toggled);
  }

});

module.exports = MenuItem;
