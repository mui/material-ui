let React = require('react/addons');
let ColorManipulator = require('../utils/color-manipulator');
let StylePropable = require('../mixins/style-propable');
let Colors = require('../styles/colors');
let Transitions = require('../styles/transitions');
let Typography = require('../styles/typography');
let EnhancedButton = require('../enhanced-button');
let IconButton = require('../icon-button');
let OpenIcon = require('../svg-icons/navigation/arrow-drop-up');
let CloseIcon = require('../svg-icons/navigation/arrow-drop-down');
let ListNested = require('./list-nested');


let ListItem = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
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
    secondaryTextLines: React.PropTypes.oneOf([1, 2]),
  },

  getDefaultProps() {
    return {
      autoGenerateNestedIndicator: true,
      nestedLevel: 0,
      open: false,
      secondaryTextLines: 1,
    };
  },

  getInitialState() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      open: this.props.open,
      rightIconButtonHovered: false,
      rightIconButtonKeyboardFocused: false,
      touch: false,
    };
  },

  render() {
    let {
      autoGenerateNestedIndicator,
      disabled,
      disableKeyboardFocus,
      innerDivStyle,
      insetChildren,
      leftAvatar,
      leftCheckbox,
      leftIcon,
      nestedLevel,
      onKeyboardFocus,
      onMouseLeave,
      onMouseEnter,
      onTouchStart,
      rightAvatar,
      rightIcon,
      rightIconButton,
      rightToggle,
      primaryText,
      secondaryText,
      secondaryTextLines,
      style,
      ...other,
    } = this.props;

    let textColor = this.context.muiTheme.palette.textColor;
    let hoverColor = ColorManipulator.fade(textColor, 0.1);
    let singleAvatar = !secondaryText && (leftAvatar || rightAvatar);
    let singleNoAvatar = !secondaryText && !(leftAvatar || rightAvatar);
    let twoLine = secondaryText && secondaryTextLines === 1;
    let threeLine = secondaryText && secondaryTextLines > 1;
    let hasCheckbox = leftCheckbox || rightToggle;

    let styles = {
      root: {
        backgroundColor: (this.state.isKeyboardFocused || this.state.hovered) &&
          !this.state.rightIconButtonHovered &&
          !this.state.rightIconButtonKeyboardFocused ? hoverColor : null,
        color: textColor,
        display: 'block',
        fontSize: 16,
        lineHeight: '16px',
        position: 'relative',
        transition: Transitions.easeOut(),
      },

      //This inner div is needed so that ripples will span the entire container
      innerDiv: {
        marginLeft: nestedLevel * this.context.muiTheme.component.listItem.nestedLevelDepth,
        paddingLeft: leftIcon || leftAvatar || leftCheckbox || insetChildren ? 72 : 16,
        paddingRight: rightIcon || rightAvatar || rightIconButton ? 56 : rightToggle ? 72 : 16,
        paddingBottom: singleAvatar ? 20 : 16,
        paddingTop: singleNoAvatar || threeLine ? 16 : 20,
        position: 'relative',
      },

      label: {
        cursor: 'pointer',
      },

      icons: {
        height: 24,
        width: 24,
        display: 'block',
        position: 'absolute',
        top: twoLine ? 12 : singleAvatar ? 4 : 0,
        padding: 12,
      },

      leftIcon: {
        color: Colors.grey600,
        fill: Colors.grey600,
        left: 4,
      },

      rightIcon: {
        color: Colors.grey400,
        fill: Colors.grey400,
        right: 4,
      },

      avatars: {
        position: 'absolute',
        top: singleAvatar ? 8 : 16,
      },

      leftAvatar: {
        left: 16,
      },

      rightAvatar: {
        right: 16,
      },

      leftCheckbox: {
        position: 'absolute',
        display: 'block',
        width: 24,
        top: twoLine ? 24 : singleAvatar ? 16 : 12,
        left: 16,
      },

      primaryText: {
        margin: 0,
      },

      rightIconButton: {
        position: 'absolute',
        display: 'block',
        top: twoLine ? 12 : singleAvatar ? 4 : 0,
        right: 4,
      },

      rightToggle: {
        position: 'absolute',
        display: 'block',
        width: 54,
        top: twoLine ? 25 : singleAvatar ? 17 : 13,
        right: 8,
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
        WebkitBoxOrient: threeLine ? 'vertical' : null,
      },
    };

    let primaryTextIsAnElement = React.isValidElement(primaryText);
    let secondaryTextIsAnElement = React.isValidElement(secondaryText);

    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    let mergedInnerDivStyles = this.mergeAndPrefix(styles.innerDiv, innerDivStyle);
    let mergedDivStyles = this.mergeAndPrefix(styles.root, mergedInnerDivStyles, style);
    let mergedLabelStyles = this.mergeAndPrefix(styles.root, mergedInnerDivStyles, styles.label, style);
    let mergedPrimaryTextStyles = primaryTextIsAnElement ?
      this.mergeStyles(styles.primaryText, primaryText.props.style) : null;
    let mergedSecondaryTextStyles = secondaryTextIsAnElement ?
      this.mergeStyles(styles.secondaryText, secondaryText.props.style) : null;

    let contentChildren = [];
    let nestedListItems = [];
    let nestedList;

    React.Children.forEach(this.props.children, (child) => {
      if (child === null) return;

      if (React.isValidElement(child) && child.type.displayName === 'ListItem') {
        nestedListItems.push(child);
      }
      else {
        contentChildren.push(child);
      }
    });

    let rightIconButtonHandlers = {
      onKeyboardFocus: this._handleRightIconButtonKeyboardFocus,
      onMouseEnter: this._handleRightIconButtonMouseEnter,
      onMouseLeave: this._handleRightIconButtonMouseLeave,
      onTouchTap: this._handleRightIconButtonTouchTap,
      onMouseDown: this._handleRightIconButtonMouseUp,
      onMouseUp: this._handleRightIconButtonMouseUp,
    };

    // Create a nested list indicator icon if we don't have an icon on the right
    if (nestedListItems.length > 0 &&
      autoGenerateNestedIndicator &&
      rightIcon === undefined &&
      rightAvatar === undefined &&
      rightIconButton === undefined) {
      if (this.state.open) {
        rightIconButton = <IconButton><OpenIcon /></IconButton>;
      }
      else {
        rightIconButton = <IconButton><CloseIcon /></IconButton>;
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
      nestedList = (
        <ListNested nestedLevel={nestedLevel + 1} open={this.state.open}>
          {nestedListItems}
        </ListNested>
      );
    }

    if (primaryText) {
      contentChildren.push(
        React.isValidElement(primaryText) ?
          React.cloneElement(primaryText, {key: 'primaryText', style: mergedPrimaryTextStyles}) :
          <div key="primaryText" style={styles.primaryText}>{primaryText}</div>
      );
    }

    if (secondaryText) {
      contentChildren.push(
        React.isValidElement(secondaryText) ?
          React.cloneElement(secondaryText, {key: 'secondaryText', style: mergedSecondaryTextStyles}) :
          <div key="secondaryText" style={styles.secondaryText}>{secondaryText}</div>
      );
    }

    return hasCheckbox || disabled ?
      React.createElement(
        hasCheckbox ? 'label' : 'div',
        { style: hasCheckbox ? mergedLabelStyles : mergedDivStyles },
        contentChildren
      ) : (
      <div>
        <EnhancedButton
          {...other}
          disabled={disabled}
          disableKeyboardFocus={disableKeyboardFocus || this.state.rightIconButtonKeyboardFocused}
          linkButton={true}
          onKeyboardFocus={this._handleKeyboardFocus}
          onMouseLeave={this._handleMouseLeave}
          onMouseEnter={this._handleMouseEnter}
          onTouchStart={this._handleTouchStart}
          ref="enhancedButton"
          style={mergedRootStyles}>
          <div style={mergedInnerDivStyles}>
            {contentChildren}
          </div>
        </EnhancedButton>
        {nestedList}
      </div>
    );

  },

  applyFocusState(focusState) {
    let button = this.refs.enhancedButton;
    let buttonEl = React.findDOMNode(button);

    if (button) {
      switch(focusState) {
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

  _pushElement(children, element, baseStyles, additionalProps) {
    if (element) {
      let styles = this.mergeStyles(baseStyles, element.props.style);
      children.push(
        React.cloneElement(element, {
          key: children.length,
          style: styles,
          ...additionalProps,
        })
      );
    }
  },

  _handleKeyboardFocus(e, isKeyboardFocused) {
    this.setState({isKeyboardFocused: isKeyboardFocused});
    if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleMouseEnter(e) {
    if (!this.state.touch) this.setState({hovered: true});
    if (this.props.onMouseEnter) this.props.onMouseEnter(e);
  },

  _handleMouseLeave(e) {
    this.setState({hovered: false});
    if (this.props.onMouseLeave) this.props.onMouseLeave(e);
  },

  _handleRightIconButtonKeyboardFocus(e, isKeyboardFocused) {
    let iconButton = this.props.rightIconButton;
    let newState = {};

    newState.rightIconButtonKeyboardFocused = isKeyboardFocused;
    if (isKeyboardFocused) newState.isKeyboardFocused = false;
    this.setState(newState);

    if (iconButton && iconButton.props.onKeyboardFocus) iconButton.props.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleRightIconButtonMouseDown(e) {
    let iconButton = this.props.rightIconButton;
    e.stopPropagation();
    if (iconButton && iconButton.props.onMouseDown) iconButton.props.onMouseDown(e);
  },

  _handleRightIconButtonMouseLeave(e) {
    let iconButton = this.props.rightIconButton;
    this.setState({rightIconButtonHovered: false});
    if (iconButton && iconButton.props.onMouseLeave) iconButton.props.onMouseLeave(e);
  },

  _handleRightIconButtonMouseEnter(e) {
    let iconButton = this.props.rightIconButton;
    this.setState({rightIconButtonHovered: true});
    if (iconButton && iconButton.props.onMouseEnter) iconButton.props.onMouseEnter(e);
  },

  _handleRightIconButtonMouseUp(e) {
    let iconButton = this.props.rightIconButton;
    e.stopPropagation();
    if (iconButton && iconButton.props.onMouseUp) iconButton.props.onMouseUp(e);
  },

  _handleRightIconButtonTouchTap(e) {
    let iconButton = this.props.rightIconButton;

    //Stop the event from bubbling up to the list-item
    e.stopPropagation();
    if (iconButton && iconButton.props.onTouchTap) iconButton.props.onTouchTap(e);
  },

  _handleTouchStart(e) {
    this.setState({touch: true});
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  _handleNestedListToggle(e) {
    e.stopPropagation();
    this.setState({open : !this.state.open});

    if (this.props.onNestedListToggle) this.props.onNestedListToggle(this);
  },

});

module.exports = ListItem;
