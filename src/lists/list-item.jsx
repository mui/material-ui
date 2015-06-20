var React = require('react/addons');
var ColorManipulator = require('../utils/color-manipulator');
var StylePropable = require('../mixins/style-propable');
var Colors = require('../styles/colors');
var Transitions = require('../styles/transitions');
var Typography = require('../styles/typography');
var EnhancedButton = require('../enhanced-button');

var ListItem = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    disabled: React.PropTypes.bool,
    disableKeyboardFocus: React.PropTypes.bool,
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

  getDefaultProps: function() {
    return {
      secondaryTextLines: 1
    };
  },

  getInitialState: function() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      rightIconButtonHovered: false,
      rightIconButtonKeyboardFocused: false,
      touch: false
    };
  },

  render: function() {

    var {
      disabled,
      disableKeyboardFocus,
      insetChildren,
      leftAvatar,
      leftCheckbox,
      leftIcon,
      onKeyboardFocus,
      onMouseOut,
      onMouseOver,
      onTouchStart,
      rightAvatar,
      rightIcon,
      rightIconButton,
      rightToggle,
      secondaryText,
      secondaryTextLines,
      style,
      ...other
    } = this.props;

    var textColor = this.context.muiTheme.palette.textColor;
    var hoverColor = ColorManipulator.fade(textColor, 0.1);
    var singleAvatar = !secondaryText && (leftAvatar || rightAvatar);
    var singleNoAvatar = !secondaryText && !(leftAvatar || rightAvatar);
    var twoLine = secondaryText && secondaryTextLines === 1;
    var threeLine = secondaryText && secondaryTextLines > 1;
    var hasCheckbox = leftCheckbox || rightToggle;

    var styles = {
      root: {
        backgroundColor: (this.state.isKeyboardFocused || this.state.hovered) && 
          !this.state.rightIconButtonHovered &&
          !this.state.rightIconButtonKeyboardFocused ? hoverColor : null,
        color: textColor,
        display: 'block',
        fontSize: 16,
        lineHeight: '16px',
        overflow: 'hidden',
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
        top: singleAvatar ? 8 : 16,
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
    var mergedDivStyles = this.mergeAndPrefix(styles.root, styles.innerDiv, style);
    var mergedLabelStyles = this.mergeAndPrefix(styles.root, styles.innerDiv, styles.label, style);
    var mergedSecondaryTextStyles = secondaryTextIsAnElement ?
      this.mergeStyles(styles.secondaryText, secondaryText.props.style) : null;

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
    if (secondaryText) contentChildren.push(
      React.isValidElement(secondaryText) ?
        React.cloneElement(secondaryText, {key: 'secondaryText', style: mergedSecondaryTextStyles}) :
        <div key="secondaryText" style={styles.secondaryText}>{secondaryText}</div>
    );

    return hasCheckbox || disabled ?
      React.createElement(
        hasCheckbox ? 'label' : 'div',
        { style: hasCheckbox ? mergedLabelStyles : mergedDivStyles },
        contentChildren
      ) : (
      <EnhancedButton
        {...other}
        disabled={disabled}
        disableKeyboardFocus={disableKeyboardFocus || this.state.rightIconButtonKeyboardFocused}
        linkButton={true}
        onKeyboardFocus={this._handleKeyboardFocus}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
        onTouchStart={this._handleTouchStart}
        style={mergedRootStyles}>
        <div style={styles.innerDiv}>
          {contentChildren}
        </div>
      </EnhancedButton>
    );

  },

  _pushElement: function(children, element, baseStyles, additionalProps) {
    if (element) {
      var styles = this.mergeStyles(baseStyles, element.props.style);
      children.push(
        React.cloneElement(element, {
          key: children.length,
          style: styles,
          ...additionalProps
        })
      );
    }
  },

  _handleKeyboardFocus: function(e, isKeyboardFocused) {
    this.setState({isKeyboardFocused: isKeyboardFocused});
    if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleMouseOver: function(e) {
    if (!this.state.touch) this.setState({hovered: true});
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleMouseOut: function(e) {
    this.setState({hovered: false});
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleRightIconButtonKeyboardFocus: function(e, isKeyboardFocused) {
    var iconButton = this.props.rightIconButton;
    var newState = {};

    newState.rightIconButtonKeyboardFocused = isKeyboardFocused;
    if (isKeyboardFocused) newState.isKeyboardFocused = false;
    this.setState(newState);

    if (iconButton.onKeyboardFocus) iconButton.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleRightIconButtonMouseDown: function(e) {
    var iconButton = this.props.rightIconButton;
    e.stopPropagation();
    if (iconButton.onMouseDown) iconButton.onDown(e);
  },

  _handleRightIconButtonMouseOut: function(e) {
    var iconButton = this.props.rightIconButton;
    this.setState({rightIconButtonHovered: false});
    if (iconButton.onMouseOut) iconButton.onMouseOut(e);
  },

  _handleRightIconButtonMouseOver: function(e) {
    var iconButton = this.props.rightIconButton;
    this.setState({rightIconButtonHovered: true});
    if (iconButton.onMouseOver) iconButton.onMouseOver(e);
  },

  _handleRightIconButtonMouseUp: function(e) {
    var iconButton = this.props.rightIconButton;
    e.stopPropagation();
    if (iconButton.onMouseUp) iconButton.onUp(e);
  },

  _handleRightIconButtonTouchTap: function(e) {
    var iconButton = this.props.rightIconButton;

    //Stop the event from bubbling up to the list-item
    e.stopPropagation();
    if (iconButton.onTouchTap) iconButton.onTouchTap(e);
  },

  _handleTouchStart: function(e) {
    this.setState({touch: true});
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  }

});

module.exports = ListItem;