let React = require('react/addons');
let ClickAwayable = require('../mixins/click-awayable');
let StylePropable = require('../mixins/style-propable');
let KeyCode = require('../utils/key-code');
let Menu = require('../menus/menu');


let IconMenu = React.createClass({

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    desktop: React.PropTypes.bool,
    iconButtonElement: React.PropTypes.element.isRequired,
    multiple: React.PropTypes.bool,
    openDirection: React.PropTypes.oneOf([
      'bottom-left',
      'bottom-right',
      'top-left',
      'top-right'
    ]),
    onItemKeyboardActivate: React.PropTypes.func,
    onItemTouchTap: React.PropTypes.func,
    maxHeight: React.PropTypes.number,
    menuStyle: React.PropTypes.object,
    menuListStyle: React.PropTypes.object,
    onKeyDown: React.PropTypes.func,
    width: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      openDirection: 'bottom-left',
      onKeyDown: () => {},
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
      desktop,
      iconButtonElement,
      multiple,
      openDirection,
      onChange,
      onKeyDown,
      onItemTouchTap,
      maxHeight,
      menuStyle,
      menuListStyle,
      style,
      value,
      valueLink,
      width,
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
      <div
        {...other}
        style={mergedRootStyles}
        onKeyDown={this._handleKeyDown}>

        {iconButton}

        <Menu
          desktop={desktop}
          listStyle={menuListStyle}
          maxHeight={maxHeight}
          multiple={multiple}
          onItemTouchTap={this._handleItemTouchTap}
          onItemKeyboardActivate={this._handleItemKeyboardActivate}
          onChange={onChange}
          open={open}
          openDirection={openDirection}
          ref="menu"
          style={mergedMenuStyles}
          value={value}
          valueLink={valueLink}
          width={width}>
          {this.props.children}
        </Menu>

      </div>
    );
  },

  close() {
    if (this.state.open) {
      this.setState({
        open: false
      });
      //Set focus on the icon button when the menu closes
      React.findDOMNode(this.refs[this.state.iconButtonRef]).focus();
    }
  },

  open() {
    if (!this.state.open) {
      this.setState({
        open: true
      });
    }
  },

  _handleIconButtonKeyboardActivate() {
    this.refs.menu.setKeyboardFocused(true);
  },

  _handleKeyDown(e) {
    switch (e.keyCode) {
      case KeyCode.ESC:
        this.close();
        break;
    }
    this.props.onKeyDown(e);
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
    }, 200);
  }
});

module.exports = IconMenu;
