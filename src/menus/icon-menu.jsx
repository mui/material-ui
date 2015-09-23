let React = require('react');
let ReactDOM = require('react-dom');
let ReactTransitionGroup = require('react-addons-transition-group');
let ClickAwayable = require('../mixins/click-awayable');
let StylePropable = require('../mixins/style-propable');
let Events = require('../utils/events');
let PropTypes = require('../utils/prop-types');
let Menu = require('../menus/menu');


let IconMenu = React.createClass({

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    closeOnItemClick: React.PropTypes.bool,
    iconButtonElement: React.PropTypes.element.isRequired,
    openDirection: PropTypes.corners,
    onItemClick: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onClick: React.PropTypes.func,
    menuStyle: React.PropTypes.object,
    clickCloseDelay: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      closeOnItemClick: true,
      openDirection: 'bottom-left',
      onItemClick: () => {},
      onKeyboardFocus: () => {},
      onMouseDown: () => {},
      onMouseLeave: () => {},
      onMouseEnter: () => {},
      onMouseUp: () => {},
      onClick: () => {},
      clickCloseDelay: 200,
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
    if (this._timeout) clearTimeout(this._timeout);
  },

  componentClickAway() {
    this.close();
  },

  render() {
    let {
      closeOnItemClick,
      iconButtonElement,
      openDirection,
      onItemClick,
      onKeyboardFocus,
      onMouseDown,
      onMouseLeave,
      onMouseEnter,
      onMouseUp,
      onClick,
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
      onClick: (e) => {
        this.open(Events.isKeyboard(e));
        if (iconButtonElement.props.onClick) iconButtonElement.props.onClick(e);
      }.bind(this),
      ref: this.state.iconButtonRef,
    });

    let menu = open ? (
      <Menu
        {...other}
        animated={true}
        initiallyKeyboardFocused={this.state.menuInitiallyKeyboardFocused}
        onEscKeyDown={this._handleMenuEscKeyDown}
        onItemClick={this._handleItemClick}
        openDirection={openDirection}
        style={mergedMenuStyles}>
        {this.props.children}
      </Menu>
    ) : null;

    return (
      <div
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        onMouseUp={onMouseUp}
        onClick={onClick}
        style={mergedRootStyles}>
        {iconButton}
        <ReactTransitionGroup>{menu}</ReactTransitionGroup>
      </div>
    );
  },

  isOpen() {
    return this.state.open;
  },

  close(isKeyboard) {
    if (this.state.open) {
      this.setState({open: false}, () => {
        //Set focus on the icon button when the menu close
        if (isKeyboard) {
          let iconButton = this.refs[this.state.iconButtonRef];
          ReactDOM.findDOMNode(iconButton).focus();
          iconButton.setKeyboardFocus();
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

  _handleItemClick(e, child) {

    if (this.props.closeOnItemClick) {
      let isKeyboard = Events.isKeyboard(e);

      this._timeout = setTimeout(() => {
        this.close(isKeyboard);
      }, this.props.clickCloseDelay);
    }

    this.props.onItemClick(e, child);
  },

  _handleMenuEscKeyDown() {
    this.close(true);
  },

});

module.exports = IconMenu;
