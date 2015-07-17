let React = require('react');
let StylePropable = require('../mixins/style-propable');
let FontIcon = require('../font-icon');
let Toggle = require('../toggle');

const Types = {
  LINK: 'LINK',
  SUBHEADER: 'SUBHEADER',
  NESTED: 'NESTED',
};


let MenuItem = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

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
    onToggle: React.PropTypes.func,
    selected: React.PropTypes.bool,
    active: React.PropTypes.bool,
  },

  statics: {
    Types: Types,
  },

  getDefaultProps() {
    return {
      toggle: false,
      disabled: false,
      active: false,
    };
  },

  getTheme() {
    return this.context.muiTheme.component.menuItem;
  },

  getSpacing() {
    return this.context.muiTheme.spacing;
  },

  getStyles() {
    let styles = {
      root: {
        userSelect: 'none',
        cursor: 'pointer',
        lineHeight: this.getTheme().height + 'px',
        paddingLeft: this.getTheme().padding,
        paddingRight: this.getTheme().padding,
        color: this.context.muiTheme.palette.textColor,
      },
      number: {
        float: 'right',
        width: 24,
        textAlign: 'center',
      },
      attribute: {
        float: 'right',
      },
      iconRight: {
        lineHeight: this.getTheme().height + 'px',
        float: 'right',
      },
      icon: {
        float: 'left',
        lineHeight: this.getTheme().height + 'px',
        marginRight: this.getSpacing().desktopGutter,
      },
      data: {
        display: 'block',
        paddingLeft: this.getSpacing().desktopGutter * 2,
        lineHeight: this.getTheme().dataHeight + 'px',
        height: this.getTheme().dataHeight + 'px',
        verticalAlign: 'top',
        top: -12,
        position: 'relative',
        fontWeight: 300,
        color: this.context.muiTheme.palette.textColor,
      },
      toggle: {
        marginTop: ((this.getTheme().height - this.context.muiTheme.component.radioButton.size) / 2),
        float: 'right',
        width: 42,
      },
      rootWhenHovered: {
        backgroundColor: this.getTheme().hoverColor,
      },
      rootWhenSelected: {
        color: this.getTheme().selectedTextColor,
      },
      rootWhenDisabled: {
        cursor: 'default',
        color: this.context.muiTheme.palette.disabledColor,
      },
    };

    return styles;
  },

  render() {
    let icon;
    let data;
    let iconRight;
    let attribute;
    let number;
    let toggleElement;
    let styles = this.getStyles();

    if (this.props.iconClassName) icon = <FontIcon style={this.mergeAndPrefix(styles.icon, this.props.iconStyle)} className={this.props.iconClassName} />;
    if (this.props.iconRightClassName) iconRight = <FontIcon style={this.mergeAndPrefix(styles.iconRight, this.props.iconRightStyle)} className={this.props.iconRightClassName} />;
    if (this.props.data) data = <span style={this.mergeAndPrefix(styles.data)}>{this.props.data}</span>;
    if (this.props.number !== undefined) number = <span style={this.mergeAndPrefix(styles.number)}>{this.props.number}</span>;
    if (this.props.attribute !== undefined) attribute = <span style={this.mergeAndPrefix(styles.style)}>{this.props.attribute}</span>;
    if (this.props.icon) icon = this.props.icon;

    if (this.props.toggle) {
      let {
        toggle,
        onTouchTap,
        onToggle,
        onMouseEnter,
        onMouseLeave,
        children,
        label,
        style,
        ...other,
      } = this.props;
      toggleElement = <Toggle {...other} onToggle={this._handleToggle} style={styles.toggle}/>;
    }

    return (
      <div
        key={this.props.index}
        className={this.props.className}
        onTouchTap={this._handleTouchTap}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        style={this.mergeAndPrefix(
          styles.root,
          this.props.selected && styles.rootWhenSelected,
          (this.props.active && !this.props.disabled) && styles.rootWhenHovered,
          this.props.style,
          this.props.disabled && styles.rootWhenDisabled)}>

        {icon}
        {this.props.children}
        {data}
        {attribute}
        {number}
        {toggleElement}
        {iconRight}

      </div>
    );
  },

  _handleTouchTap(e) {
    if (!this.props.disabled && this.props.onTouchTap) this.props.onTouchTap(e, this.props.index);
  },

  _handleToggle(e, toggled) {
    if (!this.props.disabled && this.props.onToggle) this.props.onToggle(e, this.props.index, toggled);
  },

  _handleMouseEnter(e) {
    if (!this.props.disabled && this.props.onMouseEnter) this.props.onMouseEnter(e, this.props.index);
  },

  _handleMouseLeave(e) {
    if (!this.props.disabled && this.props.onMouseLeave) this.props.onMouseLeave(e,this.props.index);
  },
});

module.exports = MenuItem;
