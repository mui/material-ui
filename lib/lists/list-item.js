'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var ColorManipulator = require('../utils/color-manipulator');
var StylePropable = require('../mixins/style-propable');
var Colors = require('../styles/colors');
var Transitions = require('../styles/transitions');
var Typography = require('../styles/typography');
var EnhancedButton = require('../enhanced-button');
var IconButton = require('../icon-button');
var OpenIcon = require('../svg-icons/navigation/arrow-drop-up');
var CloseIcon = require('../svg-icons/navigation/arrow-drop-down');
var NestedList = require('./nested-list');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var ListItem = React.createClass({
  displayName: 'ListItem',

  mixins: [PureRenderMixin, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    autoGenerateNestedIndicator: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    disableKeyboardFocus: React.PropTypes.bool,
    initiallyOpen: React.PropTypes.bool,
    innerDivStyle: React.PropTypes.object,
    insetChildren: React.PropTypes.bool,
    innerStyle: React.PropTypes.object,
    leftAvatar: React.PropTypes.element,
    leftCheckbox: React.PropTypes.element,
    leftIcon: React.PropTypes.element,
    nestedLevel: React.PropTypes.number,
    nestedItems: React.PropTypes.arrayOf(React.PropTypes.element),
    onKeyboardFocus: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onNestedListToggle: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    rightAvatar: React.PropTypes.element,
    rightIcon: React.PropTypes.element,
    rightIconButton: React.PropTypes.element,
    rightToggle: React.PropTypes.element,
    primaryText: React.PropTypes.node,
    style: React.PropTypes.object,
    secondaryText: React.PropTypes.node,
    secondaryTextLines: React.PropTypes.oneOf([1, 2])
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      autoGenerateNestedIndicator: true,
      initiallyOpen: false,
      nestedItems: [],
      nestedLevel: 0,
      onKeyboardFocus: function onKeyboardFocus() {},
      onMouseEnter: function onMouseEnter() {},
      onMouseLeave: function onMouseLeave() {},
      onNestedListToggle: function onNestedListToggle() {},
      onTouchStart: function onTouchStart() {},
      secondaryTextLines: 1
    };
  },

  getInitialState: function getInitialState() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      open: this.props.initiallyOpen,
      rightIconButtonHovered: false,
      rightIconButtonKeyboardFocused: false,
      touch: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  render: function render() {
    var _props = this.props;
    var autoGenerateNestedIndicator = _props.autoGenerateNestedIndicator;
    var children = _props.children;
    var disabled = _props.disabled;
    var disableKeyboardFocus = _props.disableKeyboardFocus;
    var innerDivStyle = _props.innerDivStyle;
    var insetChildren = _props.insetChildren;
    var leftAvatar = _props.leftAvatar;
    var leftCheckbox = _props.leftCheckbox;
    var leftIcon = _props.leftIcon;
    var nestedItems = _props.nestedItems;
    var nestedLevel = _props.nestedLevel;
    var onKeyboardFocus = _props.onKeyboardFocus;
    var onMouseLeave = _props.onMouseLeave;
    var onMouseEnter = _props.onMouseEnter;
    var onTouchStart = _props.onTouchStart;
    var onTouchTap = _props.onTouchTap;
    var rightAvatar = _props.rightAvatar;
    var rightIcon = _props.rightIcon;
    var rightIconButton = _props.rightIconButton;
    var rightToggle = _props.rightToggle;
    var primaryText = _props.primaryText;
    var secondaryText = _props.secondaryText;
    var secondaryTextLines = _props.secondaryTextLines;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['autoGenerateNestedIndicator', 'children', 'disabled', 'disableKeyboardFocus', 'innerDivStyle', 'insetChildren', 'leftAvatar', 'leftCheckbox', 'leftIcon', 'nestedItems', 'nestedLevel', 'onKeyboardFocus', 'onMouseLeave', 'onMouseEnter', 'onTouchStart', 'onTouchTap', 'rightAvatar', 'rightIcon', 'rightIconButton', 'rightToggle', 'primaryText', 'secondaryText', 'secondaryTextLines', 'style']);

    var textColor = this.state.muiTheme.rawTheme.palette.textColor;
    var hoverColor = ColorManipulator.fade(textColor, 0.1);
    var singleAvatar = !secondaryText && (leftAvatar || rightAvatar);
    var singleNoAvatar = !secondaryText && !(leftAvatar || rightAvatar);
    var twoLine = secondaryText && secondaryTextLines === 1;
    var threeLine = secondaryText && secondaryTextLines > 1;
    var hasCheckbox = leftCheckbox || rightToggle;

    var styles = {
      root: {
        backgroundColor: (this.state.isKeyboardFocused || this.state.hovered) && !this.state.rightIconButtonHovered && !this.state.rightIconButtonKeyboardFocused ? hoverColor : null,
        color: textColor,
        display: 'block',
        fontSize: 16,
        lineHeight: '16px',
        position: 'relative',
        transition: Transitions.easeOut()
      },

      //This inner div is needed so that ripples will span the entire container
      innerDiv: {
        marginLeft: nestedLevel * this.state.muiTheme.listItem.nestedLevelDepth,
        paddingLeft: leftIcon || leftAvatar || leftCheckbox || insetChildren ? 72 : 16,
        paddingRight: rightIcon || rightAvatar || rightIconButton ? 56 : rightToggle ? 72 : 16,
        paddingBottom: singleAvatar ? 20 : 16,
        paddingTop: singleNoAvatar || threeLine ? 16 : 20,
        position: 'relative'
      },

      icons: {
        height: 24,
        width: 24,
        display: 'block',
        position: 'absolute',
        top: twoLine ? 12 : singleAvatar ? 4 : 0,
        padding: 12
      },

      leftIcon: {
        color: Colors.grey600,
        fill: Colors.grey600,
        left: 4
      },

      rightIcon: {
        color: Colors.grey400,
        fill: Colors.grey400,
        right: 4
      },

      avatars: {
        position: 'absolute',
        top: singleAvatar ? 8 : 16
      },

      label: {
        cursor: 'pointer'
      },

      leftAvatar: {
        left: 16
      },

      rightAvatar: {
        right: 16
      },

      leftCheckbox: {
        position: 'absolute',
        display: 'block',
        width: 24,
        top: twoLine ? 24 : singleAvatar ? 16 : 12,
        left: 16
      },

      primaryText: {},

      rightIconButton: {
        position: 'absolute',
        display: 'block',
        top: twoLine ? 12 : singleAvatar ? 4 : 0,
        right: 4
      },

      rightToggle: {
        position: 'absolute',
        display: 'block',
        width: 54,
        top: twoLine ? 25 : singleAvatar ? 17 : 13,
        right: 8
      },

      secondaryText: {
        fontSize: 14,
        lineHeight: threeLine ? '18px' : '16px',
        height: threeLine ? 36 : 16,
        margin: 0,
        marginTop: 4,
        color: Typography.textLightBlack,

        //needed for 2 and 3 line ellipsis
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: threeLine ? null : 'nowrap',
        display: threeLine ? '-webkit-box' : null,
        WebkitLineClamp: threeLine ? 2 : null,
        WebkitBoxOrient: threeLine ? 'vertical' : null
      }
    };

    var contentChildren = [children];

    if (leftIcon) {
      this._pushElement(contentChildren, leftIcon, this.mergeStyles(styles.icons, styles.leftIcon));
    }

    if (rightIcon) {
      this._pushElement(contentChildren, rightIcon, this.mergeStyles(styles.icons, styles.rightIcon));
    }

    if (leftAvatar) {
      this._pushElement(contentChildren, leftAvatar, this.mergeStyles(styles.avatars, styles.leftAvatar));
    }

    if (rightAvatar) {
      this._pushElement(contentChildren, rightAvatar, this.mergeStyles(styles.avatars, styles.rightAvatar));
    }

    if (leftCheckbox) {
      this._pushElement(contentChildren, leftCheckbox, this.mergeStyles(styles.leftCheckbox));
    }

    //RightIconButtonElement
    var hasNestListItems = nestedItems.length;
    var hasRightElement = rightAvatar || rightIcon || rightIconButton || rightToggle;
    var needsNestedIndicator = hasNestListItems && autoGenerateNestedIndicator && !hasRightElement;

    if (rightIconButton || needsNestedIndicator) {
      var rightIconButtonElement = rightIconButton;
      var rightIconButtonHandlers = {
        onKeyboardFocus: this._handleRightIconButtonKeyboardFocus,
        onMouseEnter: this._handleRightIconButtonMouseEnter,
        onMouseLeave: this._handleRightIconButtonMouseLeave,
        onTouchTap: this._handleRightIconButtonTouchTap,
        onMouseDown: this._handleRightIconButtonMouseUp,
        onMouseUp: this._handleRightIconButtonMouseUp
      };

      // Create a nested list indicator icon if we don't have an icon on the right
      if (needsNestedIndicator) {
        rightIconButtonElement = this.state.open ? React.createElement(
          IconButton,
          null,
          React.createElement(OpenIcon, null)
        ) : React.createElement(
          IconButton,
          null,
          React.createElement(CloseIcon, null)
        );
        rightIconButtonHandlers.onTouchTap = this._handleNestedListToggle;
      }

      this._pushElement(contentChildren, rightIconButtonElement, this.mergeStyles(styles.rightIconButton), rightIconButtonHandlers);
    }

    if (rightToggle) {
      this._pushElement(contentChildren, rightToggle, this.mergeStyles(styles.rightToggle));
    }

    if (primaryText) {
      var secondaryTextElement = this._createTextElement(styles.primaryText, primaryText, 'primaryText');
      contentChildren.push(secondaryTextElement);
    }

    if (secondaryText) {
      var secondaryTextElement = this._createTextElement(styles.secondaryText, secondaryText, 'secondaryText');
      contentChildren.push(secondaryTextElement);
    }

    var nestedList = nestedItems.length ? React.createElement(
      NestedList,
      { nestedLevel: nestedLevel + 1, open: this.state.open },
      nestedItems
    ) : undefined;

    return hasCheckbox ? this._createLabelElement(styles, contentChildren) : disabled ? this._createDisabledElement(styles, contentChildren) : React.createElement(
      'div',
      null,
      React.createElement(
        EnhancedButton,
        _extends({}, other, {
          disabled: disabled,
          disableKeyboardFocus: disableKeyboardFocus || this.state.rightIconButtonKeyboardFocused,
          linkButton: true,
          onKeyboardFocus: this._handleKeyboardFocus,
          onMouseLeave: this._handleMouseLeave,
          onMouseEnter: this._handleMouseEnter,
          onTouchStart: this._handleTouchStart,
          onTouchTap: onTouchTap,
          ref: 'enhancedButton',
          style: this.mergeStyles(styles.root, style) }),
        React.createElement(
          'div',
          { style: this.prepareStyles(styles.innerDiv, innerDivStyle) },
          contentChildren
        )
      ),
      nestedList
    );
  },

  applyFocusState: function applyFocusState(focusState) {
    var button = this.refs.enhancedButton;
    var buttonEl = ReactDOM.findDOMNode(button);

    if (button) {
      switch (focusState) {
        case 'none':
          buttonEl.blur();
          break;
        case 'focused':
          buttonEl.focus();
          break;
        case 'keyboard-focused':
          button.setKeyboardFocus();
          buttonEl.focus();
          break;
      }
    }
  },

  _createDisabledElement: function _createDisabledElement(styles, contentChildren) {
    var _props2 = this.props;
    var innerDivStyle = _props2.innerDivStyle;
    var style = _props2.style;

    var mergedDivStyles = this.prepareStyles(styles.root, styles.innerDiv, innerDivStyle, style);

    return React.createElement('div', { style: mergedDivStyles }, contentChildren);
  },

  _createLabelElement: function _createLabelElement(styles, contentChildren) {
    var _props3 = this.props;
    var innerDivStyle = _props3.innerDivStyle;
    var style = _props3.style;

    var mergedLabelStyles = this.prepareStyles(styles.root, styles.innerDiv, innerDivStyle, styles.label, style);

    return React.createElement('label', { style: mergedLabelStyles }, contentChildren);
  },

  _createTextElement: function _createTextElement(styles, data, key) {
    var isAnElement = React.isValidElement(data);
    var mergedStyles = isAnElement ? this.prepareStyles(styles, data.props.style) : null;

    return isAnElement ? React.cloneElement(data, {
      key: key,
      style: mergedStyles
    }) : React.createElement(
      'div',
      { key: key, style: this.prepareStyles(styles) },
      data
    );
  },

  _handleKeyboardFocus: function _handleKeyboardFocus(e, isKeyboardFocused) {
    this.setState({ isKeyboardFocused: isKeyboardFocused });
    this.props.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleMouseEnter: function _handleMouseEnter(e) {
    if (!this.state.touch) this.setState({ hovered: true });
    this.props.onMouseEnter(e);
  },

  _handleMouseLeave: function _handleMouseLeave(e) {
    this.setState({ hovered: false });
    this.props.onMouseLeave(e);
  },

  _handleNestedListToggle: function _handleNestedListToggle(e) {
    e.stopPropagation();
    this.setState({ open: !this.state.open });
    this.props.onNestedListToggle(this);
  },

  _handleRightIconButtonKeyboardFocus: function _handleRightIconButtonKeyboardFocus(e, isKeyboardFocused) {
    var iconButton = this.props.rightIconButton;
    var newState = {};

    newState.rightIconButtonKeyboardFocused = isKeyboardFocused;
    if (isKeyboardFocused) newState.isKeyboardFocused = false;
    this.setState(newState);

    if (iconButton && iconButton.props.onKeyboardFocus) iconButton.props.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleRightIconButtonMouseDown: function _handleRightIconButtonMouseDown(e) {
    var iconButton = this.props.rightIconButton;
    e.stopPropagation();
    if (iconButton && iconButton.props.onMouseDown) iconButton.props.onMouseDown(e);
  },

  _handleRightIconButtonMouseLeave: function _handleRightIconButtonMouseLeave(e) {
    var iconButton = this.props.rightIconButton;
    this.setState({ rightIconButtonHovered: false });
    if (iconButton && iconButton.props.onMouseLeave) iconButton.props.onMouseLeave(e);
  },

  _handleRightIconButtonMouseEnter: function _handleRightIconButtonMouseEnter(e) {
    var iconButton = this.props.rightIconButton;
    this.setState({ rightIconButtonHovered: true });
    if (iconButton && iconButton.props.onMouseEnter) iconButton.props.onMouseEnter(e);
  },

  _handleRightIconButtonMouseUp: function _handleRightIconButtonMouseUp(e) {
    var iconButton = this.props.rightIconButton;
    e.stopPropagation();
    if (iconButton && iconButton.props.onMouseUp) iconButton.props.onMouseUp(e);
  },

  _handleRightIconButtonTouchTap: function _handleRightIconButtonTouchTap(e) {
    var iconButton = this.props.rightIconButton;

    //Stop the event from bubbling up to the list-item
    e.stopPropagation();
    if (iconButton && iconButton.props.onTouchTap) iconButton.props.onTouchTap(e);
  },

  _handleTouchStart: function _handleTouchStart(e) {
    this.setState({ touch: true });
    this.props.onTouchStart(e);
  },

  _pushElement: function _pushElement(children, element, baseStyles, additionalProps) {
    if (element) {
      var styles = this.mergeStyles(baseStyles, element.props.style);
      children.push(React.cloneElement(element, _extends({
        key: children.length,
        style: styles
      }, additionalProps)));
    }
  }

});

module.exports = ListItem;