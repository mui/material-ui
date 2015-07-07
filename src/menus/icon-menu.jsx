let React = require('react/addons');
let ReactTransitionGroup = React.addons.TransitionGroup;
let ClickAwayable = require('../mixins/click-awayable');
let StylePropable = require('../mixins/style-propable');
let Events = require('../utils/events');
let Menu = require('../menus/menu');


let IconMenu = React.createClass({

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    iconButtonElement: React.PropTypes.element.isRequired,
    openDirection: React.PropTypes.oneOf([
      'bottom-left',
      'bottom-right',
      'top-left',
      'top-right'
    ]),
    onItemKeyboardActivate: React.PropTypes.func,
    onItemTouchTap: React.PropTypes.func,
    menuStyle: React.PropTypes.object,
    touchTapCloseDelay: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      openDirection: 'bottom-left',
      onItemKeyboardActivate: () => {},
      onItemTouchTap: () => {},
      touchTapCloseDelay: 200
    };
  },

  getInitialState() {
    return {
      iconButtonRef: this.props.iconButtonElement.props.ref || 'iconButton',
      menuInitiallyKeyboardFocused: false,
      open: false
    };
  },

  componentWillUnmount() {
    if (this._timeout)
      clearTimeout(this._timeout);
  },

  componentClickAway() {
    this.close();
  },

  render() {
    let {
      iconButtonElement,
      openDirection,
      onItemTouchTap,
      menuStyle,
      style,
      ...other
    } = this.props;

    let open = this.state.open;
    let openDown = openDirection.split('-')[0] === 'bottom';
    let openLeft = openDirection.split('-')[1] === 'left';

    let styles = {
      root: {
        display: 'inline-block',
        position: 'relative'
      },

      menu: {
        top: openDown ? 12 : null,
        bottom: !openDown ? 12 : null,
        left: !openLeft ? 12 : null,
        right: openLeft ? 12 : null
      }
    };

    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    let mergedMenuStyles = this.mergeStyles(styles.menu, menuStyle);

    let iconButton = React.cloneElement(iconButtonElement, {
      onTouchTap: (e) => {
        this.open(Events.isKeyboard(e));
        if (iconButtonElement.props.onTouchTap) iconButtonElement.props.onTouchTap(e);
      }.bind(this),
      ref: this.state.iconButtonRef
    });

    let menu = open ? (
      <Menu
        {...other}
        initiallyKeyboardFocused={this.state.menuInitiallyKeyboardFocused}
        onEscKeyDown={this.close}
        onItemTouchTap={this._handleItemTouchTap}
        openDirection={openDirection}
        style={mergedMenuStyles}>
        {this.props.children}
      </Menu>
    ) : null;

    return (
      <div style={mergedRootStyles}>
        {iconButton}
        <ReactTransitionGroup>{menu}</ReactTransitionGroup>
      </div>
    );
  },

  close() {
    if (this.state.open) {
      this.setState({open: false});
      //Set focus on the icon button when the menu closes
      React.findDOMNode(this.refs[this.state.iconButtonRef]).focus();
    }
  },

  open(menuInitiallyKeyboardFocused) {
    if (!this.state.open) {
      this.setState({
        open: true,
        menuInitiallyKeyboardFocused: menuInitiallyKeyboardFocused
      });
    }
  },

  _handleItemTouchTap(e, child) {
    this._timeout = setTimeout(() => {
      this.close();
    }, this.props.touchTapCloseDelay);
    if (Events.isKeyboard(e)) {
      this.refs[this.state.iconButtonRef].setKeyboardFocus();
    }
    this.props.onItemTouchTap(e, child);
  }
});

module.exports = IconMenu;
