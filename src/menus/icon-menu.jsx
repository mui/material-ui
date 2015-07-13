let React = require('react/addons');
let ReactTransitionGroup = React.addons.TransitionGroup;
let ClickAwayable = require('../mixins/click-awayable');
let StylePropable = require('../mixins/style-propable');
let Events = require('../utils/events');
let Menu = require('../menus/menu');


let IconMenu = React.createClass({

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    iconButtonElement: React.PropTypes.element.isRequired,
    openDirection: React.PropTypes.oneOf([
      'bottom-left',
      'bottom-right',
      'top-left',
      'top-right',
    ]),
    onItemKeyboardActivate: React.PropTypes.func,
    onItemTouchTap: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    menuStyle: React.PropTypes.object,
    touchTapCloseDelay: React.PropTypes.number,
    closeOnItemTouchTap: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      openDirection: 'bottom-left',
      onItemKeyboardActivate: () => {},
      onItemTouchTap: () => {},
      onKeyboardFocus: () => {},
      onMouseDown: () => {},
      onMouseOut: () => {},
      onMouseOver: () => {},
      onMouseUp: () => {},
      onTouchTap: () => {},
      touchTapCloseDelay: 200,
      closeOnItemTouchTap: true,
    };
  },

  getInitialState() {
    return {
      iconButtonRef: this.props.iconButtonElement.props.ref || 'iconButton',
      menuInitiallyKeyboardFocused: false,
      open: false,
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
      onKeyboardFocus,
      onMouseDown,
      onMouseOut,
      onMouseOver,
      onMouseUp,
      onTouchTap,
      menuStyle,
      style,
      ...other,
    } = this.props;

    let open = this.state.open;
    let openDown = openDirection.split('-')[0] === 'bottom';
    let openLeft = openDirection.split('-')[1] === 'left';

    let styles = {
      root: {
        display: 'inline-block',
        position: 'relative',
      },

      menu: {
        top: openDown ? 12 : null,
        bottom: !openDown ? 12 : null,
        left: !openLeft ? 12 : null,
        right: openLeft ? 12 : null,
      },
    };

    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    let mergedMenuStyles = this.mergeStyles(styles.menu, menuStyle);

    let iconButton = React.cloneElement(iconButtonElement, {
      onKeyboardFocus: this.props.onKeyboardFocus,
      onTouchTap: (e) => {
        this.open(Events.isKeyboard(e));
        if (iconButtonElement.props.onTouchTap) iconButtonElement.props.onTouchTap(e);
      }.bind(this),
      ref: this.state.iconButtonRef,
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
      <div
        onMouseDown={onMouseDown}
        onMouseOut={onMouseOut}
        onMouseOver={onMouseOver}
        onMouseUp={onMouseUp}
        onTouchTap={onTouchTap}
        style={mergedRootStyles}>
        {iconButton}
        <ReactTransitionGroup>{menu}</ReactTransitionGroup>
      </div>
    );
  },

  close(isKeyboard) {
    if (this.state.open) {
      this.setState({open: false}, () => {
        //Set focus on the icon button when the menu close
        if (isKeyboard) {
          let iconButton = this.refs[this.state.iconButtonRef];
          React.findDOMNode(iconButton).focus();
        }
      });
    }
  },

  open(menuInitiallyKeyboardFocused) {
    if (!this.state.open) {
      this.setState({
        open: true,
        menuInitiallyKeyboardFocused: menuInitiallyKeyboardFocused,
      });
    }
  },

  _handleItemTouchTap(e, child) {

    if (this.props.closeOnItemTouchTap) {
      let isKeyboard = Events.isKeyboard(e);

      this._timeout = setTimeout(() => {
        this.close(isKeyboard);
      }, this.props.touchTapCloseDelay);

      if (isKeyboard) {
        this.refs[this.state.iconButtonRef].setKeyboardFocus();
      }
    }

    this.props.onItemTouchTap(e, child);
  },
});

module.exports = IconMenu;
