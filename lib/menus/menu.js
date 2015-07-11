'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var update = React.addons.update;
var Controllable = require('../mixins/controllable');
var StylePropable = require('../mixins/style-propable');
var AutoPrefix = require('../styles/auto-prefix');
var Transitions = require('../styles/transitions');
var KeyCode = require('../utils/key-code');
var List = require('../lists/list');
var Paper = require('../paper');

var Menu = React.createClass({
  displayName: 'Menu',

  mixins: [StylePropable, Controllable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    autoWidth: React.PropTypes.bool,
    desktop: React.PropTypes.bool,
    initiallyKeyboardFocused: React.PropTypes.bool,
    listStyle: React.PropTypes.object,
    maxHeight: React.PropTypes.number,
    multiple: React.PropTypes.bool,
    onEscKeyDown: React.PropTypes.func,
    onItemTouchTap: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    openDirection: React.PropTypes.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right']),
    selectedMenuItemStyle: React.PropTypes.object,
    width: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    zDepth: React.PropTypes.oneOf([0, 1, 2, 3, 4, 5])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      autoWidth: true,
      maxHeight: null,
      onEscKeyDown: function onEscKeyDown() {},
      onItemTouchTap: function onItemTouchTap() {},
      onKeyDown: function onKeyDown() {},
      openDirection: 'bottom-left',
      zDepth: 1
    };
  },

  getInitialState: function getInitialState() {
    var selectedIndex = this._getSelectedIndex();

    return {
      focusIndex: selectedIndex >= 0 ? selectedIndex : 0,
      isKeyboardFocused: this.props.initiallyKeyboardFocused,
      keyWidth: this.props.desktop ? 64 : 56,
      componentEntered: false
    };
  },

  componentDidAppear: function componentDidAppear() {
    this.setState({
      componentEntered: true
    }, this._setScollPosition);
  },

  componentDidEnter: function componentDidEnter() {
    this.componentDidAppear();
  },

  componentDidMount: function componentDidMount() {
    if (this.props.autoWidth) this._setWidth();
  },

  componentWillLeave: function componentWillLeave(callback) {
    var rootStyle = React.findDOMNode(this).style;

    AutoPrefix.set(rootStyle, 'transition', Transitions.easeOut('250ms', ['opacity', 'transform']));
    AutoPrefix.set(rootStyle, 'transform', 'translate3d(0,-8px,0)');
    rootStyle.opacity = 0;

    setTimeout(callback, 250);
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var autoWidth = _props.autoWidth;
    var children = _props.children;
    var desktop = _props.desktop;
    var initiallyKeyboardFocused = _props.initiallyKeyboardFocused;
    var listStyle = _props.listStyle;
    var maxHeight = _props.maxHeight;
    var multiple = _props.multiple;
    var openDirection = _props.openDirection;
    var selectedMenuItemStyle = _props.selectedMenuItemStyle;
    var style = _props.style;
    var value = _props.value;
    var valueLink = _props.valueLink;
    var width = _props.width;
    var zDepth = _props.zDepth;

    var other = _objectWithoutProperties(_props, ['autoWidth', 'children', 'desktop', 'initiallyKeyboardFocused', 'listStyle', 'maxHeight', 'multiple', 'openDirection', 'selectedMenuItemStyle', 'style', 'value', 'valueLink', 'width', 'zDepth']);

    var componentEntered = this.state.componentEntered;
    var openDown = openDirection.split('-')[0] === 'bottom';
    var openLeft = openDirection.split('-')[1] === 'left';

    var styles = {
      root: {
        //Nested div bacause the List scales x faster than
        //it scales y
        transition: Transitions.easeOut('250ms', 'transform'),
        position: 'absolute',
        zIndex: 10,
        top: openDown ? 0 : null,
        bottom: !openDown ? 0 : null,
        left: !openLeft ? 0 : null,
        right: openLeft ? 0 : null,
        transform: componentEntered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: openLeft ? 'right' : 'left'
      },

      list: {
        display: 'table-cell',
        paddingBottom: desktop ? 16 : 8,
        paddingTop: desktop ? 16 : 8,
        userSelect: 'none',
        width: width
      },

      menuItem: {
        transition: Transitions.easeOut(null, 'opacity'),
        opacity: componentEntered ? 1 : 0
      },

      paper: {
        transition: Transitions.easeOut('500ms', ['transform', 'opacity']),
        transform: componentEntered ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: openDown ? 'top' : 'bottom',
        opacity: componentEntered ? 1 : 0,
        maxHeight: maxHeight,
        overflowY: maxHeight ? 'scroll' : null
      },

      selectedMenuItem: {
        color: this.context.muiTheme.palette.accent1Color
      }
    };

    var mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    var mergedListStyles = this.mergeStyles(styles.list, listStyle);

    //Cascade children opacity
    var cumulativeDelay = openDown ? 175 : 325;
    var cascadeChildrenCount = this._getCascadeChildrenCount();
    var cumulativeDelayIncrement = Math.ceil(150 / cascadeChildrenCount);

    var menuItemIndex = 0;
    var newChildren = React.Children.map(children, (function (child) {

      var childIsADivider = child.type.displayName === 'MenuDivider';
      var childIsDisabled = child.props.disabled;
      var focusIndex = _this.state.focusIndex;
      var transitionDelay = 0;

      //Only cascade the visible menu items
      if (componentEntered && menuItemIndex >= focusIndex - 1 && menuItemIndex <= focusIndex + cascadeChildrenCount - 1) {
        cumulativeDelay = openDown ? cumulativeDelay + cumulativeDelayIncrement : cumulativeDelay - cumulativeDelayIncrement;
        transitionDelay = cumulativeDelay;
      }

      var childrenContainerStyles = _this.mergeStyles(styles.menuItem, {
        transitionDelay: transitionDelay + 'ms'
      });

      var clonedChild = childIsADivider ? child : childIsDisabled ? React.cloneElement(child, { desktop: desktop }) : _this._cloneMenuItem(child, menuItemIndex, styles);

      if (!childIsADivider && !childIsDisabled) menuItemIndex++;

      return React.createElement(
        'div',
        { style: childrenContainerStyles },
        clonedChild
      );
    }).bind(this));

    return React.createElement(
      'div',
      {
        onKeyDown: this._handleKeyDown,
        style: mergedRootStyles },
      React.createElement(
        Paper,
        {
          ref: 'scrollContainer',
          style: styles.paper,
          zDepth: zDepth },
        React.createElement(
          List,
          _extends({}, other, {
            ref: 'list',
            style: mergedListStyles }),
          newChildren
        )
      )
    );
  },

  setKeyboardFocused: function setKeyboardFocused(keyboardFocused) {
    this.setState({
      isKeyboardFocused: keyboardFocused
    });
  },

  _cloneMenuItem: function _cloneMenuItem(child, childIndex, styles) {
    var _this2 = this;

    var _props2 = this.props;
    var desktop = _props2.desktop;
    var selectedMenuItemStyle = _props2.selectedMenuItemStyle;

    var selected = this._isChildSelected(child);
    var selectedChildrenStyles = {};

    if (selected) {
      selectedChildrenStyles = this.mergeStyles(styles.selectedMenuItem, selectedMenuItemStyle);
    }

    var mergedChildrenStyles = this.mergeStyles(child.props.style || {}, selectedChildrenStyles);

    var isFocused = childIndex === this.state.focusIndex;
    var focusState = 'none';
    if (isFocused) {
      focusState = this.state.isKeyboardFocused ? 'keyboard-focused' : 'focused';
    }

    return React.cloneElement(child, {
      desktop: desktop,
      focusState: focusState,
      onTouchTap: function onTouchTap(e) {
        _this2._handleMenuItemTouchTap(e, child);
        if (child.props.onTouchTap) child.props.onTouchTap(e);
      },
      ref: isFocused ? 'focusedMenuItem' : null,
      style: mergedChildrenStyles
    });
  },

  _decrementKeyboardFocusIndex: function _decrementKeyboardFocusIndex() {
    var index = this.state.focusIndex;

    index--;
    if (index < 0) index = 0;

    this._setFocusIndex(index, true);
  },

  _getCascadeChildrenCount: function _getCascadeChildrenCount() {
    var _props3 = this.props;
    var children = _props3.children;
    var desktop = _props3.desktop;
    var maxHeight = _props3.maxHeight;

    var count = 1;
    var currentHeight = desktop ? 16 : 8;
    var menuItemHeight = desktop ? 32 : 48;

    //MaxHeight isn't set - cascade all of the children
    if (!maxHeight) return React.Children.count(children);

    //Count all the children that will fit inside the
    //max menu height
    React.Children.forEach(children, function (child) {
      if (currentHeight < maxHeight) {
        var childIsADivider = child.type.displayName === 'MenuDivider';

        currentHeight += childIsADivider ? 16 : menuItemHeight;
        count++;
      }
    });

    return count;
  },

  _getMenuItemCount: function _getMenuItemCount() {
    var menuItemCount = 0;
    React.Children.forEach(this.props.children, function (child) {
      var childIsADivider = child.type.displayName === 'MenuDivider';
      var childIsDisabled = child.props.disabled;
      if (!childIsADivider && !childIsDisabled) menuItemCount++;
    });
    return menuItemCount;
  },

  _getSelectedIndex: function _getSelectedIndex() {
    var _this3 = this;

    var children = this.props.children;

    var selectedIndex = -1;
    var menuItemIndex = 0;

    React.Children.forEach(children, (function (child) {
      var childIsADivider = child.type.displayName === 'MenuDivider';

      if (_this3._isChildSelected(child)) selectedIndex = menuItemIndex;
      if (!childIsADivider) menuItemIndex++;
    }).bind(this));

    return selectedIndex;
  },

  _handleKeyDown: function _handleKeyDown(e) {
    switch (e.keyCode) {
      case KeyCode.DOWN:
        e.preventDefault();
        this._incrementKeyboardFocusIndex();
        break;
      case KeyCode.ESC:
        this.props.onEscKeyDown(e);
        break;
      case KeyCode.TAB:
        e.preventDefault();
        if (e.shiftKey) {
          this._decrementKeyboardFocusIndex();
        } else {
          this._incrementKeyboardFocusIndex();
        }
        break;
      case KeyCode.UP:
        e.preventDefault();
        this._decrementKeyboardFocusIndex();
        break;
    }
    this.props.onKeyDown(e);
  },

  _handleMenuItemTouchTap: function _handleMenuItemTouchTap(e, item) {
    var multiple = this.props.multiple;
    var valueLink = this.getValueLink(this.props);
    var menuValue = valueLink.value;
    var itemValue = item.props.value;

    if (multiple) {
      var index = menuValue.indexOf(itemValue);
      var newMenuValue = index === -1 ? update(menuValue, { $push: [itemValue] }) : update(menuValue, { $splice: [[index, 1]] });

      valueLink.requestChange(e, newMenuValue);
    } else if (!multiple && itemValue !== menuValue) {
      valueLink.requestChange(e, itemValue);
    }

    this.props.onItemTouchTap(e, item);
  },

  _incrementKeyboardFocusIndex: function _incrementKeyboardFocusIndex() {
    var index = this.state.focusIndex;
    var maxIndex = this._getMenuItemCount() - 1;

    index++;
    if (index > maxIndex) index = maxIndex;

    this._setFocusIndex(index, true);
  },

  _isChildSelected: function _isChildSelected(child) {
    var multiple = this.props.multiple;
    var menuValue = this.getValueLink(this.props).value;
    var childValue = child.props.value;

    return multiple && menuValue.length && menuValue.indexOf(childValue) !== -1 || !multiple && menuValue && menuValue === childValue;
  },

  _setFocusIndex: function _setFocusIndex(newIndex, isKeyboardFocused) {
    this.setState({
      focusIndex: newIndex,
      isKeyboardFocused: isKeyboardFocused
    });
  },

  _setScollPosition: function _setScollPosition() {
    var desktop = this.props.desktop;
    var focusedMenuItem = this.refs.focusedMenuItem;
    var menuItemHeight = desktop ? 32 : 48;

    if (focusedMenuItem) {
      var selectedOffSet = React.findDOMNode(focusedMenuItem).offsetTop;

      //Make the focused item be the 2nd item in the list the
      //user sees
      var scrollTop = selectedOffSet - menuItemHeight;
      if (scrollTop < menuItemHeight) scrollTop = 0;

      React.findDOMNode(this.refs.scrollContainer).scrollTop = scrollTop;
    }
  },

  _setWidth: function _setWidth() {
    var el = React.findDOMNode(this);
    var listEl = React.findDOMNode(this.refs.list);
    var elWidth = el.offsetWidth;
    var keyWidth = this.state.keyWidth;
    var minWidth = keyWidth * 1.5;
    var keyIncrements = elWidth / keyWidth;
    var newWidth = undefined;

    keyIncrements = keyIncrements <= 1.5 ? 1.5 : Math.ceil(keyIncrements);
    newWidth = keyIncrements * keyWidth;

    if (newWidth < minWidth) newWidth = minWidth;

    el.style.width = newWidth + 'px';
    listEl.style.width = newWidth + 'px';
  }

});

module.exports = Menu;