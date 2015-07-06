let React = require('react/addons');
let ClickAwayable = require('../mixins/click-awayable');
let StylePropable = require('../mixins/style-propable');
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
    menuStyle: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      openDirection: 'bottom-left',
      onItemKeyboardActivate: () => {},
      onItemTouchTap: () => {}
    };
  },

  getInitialState() {
    return {
      iconButtonRef: this.props.iconButtonElement.props.ref || 'iconButton',
      open: false
    };
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
      onKeyboardActivate: this._handleIconButtonKeyboardActivate,
      onTouchTap: (e) => {
        this.open();
        if (iconButtonElement.props.onTouchTap) iconButtonElement.props.onTouchTap(e);
      }.bind(this),
      ref: this.state.iconButtonRef
    });

    return (
      <div style={mergedRootStyles}>
        {iconButton}
        <Menu
          {...other}
          onEscKeyDown={this.close}
          onItemTouchTap={this._handleItemTouchTap}
          onItemKeyboardActivate={this._handleItemKeyboardActivate}
          open={open}
          openDirection={openDirection}
          ref="menu"
          style={mergedMenuStyles}>
          {this.props.children}
        </Menu>
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

  open() {
    if (!this.state.open) this.setState({open: true});
  },

  _handleIconButtonKeyboardActivate() {
    this.refs.menu.setKeyboardFocused(true);
  },

  _handleItemKeyboardActivate() {
    //The icon button receives keyboard focus when a
    //menu item is keyboard activated
    this.refs[this.state.iconButtonRef].setKeyboardFocus();
  },

  _handleItemTouchTap(e, child) {
    setTimeout(() => {
      this.close();
      this.props.onItemTouchTap(e, child);
    }, 150);
  }
});

module.exports = IconMenu;
