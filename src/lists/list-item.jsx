import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ColorManipulator from '../utils/color-manipulator';
import StylePropable from '../mixins/style-propable';
import Colors from '../styles/colors';
import Transitions from '../styles/transitions';
import Typography from '../styles/typography';
import EnhancedButton from '../enhanced-button';
import IconButton from '../icon-button';
import OpenIcon from '../svg-icons/navigation/arrow-drop-up';
import CloseIcon from '../svg-icons/navigation/arrow-drop-down';
import NestedList from './nested-list';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const ListItem = React.createClass({

  propTypes: {
    /**
     * Generate a nested list indicator icon when
     * nested list items are detected. Set to false
     * if you do not want an indicator auto-generated.
     * Note that an indicator will not be created if a
     * rightIcon/Button has been specified.
     */
    autoGenerateNestedIndicator: React.PropTypes.bool,

    /**
     * Children passed into the ListItem.
     */
    children: React.PropTypes.node,

    /**
     * Does not allow the element to be focused by the keyboard.
     */
    disableKeyboardFocus: React.PropTypes.bool,

    /**
     * If true, the list-item will not be clickable
     * and will not display hover affects.
     * This is automatically disabled if leftCheckbox
     * or rightToggle is set.
     */
    disabled: React.PropTypes.bool,

    /**
     * Controls whether or not the child ListItems are initially displayed.
     */
    initiallyOpen: React.PropTypes.bool,

    /**
     * Style prop for the innder div element.
     */
    innerDivStyle: React.PropTypes.object,

    /**
     * If true, the children will be indented by 72px.
     * Only needed if there is no left avatar or left icon.
     */
    insetChildren: React.PropTypes.bool,

    /**
     * This is the Avatar element to be displayed on the left side.
     */
    leftAvatar: React.PropTypes.element,

    /**
     * This is the Checkbox element to be displayed on the left side.
     */
    leftCheckbox: React.PropTypes.element,

    /**
     * This is the SvgIcon or FontIcon to be displayed on the left side.
     */
    leftIcon: React.PropTypes.element,

    /**
     * An array of ListItems to nest underneath the current ListItem.
     */
    nestedItems: React.PropTypes.arrayOf(React.PropTypes.element),

    /**
     * Controls how deep a ListItem appears.
     * This property is automatically managed so modify at your own risk.
     */
    nestedLevel: React.PropTypes.number,

    /**
     * Called when the ListItem has keyboard focus.
     */
    onKeyboardFocus: React.PropTypes.func,

    /**
     * Called when the mouse is over the ListItem.
     */
    onMouseEnter: React.PropTypes.func,

    /**
     * Called when the mouse is no longer over the ListItem.
     */
    onMouseLeave: React.PropTypes.func,

    /**
     * Called when the ListItem toggles its nested ListItems.
     */
    onNestedListToggle: React.PropTypes.func,

    /**
     * Called when touches start.
     */
    onTouchStart: React.PropTypes.func,

    /**
     * Called when a touch tap event occures on the component.
     */
    onTouchTap: React.PropTypes.func,

    /**
     * This is the block element that contains the primary text.
     * If a string is passed in, a div tag will be rendered.
     */
    primaryText: React.PropTypes.node,

    /**
     * If provided, tapping on the primary text
     * of the item toggles the nested list.
     */
    primaryTogglesNestedList: React.PropTypes.bool,

    /**
     * This is the avatar element to be displayed on the right side.
     */
    rightAvatar: React.PropTypes.element,

    /**
     * This is the SvgIcon or FontIcon to be displayed on the right side.
     */
    rightIcon: React.PropTypes.element,

    /**
     * This is the IconButton to be displayed on the right side.
     * Hovering over this button will remove the ListItem hover.
     * Also, clicking on this button will not trigger a
     * ListItem ripple. The event will be stopped and prevented
     * from bubbling up to cause a ListItem click.
     */
    rightIconButton: React.PropTypes.element,

    /**
     * This is the Toggle element to display on the right side.
     */
    rightToggle: React.PropTypes.element,

    /**
     * This is the block element that contains the secondary text.
     * If a string is passed in, a div tag will be rendered.
     */
    secondaryText: React.PropTypes.node,

    /**
     * Can be 1 or 2. This is the number of secondary
     * text lines before ellipsis will show.
     */
    secondaryTextLines: React.PropTypes.oneOf([1, 2]),

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    PureRenderMixin,
    StylePropable,
  ],

  getDefaultProps() {
    return {
      autoGenerateNestedIndicator: true,
      disableKeyboardFocus: false,
      disabled: false,
      initiallyOpen: false,
      insetChildren: false,
      nestedItems: [],
      nestedLevel: 0,
      onKeyboardFocus: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      onNestedListToggle: () => {},
      onTouchStart: () => {},
      primaryTogglesNestedList: false,
      secondaryTextLines: 1,
    };
  },

  getInitialState() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      open: this.props.initiallyOpen,
      rightIconButtonHovered: false,
      rightIconButtonKeyboardFocused: false,
      touch: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  applyFocusState(focusState) {
    const button = this.refs.enhancedButton;
    const buttonEl = ReactDOM.findDOMNode(button);

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

  _createDisabledElement(styles, contentChildren) {
    const {
      innerDivStyle,
      style,
    } = this.props;

    const mergedDivStyles = this.prepareStyles(
      styles.root,
      styles.innerDiv,
      innerDivStyle,
      style
    );

    return React.createElement('div', {style: mergedDivStyles}, contentChildren);
  },

  _createLabelElement(styles, contentChildren) {
    const {
      innerDivStyle,
      style,
    } = this.props;

    const mergedLabelStyles = this.prepareStyles(
      styles.root,
      styles.innerDiv,
      innerDivStyle,
      styles.label,
      style
    );

    return React.createElement('label', {style: mergedLabelStyles}, contentChildren);
  },

  _createTextElement(styles, data, key) {
    const isAnElement = React.isValidElement(data);
    const mergedStyles = isAnElement ?
      this.prepareStyles(styles, data.props.style) : null;

    return isAnElement ? (
      React.cloneElement(data, {
        key: key,
        style: mergedStyles,
      })
    ) : (
      <div key={key} style={this.prepareStyles(styles)}>
        {data}
      </div>
    );
  },

  _handleKeyboardFocus(e, isKeyboardFocused) {
    this.setState({isKeyboardFocused: isKeyboardFocused});
    this.props.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleMouseEnter(e) {
    if (!this.state.touch) this.setState({hovered: true});
    this.props.onMouseEnter(e);
  },

  _handleMouseLeave(e) {
    this.setState({hovered: false});
    this.props.onMouseLeave(e);
  },

  _handleNestedListToggle(e) {
    e.stopPropagation();
    this.setState({open: !this.state.open});
    this.props.onNestedListToggle(this);
  },

  _handleRightIconButtonKeyboardFocus(e, isKeyboardFocused) {
    const iconButton = this.props.rightIconButton;
    let newState = {};

    newState.rightIconButtonKeyboardFocused = isKeyboardFocused;
    if (isKeyboardFocused) newState.isKeyboardFocused = false;
    this.setState(newState);

    if (iconButton && iconButton.props.onKeyboardFocus) iconButton.props.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleRightIconButtonMouseDown(e) {
    const iconButton = this.props.rightIconButton;
    e.stopPropagation();
    if (iconButton && iconButton.props.onMouseDown) iconButton.props.onMouseDown(e);
  },

  _handleRightIconButtonMouseLeave(e) {
    const iconButton = this.props.rightIconButton;
    this.setState({rightIconButtonHovered: false});
    if (iconButton && iconButton.props.onMouseLeave) iconButton.props.onMouseLeave(e);
  },

  _handleRightIconButtonMouseEnter(e) {
    const iconButton = this.props.rightIconButton;
    this.setState({rightIconButtonHovered: true});
    if (iconButton && iconButton.props.onMouseEnter) iconButton.props.onMouseEnter(e);
  },

  _handleRightIconButtonMouseUp(e) {
    const iconButton = this.props.rightIconButton;
    e.stopPropagation();
    if (iconButton && iconButton.props.onMouseUp) iconButton.props.onMouseUp(e);
  },

  _handleRightIconButtonTouchTap(e) {
    const iconButton = this.props.rightIconButton;

    //Stop the event from bubbling up to the list-item
    e.stopPropagation();
    if (iconButton && iconButton.props.onTouchTap) iconButton.props.onTouchTap(e);
  },

  _handleTouchStart(e) {
    this.setState({touch: true});
    this.props.onTouchStart(e);
  },

  _pushElement(children, element, baseStyles, additionalProps) {
    if (element) {
      const styles = this.mergeStyles(baseStyles, element.props.style);
      children.push(
        React.cloneElement(element, {
          key: children.length,
          style: styles,
          ...additionalProps,
        })
      );
    }
  },

  render() {
    const {
      autoGenerateNestedIndicator,
      children,
      disabled,
      disableKeyboardFocus,
      innerDivStyle,
      insetChildren,
      leftAvatar,
      leftCheckbox,
      leftIcon,
      nestedItems,
      nestedLevel,
      onKeyboardFocus,
      onMouseLeave,
      onMouseEnter,
      onTouchStart,
      onTouchTap,
      rightAvatar,
      rightIcon,
      rightIconButton,
      rightToggle,
      primaryText,
      primaryTogglesNestedList,
      secondaryText,
      secondaryTextLines,
      style,
      ...other,
    } = this.props;

    const textColor = this.state.muiTheme.rawTheme.palette.textColor;
    const hoverColor = ColorManipulator.fade(textColor, 0.1);
    const singleAvatar = !secondaryText && (leftAvatar || rightAvatar);
    const singleNoAvatar = !secondaryText && !(leftAvatar || rightAvatar);
    const twoLine = secondaryText && secondaryTextLines === 1;
    const threeLine = secondaryText && secondaryTextLines > 1;
    const hasCheckbox = leftCheckbox || rightToggle;

    const styles = {
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
        marginLeft: nestedLevel * this.state.muiTheme.listItem.nestedLevelDepth,
        paddingLeft: leftIcon || leftAvatar || leftCheckbox || insetChildren ? 72 : 16,
        paddingRight: rightIcon || rightAvatar || rightIconButton ? 56 : rightToggle ? 72 : 16,
        paddingBottom: singleAvatar ? 20 : 16,
        paddingTop: singleNoAvatar || threeLine ? 16 : 20,
        position: 'relative',
      },

      icons: {
        height: 24,
        width: 24,
        display: 'block',
        position: 'absolute',
        top: twoLine ? 12 : singleAvatar ? 4 : 0,
        margin: 12,
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

      label: {
        cursor: 'pointer',
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

    let contentChildren = [children];

    if (leftIcon) {
      this._pushElement(
        contentChildren,
        leftIcon,
        this.mergeStyles(styles.icons, styles.leftIcon)
      );
    }

    if (rightIcon) {
      this._pushElement(
        contentChildren,
        rightIcon,
        this.mergeStyles(styles.icons, styles.rightIcon)
      );
    }

    if (leftAvatar) {
      this._pushElement(
        contentChildren,
        leftAvatar,
        this.mergeStyles(styles.avatars, styles.leftAvatar)
      );
    }

    if (rightAvatar) {
      this._pushElement(
        contentChildren,
        rightAvatar,
        this.mergeStyles(styles.avatars, styles.rightAvatar)
      );
    }

    if (leftCheckbox) {
      this._pushElement(
        contentChildren,
        leftCheckbox,
        this.mergeStyles(styles.leftCheckbox)
      );
    }

    //RightIconButtonElement
    const hasNestListItems = nestedItems.length;
    const hasRightElement = rightAvatar || rightIcon || rightIconButton || rightToggle;
    const needsNestedIndicator = hasNestListItems && autoGenerateNestedIndicator && !hasRightElement;

    if (rightIconButton || needsNestedIndicator) {
      let rightIconButtonElement = rightIconButton;
      let rightIconButtonHandlers = {
        onKeyboardFocus: this._handleRightIconButtonKeyboardFocus,
        onMouseEnter: this._handleRightIconButtonMouseEnter,
        onMouseLeave: this._handleRightIconButtonMouseLeave,
        onTouchTap: this._handleRightIconButtonTouchTap,
        onMouseDown: this._handleRightIconButtonMouseUp,
        onMouseUp: this._handleRightIconButtonMouseUp,
      };

      // Create a nested list indicator icon if we don't have an icon on the right
      if (needsNestedIndicator) {
        rightIconButtonElement = this.state.open ?
          <IconButton><OpenIcon /></IconButton> :
          <IconButton><CloseIcon /></IconButton>;
        rightIconButtonHandlers.onTouchTap = this._handleNestedListToggle;
      }

      this._pushElement(
        contentChildren,
        rightIconButtonElement,
        this.mergeStyles(styles.rightIconButton),
        rightIconButtonHandlers
      );
    }

    if (rightToggle) {
      this._pushElement(
        contentChildren,
        rightToggle,
        this.mergeStyles(styles.rightToggle)
      );
    }

    if (primaryText) {
      const secondaryTextElement = this._createTextElement(
        styles.primaryText,
        primaryText,
        'primaryText'
      );
      contentChildren.push(secondaryTextElement);
    }

    if (secondaryText) {
      const secondaryTextElement = this._createTextElement(
        styles.secondaryText,
        secondaryText,
        'secondaryText'
      );
      contentChildren.push(secondaryTextElement);
    }

    const nestedList = nestedItems.length ? (
      <NestedList nestedLevel={nestedLevel + 1} open={this.state.open}>
        {nestedItems}
      </NestedList>
    ) : undefined;

    return (
      <div>
        {
          hasCheckbox ? this._createLabelElement(styles, contentChildren) :
          disabled ? this._createDisabledElement(styles, contentChildren) : (
            <EnhancedButton
              {...other}
              disabled={disabled}
              disableKeyboardFocus={disableKeyboardFocus || this.state.rightIconButtonKeyboardFocused}
              linkButton={true}
              onKeyboardFocus={this._handleKeyboardFocus}
              onMouseLeave={this._handleMouseLeave}
              onMouseEnter={this._handleMouseEnter}
              onTouchStart={this._handleTouchStart}
              onTouchTap={primaryTogglesNestedList ? this._handleNestedListToggle : onTouchTap}
              ref="enhancedButton"
              style={this.mergeStyles(styles.root, style)}>
              <div style={this.prepareStyles(styles.innerDiv, innerDivStyle)}>
                {contentChildren}
              </div>
            </EnhancedButton>
          )
        }
        {nestedList}
      </div>
    );
  },

});

export default ListItem;
