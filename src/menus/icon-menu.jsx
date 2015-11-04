const React = require('react');
const ReactDOM = require('react-dom');
const ReactTransitionGroup = require('react-addons-transition-group');
const StylePropable = require('../mixins/style-propable');
const Events = require('../utils/events');
const PropTypes = require('../utils/prop-types');
const Menu = require('../menus/menu');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');
const Popover = require('../popover/popover');

const IconMenu = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    anchorOrigin: PropTypes.origin,
    closeOnItemTouchTap: React.PropTypes.bool,
    iconButtonElement: React.PropTypes.element.isRequired,
    iconStyle: React.PropTypes.object,
    menuOverlapsIcon: React.PropTypes.bool,
    menuStyle: React.PropTypes.object,
    onItemTouchTap: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    targetOrigin: PropTypes.origin,
    touchTapCloseDelay: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      closeOnItemTouchTap: true,
      onItemTouchTap: () => {},
      onKeyboardFocus: () => {},
      onMouseDown: () => {},
      onMouseLeave: () => {},
      onMouseEnter: () => {},
      onMouseUp: () => {},
      onTouchTap: () => {},
      anchorOrigin: {
        vertical:'top',
        horizontal:'left',
      },
      targetOrigin: {
        vertical:'top',
        horizontal:'left',
      },
      menuOverlapsIcon:true,
      touchTapCloseDelay: 200,
    };
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

  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      iconButtonRef: this.props.iconButtonElement.props.ref || 'iconButton',
      menuInitiallyKeyboardFocused: false,
      open: false,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  componentWillUnmount() {
    if (this._timeout) clearTimeout(this._timeout);
  },

  render() {
    let {
      anchorOrigin,
      className,
      closeOnItemTouchTap,
      iconButtonElement,
      iconStyle,
      onItemTouchTap,
      onKeyboardFocus,
      onMouseDown,
      onMouseLeave,
      onMouseEnter,
      onMouseUp,
      onTouchTap,
      menuOverlapsIcon,
      menuStyle,
      style,
      targetOrigin,
      ...other,
    } = this.props;

    let {open} = this.state;

    let styles = {
      root: {
        display: 'inline-block',
        position: 'relative',
      },

      menu: {
        position:'relative',
      },
    };

    let mergedRootStyles = this.prepareStyles(styles.root, style);
    let mergedMenuStyles = this.mergeStyles(styles.menu, menuStyle);

    let iconButton = React.cloneElement(iconButtonElement, {
      onKeyboardFocus: this.props.onKeyboardFocus,
      iconStyle: this.mergeStyles(iconStyle, iconButtonElement.props.iconStyle),
      onTouchTap: (e) => {
        this.open(Events.isKeyboard(e), e);
        if (iconButtonElement.props.onTouchTap) iconButtonElement.props.onTouchTap(e);
      },
      ref: this.state.iconButtonRef,
    });

    let menu =
      <Menu
        {...other}
        animateOpen={true}
        initiallyKeyboardFocused={this.state.menuInitiallyKeyboardFocused}
        onEscKeyDown={this._handleMenuEscKeyDown}
        onItemTouchTap={this._handleItemTouchTap}
        zDepth={0}
        style={mergedMenuStyles}>
        {this.props.children}
      </Menu>;

    return (
      <div
        className={className}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        onMouseUp={onMouseUp}
        onTouchTap={onTouchTap}
        style={mergedRootStyles}>
        {iconButton}
        <Popover
          anchorOrigin={anchorOrigin}
          targetOrigin={targetOrigin}
          open={open}
          anchorEl={this.state.anchorEl}
          childContextTypes={this.constructor.childContextTypes}
          onRequestClose={this.close}
          context={this.context}>
            {menu}
        </Popover>
      </div>
    );
  },

  isOpen() {
    return this.state.open;
  },

  close(isKeyboard) {
    if (!this.state.open) {
      return;
    }
    this.setState({open: false}, () => {
      //Set focus on the icon button when the menu close
      if (isKeyboard) {
        let iconButton = this.refs[this.state.iconButtonRef];
        ReactDOM.findDOMNode(iconButton).focus();
        iconButton.setKeyboardFocus();
      }
    });
  },

  open(menuInitiallyKeyboardFocused, e) {
    this.setState({
      open: true,
      menuInitiallyKeyboardFocused: menuInitiallyKeyboardFocused,
      anchorEl: e.currentTarget,
    });
  },

  _handleItemTouchTap(e, child) {
    if (this.props.closeOnItemTouchTap) {
      let isKeyboard = Events.isKeyboard(e);


      this._timeout = setTimeout(() => {
        this.close(isKeyboard);
      }, this.props.touchTapCloseDelay);
    }

    this.props.onItemTouchTap(e, child);
  },

  _handleMenuEscKeyDown() {
    this.close(true);
  },

});

module.exports = IconMenu;
