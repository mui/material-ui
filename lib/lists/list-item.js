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
var IconButton = require('../icon-button');
var OpenIcon = require('../svg-icons/navigation/arrow-drop-up');
var CloseIcon = require('../svg-icons/navigation/arrow-drop-down');
var ListNested = require('./list-nested');

var ListItem = React.createClass({
  displayName: 'ListItem',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    autoGenerateNestedIndicator: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    disableKeyboardFocus: React.PropTypes.bool,
    innerDivStyle: React.PropTypes.object,
    insetChildren: React.PropTypes.bool,
    innerStyle: React.PropTypes.object,
    leftAvatar: React.PropTypes.element,
    leftCheckbox: React.PropTypes.element,
    leftIcon: React.PropTypes.element,
    nestedLevel: React.PropTypes.number,
    onKeyboardFocus: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onNestedListToggle: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    open: React.PropTypes.bool,
    rightAvatar: React.PropTypes.element,
    rightIcon: React.PropTypes.element,
    rightIconButton: React.PropTypes.element,
    rightToggle: React.PropTypes.element,
    primaryText: React.PropTypes.node,
    secondaryText: React.PropTypes.node,
    secondaryTextLines: React.PropTypes.oneOf([1, 2])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      autoGenerateNestedIndicator: true,
      nestedLevel: 0,
      open: false,
      secondaryTextLines: 1
    };
  },

  getInitialState: function getInitialState() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      open: this.props.open,
      rightIconButtonHovered: false,
      rightIconButtonKeyboardFocused: false,
      touch: false
    };
  },

  render: function render() {
    var _props = this.props;
    var autoGenerateNestedIndicator = _props.autoGenerateNestedIndicator;
    var disabled = _props.disabled;
    var disableKeyboardFocus = _props.disableKeyboardFocus;
    var innerDivStyle = _props.innerDivStyle;
    var insetChildren = _props.insetChildren;
    var leftAvatar = _props.leftAvatar;
    var leftCheckbox = _props.leftCheckbox;
    var leftIcon = _props.leftIcon;
    var nestedLevel = _props.nestedLevel;
    var onKeyboardFocus = _props.onKeyboardFocus;
    var onMouseLeave = _props.onMouseLeave;
    var onMouseEnter = _props.onMouseEnter;
    var onTouchStart = _props.onTouchStart;
    var rightAvatar = _props.rightAvatar;
    var rightIcon = _props.rightIcon;
    var rightIconButton = _props.rightIconButton;
    var rightToggle = _props.rightToggle;
    var primaryText = _props.primaryText;
    var secondaryText = _props.secondaryText;
    var secondaryTextLines = _props.secondaryTextLines;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['autoGenerateNestedIndicator', 'disabled', 'disableKeyboardFocus', 'innerDivStyle', 'insetChildren', 'leftAvatar', 'leftCheckbox', 'leftIcon', 'nestedLevel', 'onKeyboardFocus', 'onMouseLeave', 'onMouseEnter', 'onTouchStart', 'rightAvatar', 'rightIcon', 'rightIconButton', 'rightToggle', 'primaryText', 'secondaryText', 'secondaryTextLines', 'style']);

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

      //This inner div is needed so that ripples will span the entire container
      innerDiv: {
        marginLeft: nestedLevel * this.context.muiTheme.component.listItem.nestedLevelDepth,
        paddingLeft: leftIcon || leftAvatar || leftCheckbox || insetChildren ? 72 : 16,
        paddingRight: rightIcon || rightAvatar || rightIconButton ? 56 : rightToggle ? 72 : 16,
        paddingBottom: singleAvatar ? 20 : 16,
        paddingTop: singleNoAvatar || threeLine ? 16 : 20,
        position: 'relative'
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

      primaryText: {
        margin: 0
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

    var primaryTextIsAnElement = React.isValidElement(primaryText);
    var secondaryTextIsAnElement = React.isValidElement(secondaryText);

    var mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    var mergedInnerDivStyles = this.mergeAndPrefix(styles.innerDiv, innerDivStyle);
    var mergedDivStyles = this.mergeAndPrefix(styles.root, mergedInnerDivStyles, style);
    var mergedLabelStyles = this.mergeAndPrefix(styles.root, mergedInnerDivStyles, styles.label, style);
    var mergedPrimaryTextStyles = primaryTextIsAnElement ? this.mergeStyles(styles.primaryText, primaryText.props.style) : null;
    var mergedSecondaryTextStyles = secondaryTextIsAnElement ? this.mergeStyles(styles.secondaryText, secondaryText.props.style) : null;

    var contentChildren = [];
    var nestedListItems = [];
    var nestedList = undefined;

    React.Children.forEach(this.props.children, function (child) {
      if (child === null) return;

      if (React.isValidElement(child) && child.type.displayName === 'ListItem') {
        nestedListItems.push(child);
      } else {
        contentChildren.push(child);
      }
    });

    var rightIconButtonHandlers = {
      onKeyboardFocus: this._handleRightIconButtonKeyboardFocus,
      onMouseEnter: this._handleRightIconButtonMouseEnter,
      onMouseLeave: this._handleRightIconButtonMouseLeave,
      onTouchTap: this._handleRightIconButtonTouchTap,
      onMouseDown: this._handleRightIconButtonMouseUp,
      onMouseUp: this._handleRightIconButtonMouseUp
    };

    // Create a nested list indicator icon if we don't have an icon on the right
    if (nestedListItems.length > 0 && autoGenerateNestedIndicator && rightIcon === undefined && rightAvatar === undefined && rightIconButton === undefined) {
      if (this.state.open) {
        rightIconButton = React.createElement(
          IconButton,
          null,
          React.createElement(OpenIcon, null)
        );
      } else {
        rightIconButton = React.createElement(
          IconButton,
          null,
          React.createElement(CloseIcon, null)
        );
      }

      rightIconButtonHandlers.onTouchTap = this._handleNestedListToggle;
    }

    this._pushElement(contentChildren, leftIcon, this.mergeStyles(styles.icons, styles.leftIcon));
    this._pushElement(contentChildren, rightIcon, this.mergeStyles(styles.icons, styles.rightIcon));
    this._pushElement(contentChildren, leftAvatar, this.mergeStyles(styles.avatars, styles.leftAvatar));
    this._pushElement(contentChildren, rightAvatar, this.mergeStyles(styles.avatars, styles.rightAvatar));
    this._pushElement(contentChildren, leftCheckbox, this.mergeStyles(styles.leftCheckbox));
    this._pushElement(contentChildren, rightIconButton, this.mergeStyles(styles.rightIconButton), rightIconButtonHandlers);
    this._pushElement(contentChildren, rightToggle, this.mergeStyles(styles.rightToggle));

    if (nestedListItems.length) {
      nestedList = React.createElement(
        ListNested,
        { nestedLevel: nestedLevel + 1, open: this.state.open },
        nestedListItems
      );
    }

    if (primaryText) {
      contentChildren.push(React.isValidElement(primaryText) ? React.cloneElement(primaryText, { key: 'primaryText', style: mergedPrimaryTextStyles }) : React.createElement(
        'div',
        { key: 'primaryText', style: styles.primaryText },
        primaryText
      ));
    }

    if (secondaryText) {
      contentChildren.push(React.isValidElement(secondaryText) ? React.cloneElement(secondaryText, { key: 'secondaryText', style: mergedSecondaryTextStyles }) : React.createElement(
        'div',
        { key: 'secondaryText', style: styles.secondaryText },
        secondaryText
      ));
    }

    return hasCheckbox || disabled ? React.createElement(hasCheckbox ? 'label' : 'div', { style: hasCheckbox ? mergedLabelStyles : mergedDivStyles }, contentChildren) : React.createElement(
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
          ref: 'enhancedButton',
          style: mergedRootStyles }),
        React.createElement(
          'div',
          { style: mergedInnerDivStyles },
          contentChildren
        )
      ),
      nestedList
    );
  },

  applyFocusState: function applyFocusState(focusState) {
    var button = this.refs.enhancedButton;
    var buttonEl = React.findDOMNode(button);

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

  _handleMouseEnter: function _handleMouseEnter(e) {
    if (!this.state.touch) this.setState({ hovered: true });
    if (this.props.onMouseEnter) this.props.onMouseEnter(e);
  },

  _handleMouseLeave: function _handleMouseLeave(e) {
    this.setState({ hovered: false });
    if (this.props.onMouseLeave) this.props.onMouseLeave(e);
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
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  _handleNestedListToggle: function _handleNestedListToggle(e) {
    e.stopPropagation();
    this.setState({ open: !this.state.open });

    if (this.props.onNestedListToggle) this.props.onNestedListToggle(this);
  }

});

module.exports = ListItem;