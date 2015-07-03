'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var ColorManipulator = require('../utils/color-manipulator');
var StylePropable = require('../mixins/style-propable');
var Colors = require('../styles/colors');
var Transitions = require('../styles/transitions');
var Typography = require('../styles/typography');
var EnhancedButton = require('../enhanced-button');

var ListItem = React.createClass({
  displayName: 'ListItem',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    disabled: React.PropTypes.bool,
    disableKeyboardFocus: React.PropTypes.bool,
    innerDivStyle: React.PropTypes.object,
    insetChildren: React.PropTypes.bool,
    leftAvatar: React.PropTypes.element,
    leftCheckbox: React.PropTypes.element,
    leftIcon: React.PropTypes.element,
    onKeyboardFocus: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    rightAvatar: React.PropTypes.element,
    rightIcon: React.PropTypes.element,
    rightIconButton: React.PropTypes.element,
    rightToggle: React.PropTypes.element,
    secondaryText: React.PropTypes.node,
    secondaryTextLines: React.PropTypes.oneOf([1, 2])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      secondaryTextLines: 1
    };
  },

  getInitialState: function getInitialState() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      rightIconButtonHovered: false,
      rightIconButtonKeyboardFocused: false,
      touch: false
    };
  },

  render: function render() {
    var _props = this.props;
    var disabled = _props.disabled;
    var disableKeyboardFocus = _props.disableKeyboardFocus;
    var innerDivStyle = _props.innerDivStyle;
    var insetChildren = _props.insetChildren;
    var leftAvatar = _props.leftAvatar;
    var leftCheckbox = _props.leftCheckbox;
    var leftIcon = _props.leftIcon;
    var onKeyboardFocus = _props.onKeyboardFocus;
    var onMouseOut = _props.onMouseOut;
    var onMouseOver = _props.onMouseOver;
    var onTouchStart = _props.onTouchStart;
    var rightAvatar = _props.rightAvatar;
    var rightIcon = _props.rightIcon;
    var rightIconButton = _props.rightIconButton;
    var rightToggle = _props.rightToggle;
    var secondaryText = _props.secondaryText;
    var secondaryTextLines = _props.secondaryTextLines;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['disabled', 'disableKeyboardFocus', 'innerDivStyle', 'insetChildren', 'leftAvatar', 'leftCheckbox', 'leftIcon', 'onKeyboardFocus', 'onMouseOut', 'onMouseOver', 'onTouchStart', 'rightAvatar', 'rightIcon', 'rightIconButton', 'rightToggle', 'secondaryText', 'secondaryTextLines', 'style']);

    var textColor = this.context.muiTheme.palette.textColor;
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

      //This inner div is need so that ripples will span the entire container
      innerDiv: {
        paddingLeft: leftIcon || leftAvatar || leftCheckbox || insetChildren ? 72 : 16,
        paddingRight: rightIcon || rightAvatar || rightIconButton ? 56 : rightToggle ? 72 : 16,
        paddingBottom: singleAvatar ? 20 : 16,
        paddingTop: singleNoAvatar || threeLine ? 16 : 20
      },

      label: {
        cursor: 'pointer'
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

    var secondaryTextIsAnElement = React.isValidElement(secondaryText);

    var mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    var mergedInnerDivStyles = this.mergeAndPrefix(styles.innerDiv, innerDivStyle);
    var mergedDivStyles = this.mergeAndPrefix(styles.root, mergedInnerDivStyles, style);
    var mergedLabelStyles = this.mergeAndPrefix(styles.root, mergedInnerDivStyles, styles.label, style);
    var mergedSecondaryTextStyles = secondaryTextIsAnElement ? this.mergeStyles(styles.secondaryText, secondaryText.props.style) : null;

    var contentChildren = [];

    this._pushElement(contentChildren, leftIcon, this.mergeStyles(styles.icons, styles.leftIcon));
    this._pushElement(contentChildren, rightIcon, this.mergeStyles(styles.icons, styles.rightIcon));
    this._pushElement(contentChildren, leftAvatar, this.mergeStyles(styles.avatars, styles.leftAvatar));
    this._pushElement(contentChildren, rightAvatar, this.mergeStyles(styles.avatars, styles.rightAvatar));
    this._pushElement(contentChildren, leftCheckbox, this.mergeStyles(styles.leftCheckbox));
    this._pushElement(contentChildren, rightIconButton, this.mergeStyles(styles.rightIconButton), {
      onKeyboardFocus: this._handleRightIconButtonKeyboardFocus,
      onMouseOver: this._handleRightIconButtonMouseOver,
      onMouseOut: this._handleRightIconButtonMouseOut,
      onTouchTap: this._handleRightIconButtonTouchTap,
      onMouseDown: this._handleRightIconButtonMouseUp,
      onMouseUp: this._handleRightIconButtonMouseUp
    });
    this._pushElement(contentChildren, rightToggle, this.mergeStyles(styles.rightToggle));

    if (this.props.children) contentChildren.push(this.props.children);
    if (secondaryText) contentChildren.push(React.isValidElement(secondaryText) ? React.cloneElement(secondaryText, { key: 'secondaryText', style: mergedSecondaryTextStyles }) : React.createElement(
      'div',
      { key: 'secondaryText', style: styles.secondaryText },
      secondaryText
    ));

    return hasCheckbox || disabled ? React.createElement(hasCheckbox ? 'label' : 'div', { style: hasCheckbox ? mergedLabelStyles : mergedDivStyles }, contentChildren) : React.createElement(
      EnhancedButton,
      _extends({}, other, {
        disabled: disabled,
        disableKeyboardFocus: disableKeyboardFocus || this.state.rightIconButtonKeyboardFocused,
        linkButton: true,
        onKeyboardFocus: this._handleKeyboardFocus,
        onMouseOut: this._handleMouseOut,
        onMouseOver: this._handleMouseOver,
        onTouchStart: this._handleTouchStart,
        ref: 'enhancedButton',
        style: mergedRootStyles }),
      React.createElement(
        'div',
        { style: mergedInnerDivStyles },
        contentChildren
      )
    );
  },

  setKeyboardFocus: function setKeyboardFocus() {
    var button = this.refs.enhancedButton;
    if (button) {
      button.setKeyboardFocus();
      React.findDOMNode(button).focus();
    }
  },

  _pushElement: function _pushElement(children, element, baseStyles, additionalProps) {
    if (element) {
      var styles = this.mergeStyles(baseStyles, element.props.style);
      children.push(React.cloneElement(element, _extends({
        key: children.length,
        style: styles
      }, additionalProps)));
    }
  },

  _handleKeyboardFocus: function _handleKeyboardFocus(e, isKeyboardFocused) {
    this.setState({ isKeyboardFocused: isKeyboardFocused });
    if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleMouseOver: function _handleMouseOver(e) {
    if (!this.state.touch) this.setState({ hovered: true });
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleMouseOut: function _handleMouseOut(e) {
    this.setState({ hovered: false });
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleRightIconButtonKeyboardFocus: function _handleRightIconButtonKeyboardFocus(e, isKeyboardFocused) {
    var iconButton = this.props.rightIconButton;
    var newState = {};

    newState.rightIconButtonKeyboardFocused = isKeyboardFocused;
    if (isKeyboardFocused) newState.isKeyboardFocused = false;
    this.setState(newState);

    if (iconButton.onKeyboardFocus) iconButton.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleRightIconButtonMouseDown: function _handleRightIconButtonMouseDown(e) {
    var iconButton = this.props.rightIconButton;
    e.stopPropagation();
    if (iconButton.onMouseDown) iconButton.onDown(e);
  },

  _handleRightIconButtonMouseOut: function _handleRightIconButtonMouseOut(e) {
    var iconButton = this.props.rightIconButton;
    this.setState({ rightIconButtonHovered: false });
    if (iconButton.onMouseOut) iconButton.onMouseOut(e);
  },

  _handleRightIconButtonMouseOver: function _handleRightIconButtonMouseOver(e) {
    var iconButton = this.props.rightIconButton;
    this.setState({ rightIconButtonHovered: true });
    if (iconButton.onMouseOver) iconButton.onMouseOver(e);
  },

  _handleRightIconButtonMouseUp: function _handleRightIconButtonMouseUp(e) {
    var iconButton = this.props.rightIconButton;
    e.stopPropagation();
    if (iconButton.onMouseUp) iconButton.onUp(e);
  },

  _handleRightIconButtonTouchTap: function _handleRightIconButtonTouchTap(e) {
    var iconButton = this.props.rightIconButton;

    //Stop the event from bubbling up to the list-item
    e.stopPropagation();
    if (iconButton.onTouchTap) iconButton.onTouchTap(e);
  },

  _handleTouchStart: function _handleTouchStart(e) {
    this.setState({ touch: true });
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  }

});

module.exports = ListItem;