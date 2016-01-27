import React from 'react';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import ClickAwayable from './mixins/click-awayable';
import FontIcon from './font-icon';
import Menu from './menu/menu';
import getMuiTheme from './styles/getMuiTheme';
import warning from 'warning';

const DropDownIcon = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    closeOnMenuItemTouchTap: React.PropTypes.bool,
    iconClassName: React.PropTypes.string,
    iconLigature: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    menuItems: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable, ClickAwayable],

  getDefaultProps() {
    return {
      closeOnMenuItemTouchTap: true,
    };
  },

  getInitialState() {
    warning(false, 'DropDownIcon has been deprecated and will be removed in an upcoming verion.' +
      ' Please use IconMenu instead.');

    return {
      open: false,
      muiTheme: this.context.muiTheme || getMuiTheme(),
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

  componentClickAway() {
    this.setState({open: false});
  },

  getStyles() {
    let spacing = this.state.muiTheme.rawTheme.spacing;
    let iconWidth = 48;
    let styles = {
      root: {
        display: 'inline-block',
        width: iconWidth + 'px !important',
        position: 'relative',
        height: spacing.desktopToolbarHeight,
        fontSize: spacing.desktopDropDownMenuFontSize,
        cursor: 'pointer',
      },
      menu: {
        transition: Transitions.easeOut(),
        right: '-14px !important',
        top: '9px !important',
        opacity: (this.state.open) ? 1 : 0,
      },
      menuItem: { // similair to drop down menu's menu item styles
        paddingRight: (spacing.iconSize + (spacing.desktopGutterLess * 2)),
        height: spacing.desktopDropDownMenuItemHeight,
        lineHeight: spacing.desktopDropDownMenuItemHeight + 'px',
      },
    };
    return styles;
  },

  _onControlClick() {
    this.setState({open: !this.state.open});
  },

  _onMenuItemClick(e, key, payload) {
    if (this.props.onChange) this.props.onChange(e, key, payload);

    if (this.props.closeOnMenuItemTouchTap) {
      this.setState({open: false});
    }
  },

  render() {
    const {
      style,
      children,
      menuItems,
      closeOnMenuItemTouchTap,
      iconStyle,
      iconLigature,
      iconClassName,
      ...other,
    } = this.props;

    const styles = this.getStyles();

    return (
      <div {...other} style={this.prepareStyles(styles.root, style)}>
        <div onTouchTap={this._onControlClick}>
          <FontIcon
            className={iconClassName}
            style={iconStyle}
          >
            {iconLigature}
          </FontIcon>
          {children}
        </div>
        <Menu
          ref="menuItems"
          style={styles.menu}
          menuItems={menuItems}
          menuItemStyle={styles.menuItem}
          hideable={true}
          visible={this.state.open}
          onItemTap={this._onMenuItemClick}
        />
      </div>
    );
  },

});

export default DropDownIcon;
