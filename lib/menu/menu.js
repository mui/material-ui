'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var CssEvent = require('../utils/css-event');
var Dom = require('../utils/dom');
var KeyLine = require('../utils/key-line');
var KeyCode = require('../utils/key-code');
var StylePropable = require('../mixins/style-propable');
var Transitions = require('../styles/transitions');
var ClickAwayable = require('../mixins/click-awayable');
var Paper = require('../paper');
var MenuItem = require('./menu-item');
var LinkMenuItem = require('./link-menu-item');
var SubheaderMenuItem = require('./subheader-menu-item');
var WindowListenable = require('../mixins/window-listenable');

/***********************
* Nested Menu Component
***********************/
var NestedMenuItem = React.createClass({
  displayName: 'NestedMenuItem',

  mixins: [ClickAwayable, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    index: React.PropTypes.number.isRequired,
    text: React.PropTypes.string,
    menuItems: React.PropTypes.array.isRequired,
    zDepth: React.PropTypes.number,
    disabled: React.PropTypes.bool,
    active: React.PropTypes.bool,
    onItemTap: React.PropTypes.func,
    menuItemStyle: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disabled: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      open: false,
      activeIndex: 0
    };
  },

  componentClickAway: function componentClickAway() {
    this._closeNestedMenu();
  },

  componentDidMount: function componentDidMount() {
    this._positionNestedMenu();
    var el = this.getDOMNode();
    el.focus();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._positionNestedMenu();
  },

  getSpacing: function getSpacing() {
    return this.context.muiTheme.spacing;
  },

  getStyles: function getStyles() {
    var styles = {
      root: {
        userSelect: 'none',
        cursor: 'pointer',
        lineHeight: this.getTheme().height + 'px',
        color: this.context.muiTheme.palette.textColor
      },
      icon: {
        float: 'left',
        lineHeight: this.getTheme().height + 'px',
        marginRight: this.getSpacing().desktopGutter
      },
      toggle: {
        marginTop: (this.getTheme().height - this.context.muiTheme.component.radioButton.size) / 2,
        float: 'right',
        width: 42
      },
      rootWhenHovered: {
        backgroundColor: this.getTheme().hoverColor
      },
      rootWhenSelected: {
        color: this.getTheme().selectedTextColor
      },
      rootWhenDisabled: {
        cursor: 'default',
        color: this.context.muiTheme.palette.disabledColor
      }
    };
    return styles;
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.menuItem;
  },

  render: function render() {

    var styles = this.getStyles();
    styles = this.mergeAndPrefix(styles.root, this.props.active && !this.props.disabled && styles.rootWhenHovered, {
      position: 'relative'
    }, this.props.style);

    var iconCustomArrowDropRight = {
      marginRight: this.getSpacing().desktopGutterMini * -1,
      color: this.context.muiTheme.component.dropDownMenu.accentColor
    };

    var _props = this.props;
    var index = _props.index;
    var menuItemStyle = _props.menuItemStyle;

    var other = _objectWithoutProperties(_props, ['index', 'menuItemStyle']);

    return React.createElement(
      'div',
      {
        ref: 'root',
        style: styles,
        onMouseEnter: this._openNestedMenu,
        onMouseLeave: this._closeNestedMenu,
        onMouseOver: this._handleMouseOver,
        onMouseOut: this._handleMouseOut },
      React.createElement(
        MenuItem,
        {
          index: index,
          style: menuItemStyle,
          disabled: this.props.disabled,
          iconRightStyle: iconCustomArrowDropRight,
          iconRightClassName: 'muidocs-icon-custom-arrow-drop-right',
          onTouchTap: this._onParentItemTap },
        this.props.text
      ),
      React.createElement(Menu, _extends({}, other, {
        ref: 'nestedMenu',
        menuItems: this.props.menuItems,
        menuItemStyle: menuItemStyle,
        onItemTap: this._onMenuItemTap,
        hideable: true,
        visible: this.state.open,
        onRequestClose: this._closeNestedMenu,
        zDepth: this.props.zDepth + 1 }))
    );
  },

  toggleNestedMenu: function toggleNestedMenu() {
    if (!this.props.disabled) this.setState({ open: !this.state.open });
  },

  isOpen: function isOpen() {
    return this.state.open;
  },

  _positionNestedMenu: function _positionNestedMenu() {
    var el = React.findDOMNode(this);
    var nestedMenu = React.findDOMNode(this.refs.nestedMenu);
    nestedMenu.style.left = el.offsetWidth + 'px';
  },

  _openNestedMenu: function _openNestedMenu() {
    if (!this.props.disabled) this.setState({ open: true });
  },

  _closeNestedMenu: function _closeNestedMenu() {
    this.setState({ open: false });
    React.findDOMNode(this).focus();
  },

  _onParentItemTap: function _onParentItemTap() {
    this.toggleNestedMenu();
  },

  _onMenuItemTap: function _onMenuItemTap(e, index, menuItem) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
    this._closeNestedMenu();
  },
  _handleMouseOver: function _handleMouseOver(e) {
    if (!this.props.disabled && this.props.onMouseOver) this.props.onMouseOver(e, this.props.index);
  },

  _handleMouseOut: function _handleMouseOut(e) {
    if (!this.props.disabled && this.props.onMouseOut) this.props.onMouseOut(e, this.props.index);
  }

});

/****************
* Menu Component
****************/
var Menu = React.createClass({
  displayName: 'Menu',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    autoWidth: React.PropTypes.bool,
    onItemTap: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    onRequestClose: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    hideable: React.PropTypes.bool,
    visible: React.PropTypes.bool,
    zDepth: React.PropTypes.number,
    menuItemStyle: React.PropTypes.object,
    menuItemStyleSubheader: React.PropTypes.object,
    menuItemStyleLink: React.PropTypes.object,
    menuItemClassName: React.PropTypes.string,
    menuItemClassNameSubheader: React.PropTypes.string,
    menuItemClassNameLink: React.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      nestedMenuShown: false,
      activeIndex: 0
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      autoWidth: true,
      hideable: false,
      visible: true,
      zDepth: 1,
      onRequestClose: function onRequestClose() {}
    };
  },

  componentDidMount: function componentDidMount() {
    var el = React.findDOMNode(this);

    //Set the menu width
    this._setKeyWidth(el);

    //Show or Hide the menu according to visibility
    this._renderVisibility();
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) this._renderVisibility();
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.menu;
  },

  getSpacing: function getSpacing() {
    return this.context.muiTheme.spacing;
  },

  getStyles: function getStyles() {
    var styles = {
      root: {
        backgroundColor: this.getTheme().containerBackgroundColor,
        paddingTop: this.getSpacing().desktopGutterMini,
        paddingBottom: this.getSpacing().desktopGutterMini,
        transition: Transitions.easeOut(null, 'height'),
        outline: 'none !important'
      },
      subheader: {
        paddingLeft: this.context.muiTheme.component.menuSubheader.padding,
        paddingRight: this.context.muiTheme.component.menuSubheader.padding
      },
      hideable: {
        opacity: this.props.visible ? 1 : 0,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        zIndex: 1
      },
      item: {
        height: 34
      }
    };
    return styles;
  },

  render: function render() {
    var styles = this.getStyles();
    return React.createElement(
      Paper,
      {
        ref: 'paperContainer',
        tabIndex: '0',
        onKeyDown: this._onKeyDown,
        zDepth: this.props.zDepth,
        style: this.mergeAndPrefix(styles.root, this.props.hideable && styles.hideable, this.props.style) },
      this._getChildren()
    );
  },

  _getChildren: function _getChildren() {
    var menuItem = undefined,
        itemComponent = undefined,
        isSelected = undefined,
        isDisabled = undefined;

    var styles = this.getStyles();

    this._children = [];
    //This array is used to keep track of all nested menu refs
    this._nestedChildren = [];

    for (var i = 0; i < this.props.menuItems.length; i++) {
      menuItem = this.props.menuItems[i];
      isSelected = i === this.props.selectedIndex;
      isDisabled = menuItem.disabled === undefined ? false : menuItem.disabled;

      var icon = menuItem.icon;
      var data = menuItem.data;
      var attribute = menuItem.attribute;
      var number = menuItem.number;
      var toggle = menuItem.toggle;
      var onTouchTap = menuItem.onTouchTap;

      var other = _objectWithoutProperties(menuItem, ['icon', 'data', 'attribute', 'number', 'toggle', 'onTouchTap']);

      switch (menuItem.type) {

        case MenuItem.Types.LINK:
          itemComponent = React.createElement(LinkMenuItem, {
            key: i,
            index: i,
            active: this.state.activeIndex == i,
            text: menuItem.text,
            disabled: isDisabled,
            className: this.props.menuItemClassNameLink,
            style: this.props.menuItemStyleLink,
            payload: menuItem.payload,
            target: menuItem.target });
          break;

        case MenuItem.Types.SUBHEADER:
          itemComponent = React.createElement(SubheaderMenuItem, {
            key: i,
            index: i,
            className: this.props.menuItemClassNameSubheader,
            style: this.mergeAndPrefix(styles.subheader, this.props.menuItemStyleSubheader),
            firstChild: i === 0,
            text: menuItem.text });
          break;

        case MenuItem.Types.NESTED:
          var _props2 = this.props,
              ref = _props2.ref,
              key = _props2.key,
              index = _props2.index,
              zDepth = _props2.zDepth,
              other = _objectWithoutProperties(_props2, ['ref', 'key', 'index', 'zDepth']);

          itemComponent = React.createElement(NestedMenuItem, _extends({}, other, {
            ref: i,
            key: i,
            index: i,
            nested: true,
            active: this.state.activeIndex == i,
            text: menuItem.text,
            disabled: isDisabled,
            menuItems: menuItem.items,
            menuItemStyle: this.props.menuItemStyle,
            zDepth: this.props.zDepth,
            onMouseOver: this._onItemActivated,
            onMouseOut: this._onItemDeactivated,
            onItemTap: this._onNestedItemTap }));
          this._nestedChildren.push(i);
          break;

        default:
          itemComponent = React.createElement(
            MenuItem,
            _extends({}, other, {
              selected: isSelected,
              key: i,
              index: i,
              active: this.state.activeIndex == i,
              icon: menuItem.icon,
              data: menuItem.data,
              className: this.props.menuItemClassName,
              style: this.props.menuItemStyle,
              attribute: menuItem.attribute,
              number: menuItem.number,
              toggle: menuItem.toggle,
              onToggle: this.props.onToggle,
              disabled: isDisabled,
              onTouchTap: this._onItemTap,
              onMouseOver: this._onItemActivated,
              onMouseOut: this._onItemDeactivated
            }),
            menuItem.text
          );
      }
      this._children.push(itemComponent);
    }

    return this._children;
  },

  _setKeyWidth: function _setKeyWidth(el) {
    var menuWidth = this.props.autoWidth ? KeyLine.getIncrementalDim(el.offsetWidth) + 'px' : '100%';

    //Update the menu width
    Dom.withoutTransition(el, function () {
      el.style.width = menuWidth;
    });
  },

  _renderVisibility: function _renderVisibility() {
    var _this = this;

    var el = undefined;

    if (this.props.hideable) {
      (function () {
        el = React.findDOMNode(_this);
        var container = React.findDOMNode(_this.refs.paperContainer);

        if (_this.props.visible) {
          (function () {
            //Hide the element and allow the browser to automatically resize it.
            el.style.transition = '';
            el.style.visibility = 'hidden';
            el.style.height = 'auto';

            //Determine the height of the menu.
            var padding = _this.getSpacing().desktopGutterMini;
            var height = el.offsetHeight + padding * 2;

            //Unhide the menu with the height set back to zero.
            el.style.height = '0px';
            el.style.visibility = 'visible';

            //Add transition if it is not already defined.
            el.style.transition = Transitions.easeOut();

            //Open the menu
            setTimeout(function () {
              // Yeild to the DOM, then apply height and padding. This makes the transition smoother.
              el.style.paddingTop = padding + 'px';
              el.style.paddingBottom = padding + 'px';
              el.style.height = height + 'px';

              //Set the overflow to visible after the animation is done so
              //that other nested menus can be shown
              CssEvent.onTransitionEnd(el, function () {
                //Make sure the menu is open before setting the overflow.
                //This is to accout for fast clicks
                if (_this.props.visible) container.style.overflow = 'visible';
                el.focus();
              });
            }, 0);
          })();
        } else {
          //Close the menu
          el.style.height = '0px';
          el.style.paddingTop = '0px';
          el.style.paddingBottom = '0px';

          //Set the overflow to hidden so that animation works properly
          container.style.overflow = 'hidden';
        }
      })();
    }
  },

  _onNestedItemTap: function _onNestedItemTap(e, index, menuItem) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
  },

  _onItemTap: function _onItemTap(e, index) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, this.props.menuItems[index]);
  },

  _onItemToggle: function _onItemToggle(e, index, toggled) {
    if (this.props.onItemToggle) this.props.onItemToggle(e, index, this.props.menuItems[index], toggled);
  },
  _onItemActivated: function _onItemActivated(e, index) {
    this.setState({ activeIndex: index });
  },
  _onItemDeactivated: function _onItemDeactivated(e, index) {
    if (this.state.activeKey == index) this.setState({ activeIndex: 0 });
  },

  _onKeyDown: function _onKeyDown(e) {
    if (!(this.state.open || this.props.visible)) return;

    var nested = this._children[this.state.activeIndex];
    if (nested && nested.props.nested && this.refs[this.state.activeIndex].isOpen()) return;

    switch (e.which) {
      case KeyCode.UP:
        this._activatePreviousItem();
        break;
      case KeyCode.DOWN:
        this._activateNextItem();
        break;
      case KeyCode.RIGHT:
        this._tryToggleNested(this.state.activeIndex);
        break;
      case KeyCode.LEFT:
        this._close();
        break;
      case KeyCode.ESC:
        this._close();
        break;
      case KeyCode.TAB:
        this._close();
        return; // so the tab key can propagate
      case KeyCode.ENTER:
      case KeyCode.SPACE:
        e.stopPropagation(); // needs called before the close
        this._triggerSelection(e);
        break;
      default:
        return; //important
    }
    e.preventDefault();
    e.stopPropagation();
  },

  _activatePreviousItem: function _activatePreviousItem() {
    var active = this.state.activeIndex || 0;
    active = Math.max(active - 1, 0);
    this.setState({ activeIndex: active });
  },

  _activateNextItem: function _activateNextItem() {
    var active = this.state.activeIndex || 0;
    active = Math.min(active + 1, this._children.length - 1);
    this.setState({ activeIndex: active });
  },

  _triggerSelection: function _triggerSelection(e) {
    var index = this.state.activeIndex || 0;
    this._onItemTap(e, index);
  },

  _close: function _close() {
    this.props.onRequestClose();
  },

  _tryToggleNested: function _tryToggleNested(index) {
    var item = this.refs[index];
    var toggleMenu = item.toggleNestedMenu;
    if (item && item.toggleNestedMenu) item.toggleNestedMenu();
  }

});

module.exports = Menu;

//Add padding to the offset height, because it is not yet set in the style.