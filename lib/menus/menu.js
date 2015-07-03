'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var update = React.addons.update;
var Controllable = require('../mixins/controllable');
var StylePropable = require('../mixins/style-propable');
var Transitions = require('../styles/transitions');
var Children = require('../utils/children');
var Dom = require('../utils/dom');
var KeyCode = require('../utils/key-code');
var List = require('../lists/list');

var Menu = React.createClass({
  displayName: 'Menu',

  mixins: [StylePropable, Controllable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    autoWidth: React.PropTypes.bool,
    desktop: React.PropTypes.bool,
    listStyle: React.PropTypes.object,
    multiple: React.PropTypes.bool,
    onItemTouchTap: React.PropTypes.func,
    open: React.PropTypes.bool,
    openDirection: React.PropTypes.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right']),
    selectedMenuItemStyle: React.PropTypes.object,
    width: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      autoWidth: true,
      onItemTouchTap: function onItemTouchTap() {},
      open: true,
      openDirection: 'bottom-left',
      zDepth: 1
    };
  },

  getInitialState: function getInitialState() {
    return {
      keyboardFocusIndex: -1,
      keyWidth: this.props.desktop ? 64 : 56
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.autoWidth) this._setWidth();
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.props.autoWidth) this._setWidth();
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var autoWidth = _props.autoWidth;
    var children = _props.children;
    var desktop = _props.desktop;
    var listStyle = _props.listStyle;
    var multiple = _props.multiple;
    var open = _props.open;
    var openDirection = _props.openDirection;
    var selectedMenuItemStyle = _props.selectedMenuItemStyle;
    var style = _props.style;
    var value = _props.value;
    var valueLink = _props.valueLink;
    var width = _props.width;

    var other = _objectWithoutProperties(_props, ['autoWidth', 'children', 'desktop', 'listStyle', 'multiple', 'open', 'openDirection', 'selectedMenuItemStyle', 'style', 'value', 'valueLink', 'width']);

    var openDown = openDirection.split('-')[0] === 'bottom';
    var openLeft = openDirection.split('-')[1] === 'left';

    var styles = {
      root: {
        //Nested div bacause the List scales x faster than
        //it scales y
        transition: Transitions.easeOut('250ms', 'transform'),
        transitionDelay: open ? '0ms' : '250ms',
        position: 'absolute',
        zIndex: 10,
        top: openDown ? 12 : null,
        bottom: !openDown ? 12 : null,
        left: !openLeft ? 12 : null,
        right: openLeft ? 12 : null,
        transform: open ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: openLeft ? 'right' : 'left'
      },

      list: {
        display: 'table-cell',
        paddingBottom: desktop ? 16 : 8,
        paddingTop: desktop ? 16 : 8,
        userSelect: 'none',
        width: width,
        transition: Transitions.easeOut(null, ['transform', 'opacity']),
        transitionDuration: open ? '500ms' : '200ms',
        transform: open ? 'scaleY(1) translate3d(0,0,0)' : 'scaleY(0) translate3d(0,-8px,0)',
        transformOrigin: openDown ? 'top' : 'bottom',
        opacity: open ? 1 : 0
      },

      menuItem: {
        transition: Transitions.easeOut(null, 'opacity'),
        transitionDelay: open ? '400ms' : '0ms',
        opacity: open ? 1 : 0
      },

      selectedMenuItem: {
        color: this.context.muiTheme.palette.accent1Color
      }
    };

    var mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    var mergedListStyles = this.mergeStyles(styles.list, listStyle);

    //Cascade children opacity
    var childrenTransitionDelay = openDown ? 175 : 325;
    var childrenTransitionDelayIncrement = Math.ceil(150 / React.Children.count(this.props.children));

    var newChildren = React.Children.map(children, (function (child, childIndex) {

      if (openDown) {
        childrenTransitionDelay += childrenTransitionDelayIncrement;
      } else {
        childrenTransitionDelay -= childrenTransitionDelayIncrement;
      }

      var childrenContainerStyles = _this.mergeStyles(styles.menuItem, {
        transitionDelay: open ? childrenTransitionDelay + 'ms' : '0ms'
      });

      var menuValue = _this.getValueLink(_this.props).value;
      var childValue = child.props.value;
      var selectedChildrenStyles = {};

      if (multiple && menuValue.length && menuValue.indexOf(childValue) !== -1 || !multiple && menuValue && menuValue === childValue) {
        selectedChildrenStyles = _this.mergeStyles(styles.selectedMenuItem, selectedMenuItemStyle);
      }

      var mergedChildrenStyles = _this.mergeStyles(child.props.style || {}, selectedChildrenStyles);

      var clonedChild = React.cloneElement(child, {
        desktop: desktop,
        keyboardFocused: open && childIndex === _this.state.keyboardFocusIndex,
        onTouchTap: function onTouchTap(e) {
          _this._handleMenuItemTouchTap(e, child);
          if (child.props.onTouchTap) child.props.onTouchTap(e);
        },
        style: mergedChildrenStyles,
        tabIndex: open ? child.props.tabIndex : -1
      });

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
        List,
        _extends({}, other, {
          ref: 'list',
          style: mergedListStyles }),
        newChildren
      )
    );
  },

  setKeyboardFocusIndex: function setKeyboardFocusIndex(newIndex) {
    this.setState({
      keyboardFocusIndex: newIndex
    });
  },

  _decrementKeyboardFocusIndex: function _decrementKeyboardFocusIndex() {
    var index = this.state.keyboardFocusIndex;

    index--;
    if (index < 0) index = 0;

    this.setKeyboardFocusIndex(index);
  },

  _incrementKeyboardFocusIndex: function _incrementKeyboardFocusIndex() {
    var index = this.state.keyboardFocusIndex;
    var maxIndex = React.Children.count(this.props.children) - 1;

    index++;
    if (index > maxIndex) index = maxIndex;

    this.setKeyboardFocusIndex(index);
  },

  _handleKeyDown: function _handleKeyDown(e) {
    if (this.props.open) {
      switch (e.keyCode) {
        case KeyCode.UP:
          this._decrementKeyboardFocusIndex();
          break;
        case KeyCode.DOWN:
          this._incrementKeyboardFocusIndex();
          break;
        case KeyCode.TAB:
          if (e.shiftKey) {
            this._decrementKeyboardFocusIndex();
          } else {
            this._incrementKeyboardFocusIndex();
          }
          break;
      }

      e.preventDefault();
    }
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