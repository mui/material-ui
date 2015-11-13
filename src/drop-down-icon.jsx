const React = require('react');
const StylePropable = require('./mixins/style-propable');
const Transitions = require('./styles/transitions');
const ClickAwayable = require('./mixins/click-awayable');
const FontIcon = require('./font-icon');
const Menu = require('./menu/menu');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');


const DropDownIcon = React.createClass({

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  propTypes: {
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    closeOnMenuItemTouchTap: React.PropTypes.bool,
    iconStyle: React.PropTypes.object,
    iconClassName: React.PropTypes.string,
    iconLigature: React.PropTypes.string,
    style: React.PropTypes.object,
  },

  getInitialState() {
    return {
      open: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getDefaultProps() {
    return {
      closeOnMenuItemTouchTap: true,
    };
  },

  componentDidMount() {
    // This component can be deprecated once ./menu/menu has been deprecated.
    // if (process.env.NODE_ENV !== 'production') {
    //   console.warn('DropDownIcon has been deprecated. Use IconMenu instead.');
    // }
  },

  componentClickAway() {
    this.setState({ open: false });
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
        paddingRight: (spacing.iconSize + (spacing.desktopGutterLess*2)),
        height: spacing.desktopDropDownMenuItemHeight,
        lineHeight: spacing.desktopDropDownMenuItemHeight +'px',
      },
    };
    return styles;
  },

  render() {
    let {
      style,
      children,
      menuItems,
      closeOnMenuItemTouchTap,
      iconStyle,
      iconClassName,
      ...other,
    } = this.props;

    let styles = this.getStyles();

    return (
      <div {...other} style={this.prepareStyles(styles.root, this.props.style)}>
          <div onTouchTap={this._onControlClick}>
              <FontIcon
                className={iconClassName}
                style={iconStyle}>{this.props.iconLigature}</FontIcon>
              {this.props.children}
          </div>
          <Menu
            ref="menuItems"
            style={styles.menu}
            menuItems={menuItems}
            menuItemStyle={styles.menuItem}
            hideable={true}
            visible={this.state.open}
            onItemTap={this._onMenuItemClick} />
        </div>
    );
  },

  _onControlClick() {
    this.setState({ open: !this.state.open });
  },

  _onMenuItemClick(e, key, payload) {
    if (this.props.onChange) this.props.onChange(e, key, payload);

    if (this.props.closeOnMenuItemTouchTap) {
      this.setState({ open: false });
    }
  },
});

module.exports = DropDownIcon;
