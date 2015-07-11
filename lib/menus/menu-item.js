'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var StylePropable = require('../mixins/style-propable');
var Colors = require('../styles/colors');
var CheckIcon = require('../svg-icons/navigation/check');
var ListItem = require('../lists/list-item');

var MenuItem = React.createClass({
  displayName: 'MenuItem',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    checked: React.PropTypes.bool,
    desktop: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    innerDivStyle: React.PropTypes.object,
    insetChildren: React.PropTypes.bool,
    focusState: React.PropTypes.oneOf(['none', 'focused', 'keyboard-focused']),
    leftIcon: React.PropTypes.element,
    rightIcon: React.PropTypes.element,
    secondaryText: React.PropTypes.node,
    value: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      focusState: 'none'
    };
  },

  componentDidMount: function componentDidMount() {
    this._applyFocusState();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._applyFocusState();
  },

  render: function render() {
    var _props = this.props;
    var checked = _props.checked;
    var desktop = _props.desktop;
    var disabled = _props.disabled;
    var focusState = _props.focusState;
    var innerDivStyle = _props.innerDivStyle;
    var insetChildren = _props.insetChildren;
    var leftIcon = _props.leftIcon;
    var rightIcon = _props.rightIcon;
    var secondaryText = _props.secondaryText;
    var style = _props.style;
    var value = _props.value;

    var other = _objectWithoutProperties(_props, ['checked', 'desktop', 'disabled', 'focusState', 'innerDivStyle', 'insetChildren', 'leftIcon', 'rightIcon', 'secondaryText', 'style', 'value']);

    var disabledColor = this.context.muiTheme.palette.disabledColor;
    var textColor = this.context.muiTheme.palette.textColor;
    var leftIndent = desktop ? 64 : 72;
    var sidePadding = desktop ? 24 : 16;

    var styles = {
      root: {
        color: disabled ? disabledColor : textColor,
        lineHeight: desktop ? '32px' : '48px',
        fontSize: desktop ? 15 : 16,
        whiteSpace: 'nowrap'
      },

      innerDivStyle: {
        paddingLeft: leftIcon || insetChildren || checked ? leftIndent : sidePadding,
        paddingRight: sidePadding,
        paddingBottom: 0,
        paddingTop: 0
      },

      secondaryText: {
        float: 'right'
      },

      leftIconDesktop: {
        padding: 0,
        left: 24,
        top: 4
      },

      rightIconDesktop: {
        padding: 0,
        right: 24,
        top: 4,
        fill: Colors.grey600
      }
    };

    var secondaryTextIsAnElement = React.isValidElement(secondaryText);
    var leftIconElement = leftIcon ? leftIcon : checked ? React.createElement(CheckIcon, null) : null;

    var mergedRootStyles = this.mergeStyles(styles.root, style);
    var mergedInnerDivStyles = this.mergeStyles(styles.innerDivStyle, innerDivStyle);
    var mergedSecondaryTextStyles = secondaryTextIsAnElement ? this.mergeStyles(styles.secondaryText, secondaryText.props.style) : null;
    var mergedLeftIconStyles = leftIconElement && desktop ? this.mergeStyles(styles.leftIconDesktop, leftIconElement.props.style) : null;
    var mergedRightIconStyles = rightIcon && desktop ? this.mergeStyles(styles.rightIconDesktop, rightIcon.props.style) : null;

    var secondaryTextElement = secondaryText ? secondaryTextIsAnElement ? React.cloneElement(secondaryText, { style: mergedSecondaryTextStyles }) : React.createElement(
      'div',
      { style: styles.secondaryText },
      secondaryText
    ) : null;

    var styledLeftIcon = leftIconElement && desktop ? React.cloneElement(leftIconElement, { style: mergedLeftIconStyles }) : leftIconElement;

    var rightIconElement = rightIcon ? React.cloneElement(rightIcon, { style: mergedRightIconStyles }) : null;

    return React.createElement(
      ListItem,
      _extends({}, other, {
        disabled: disabled,
        innerDivStyle: mergedInnerDivStyles,
        insetChildren: insetChildren,
        leftIcon: styledLeftIcon,
        ref: 'listItem',
        rightIcon: rightIconElement,
        style: mergedRootStyles }),
      this.props.children,
      secondaryTextElement
    );
  },

  _applyFocusState: function _applyFocusState() {
    this.refs.listItem.applyFocusState(this.props.focusState);
  }
});

module.exports = MenuItem;