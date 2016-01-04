import React from 'react';
import StylePropable from '../mixins/style-propable';
import FontIcon from '../font-icon';
import Toggle from '../toggle';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';
import warning from 'warning';

const Types = {
  LINK: 'LINK',
  SUBHEADER: 'SUBHEADER',
  NESTED: 'NESTED',
};


const MenuItem = React.createClass({

  propTypes: {
    active: React.PropTypes.bool,
    attribute: React.PropTypes.string,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    data: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.node,
    iconClassName: React.PropTypes.string,
    iconRightClassName: React.PropTypes.string,
    iconRightStyle: React.PropTypes.object,
    iconStyle: React.PropTypes.object,
    index: React.PropTypes.number.isRequired,
    number: React.PropTypes.string,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool,
    style: React.PropTypes.object,
    toggle: React.PropTypes.bool,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

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

  getInitialState() {
    warning(false, 'This menu item component is deprecated use menus/menu-item instead.');

    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getTheme() {
    return this.state.muiTheme.menuItem;
  },

  getSpacing() {
    return this.state.muiTheme.rawTheme.spacing;
  },

  getStyles() {
    const isRtl = this.context.muiTheme.isRtl;

    const right = isRtl ? 'left' : 'right';
    const left = isRtl ? 'right' : 'left';

    const marginRight = isRtl ? 'marginLeft' : 'marginRight';
    const paddingLeft = isRtl ? 'paddingRight' : 'paddingLeft';

    let styles = {
      root: {
        userSelect: 'none',
        cursor: 'pointer',
        lineHeight: this.getTheme().height + 'px',
        paddingLeft: this.getTheme().padding,
        paddingRight: this.getTheme().padding,
        color: this.state.muiTheme.rawTheme.palette.textColor,
      },
      number: {
        float: right,
        width: 24,
        textAlign: 'center',
      },
      attribute: {
        float: right,
      },
      iconRight: {
        lineHeight: this.getTheme().height + 'px',
        float: right,
      },
      icon: {
        float: left,
        lineHeight: this.getTheme().height + 'px',
        [marginRight]: this.getSpacing().desktopGutter,
      },
      data: {
        display: 'block',
        [paddingLeft]: this.getSpacing().desktopGutter * 2,
        lineHeight: this.getTheme().dataHeight + 'px',
        height: this.getTheme().dataHeight + 'px',
        verticalAlign: 'top',
        top: -12,
        position: 'relative',
        fontWeight: 300,
        color: this.state.muiTheme.rawTheme.palette.textColor,
      },
      toggle: {
        marginTop: ((this.getTheme().height - this.state.muiTheme.radioButton.size) / 2),
        float: right,
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
        color: this.state.muiTheme.rawTheme.palette.disabledColor,
      },
    };

    return styles;
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
    if (!this.props.disabled && this.props.onMouseLeave) this.props.onMouseLeave(e, this.props.index);
  },

  render() {
    let icon;
    let data;
    let iconRight;
    let attribute;
    let number;
    let toggleElement;
    let styles = this.getStyles();

    if (this.props.iconClassName) {
      icon = (
        <FontIcon style={this.mergeStyles(styles.icon, this.props.iconStyle,
          this.props.selected && styles.rootWhenSelected)}
          className={this.props.iconClassName} />
      );
    }
    if (this.props.iconRightClassName) {
      iconRight = (
        <FontIcon style={this.mergeStyles(styles.iconRight, this.props.iconRightStyle)}
          className={this.props.iconRightClassName} />
      );
    }
    if (this.props.data) data = <span style={this.prepareStyles(styles.data)}>{this.props.data}</span>;
    if (this.props.number !== undefined) {
      number = <span style={this.prepareStyles(styles.number)}>{this.props.number}</span>;
    }
    if (this.props.attribute !== undefined) {
      attribute = <span style={this.prepareStyles(styles.style)}>{this.props.attribute}</span>;
    }
    if (this.props.icon) icon = this.props.icon;

    if (this.props.toggle) {
      let {
        toggle,
        onTouchTap,
        onToggle,
        onMouseEnter,
        onMouseLeave,
        children,
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
        style={this.prepareStyles(
          styles.root,
          this.props.selected && styles.rootWhenSelected,
          (this.props.active && !this.props.disabled) && styles.rootWhenHovered,
          this.props.style,
          this.props.disabled && styles.rootWhenDisabled)}>

        {icon}
        {this.props.children}
        {number}
        {attribute}
        {data}
        {toggleElement}
        {iconRight}

      </div>
    );
  },
});

export default MenuItem;
