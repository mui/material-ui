var React = require('react');
var StylePropable = require('../mixins/style-propable');
var CustomVariables = require('../styles/variables/custom-variables');
var FontIcon = require('../font-icon');
var Toggle = require('../toggle');

var Types = {
  LINK: 'LINK',
  SUBHEADER: 'SUBHEADER',
  NESTED: 'NESTED'
};

var MenuItem = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    index: React.PropTypes.number.isRequired,
    className: React.PropTypes.string,
    iconClassName: React.PropTypes.string,
    iconRightClassName: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    iconRightStyle: React.PropTypes.object,
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

  getInitialState: function() {
    return {
      hovered: false
    }
  },

  /** Styles */
  _main: function() {
    var style = this.mergeAndPrefix({
      userSelect: 'none',
      cursor: 'pointer',
      lineHeight: CustomVariables.menuItemHeight + 'px',
      paddingLeft: CustomVariables.menuItemPadding,
      paddingRight: CustomVariables.menuItemPadding,
    });

    if (this.state.hovered && !this.props.disabled) style.backgroundColor = CustomVariables.menuItemHoverColor;
    if (this.props.selected) style.color = CustomVariables.menuItemSelectedTextColor;

    if (this.props.disabled) {
      style.cursor = 'default';
      style.color = CustomVariables.disabledColor;
    }

    return style;
  },

  _number: function() {
    return {
      float: 'right',
      width: 24,
      textAlign: 'center'
    }
  },

  _attribute: function() {
    return {
      float: 'right'
    }
  },

  _iconRight: function() {
    return this.mergeStyles({
      lineHeight: CustomVariables.menuItemHeight + 'px',
      float: 'right'
    }, this.props.iconRightStyle);
  },

  _icon: function () {
    return this.mergeStyles({
      float: 'left',
      lineHeight: CustomVariables.menuItemHeight + 'px',
      marginRight: CustomVariables.spacing.desktopGutter
    }, this.props.iconStyle);
  },

  _data: function() {
    return {
      display: 'block',
      paddingLeft: CustomVariables.spacing.desktopGutter * 2,
      lineHeight: CustomVariables.menuItemDataHeight + 'px',
      height: CustomVariables.menuItemDataHeight + 'px',
      verticalAlign: 'top',
      top: -12,
      position: 'relative',
      fontWeight: 300,
    }
  },

  _toggle: function() {
    return {
      marginTop: ((CustomVariables.menuItemHeight - CustomVariables.radioButtonSize) / 2),
      float: 'right',
      width: 42,
    }
  },

  render: function() {
    var icon;
    var data;
    var iconRight;
    var attribute;
    var number;
    var toggle;

    if (this.props.iconClassName) icon = <FontIcon style={this._icon()} className={this.props.iconClassName} />;
    if (this.props.iconRightClassName) iconRight = <FontIcon style={this._iconRight()} className={this.props.iconRightClassName} />;
    if (this.props.data) data = <span style={this._data()}>{this.props.data}</span>;
    if (this.props.number !== undefined) number = <span style={this._number()}>{this.props.number}</span>;
    if (this.props.attribute !== undefined) attribute = <span style={this._style()}>{this.props.attribute}</span>;
    
    if (this.props.toggle) {
      var {
        toggle,
        onClick,
        onToggle,
        onMouseOver,
        onMouseOut,
        children,
        label,
        style,
        ...other
      } = this.props;
      toggle = <Toggle {...other} onToggle={this._handleToggle} style={this._toggle()}/>;
    }

    return (
      <div
        key={this.props.index}
        style={this._main()}
        className={this.props.className} 
        onTouchTap={this._handleTouchTap}
        onClick={this._handleOnClick}
        onMouseOver={this._handleMouseOver}
        onMouseOut={this._handleMouseOut}>

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
  },

  _handleMouseOver: function(e) {
    this.setState({hovered: true});
    if (!this.props.disabled && this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleMouseOut: function(e) {
    this.setState({hovered: false});
    if (!this.props.disabled && this.props.onMouseOut) this.props.onMouseOut(e);
  }

});

module.exports = MenuItem;
