import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';
import Controllable from '../mixins/controllable';
import StylePropable from '../mixins/style-propable';
import ClickAwayable from '../mixins/click-awayable';
import autoPrefix from '../styles/auto-prefix';
import Transitions from '../styles/transitions';
import KeyCode from '../utils/key-code';
import PropTypes from '../utils/prop-types';
import List from '../lists/list';
import Paper from '../paper';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const Menu = React.createClass({

  propTypes: {
    /**
     * If true, the menu will apply transitions when added it
     * gets added to the DOM. In order for transitions to
     * work, wrap the menu inside a ReactTransitionGroup.
     */
    animated: React.PropTypes.bool,

    /**
     * If true, the width will automatically be
     * set according to the items inside the menu
     * using the proper keyline increment.
     */
    autoWidth: React.PropTypes.bool,

    /**
     * Children for the Menu. Usually MenuItems.
     */
    children: React.PropTypes.node,

    /**
     * Indicates if the menu should render with compact desktop styles.
     */
    desktop: React.PropTypes.bool,

    /**
     * True if this item should be focused by the keyboard initially.
     */
    initiallyKeyboardFocused: React.PropTypes.bool,

    /**
     * The style object to use to override underlying list style.
     */
    listStyle: React.PropTypes.object,

    /**
     * The maxHeight of the menu in pixels. If
     * specified, the menu will scroll if larger than the maxHeight.
     */
    maxHeight: React.PropTypes.number,

    /**
     * If true, the value can an array and allow the menu to be a multi-select.
     */
    multiple: React.PropTypes.bool,

    /**
     * Fired when a menu item is touchTapped and the menu item
     * value is not equal to the current menu value.
     */
    onChange: React.PropTypes.func,

    /**
     * Fired when an Esc key is keyed down.
     */
    onEscKeyDown: React.PropTypes.func,

    /**
     * Fired when a menu item is touchTapped.
     */
    onItemTouchTap: React.PropTypes.func,

    /**
     * Fired when a key is pressed.
     */
    onKeyDown: React.PropTypes.func,

    /**
     * This is the placement of the menu relative to the IconButton.
     */
    openDirection: PropTypes.corners,

    /**
     * Style for the selected Menu Item.
     */
    selectedMenuItemStyle: React.PropTypes.object,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The value of the selected menu item. If passed in,
     * this will make the menu a controlled component.
     * This component also supports valueLink.
     */
    value: React.PropTypes.any,

    /**
     * ValueLink for this component when controlled.
     */
    valueLink: React.PropTypes.object,

    /**
     * Sets the width of the menu. If not specified, the menu
     * width will be dictated by its children. The rendered
     * width will always be a keyline increment
     * (64px for desktop, 56px otherwise).
     */
    width: PropTypes.stringOrNumber,

    /**
     * Sets the width of the menu. If not specified,
     * the menu width will be dictated by its children.
     * The rendered width will always be a keyline increment
     * (64px for desktop, 56px otherwise).
     */
    zDepth: PropTypes.zDepth,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
    Controllable,
    ClickAwayable,
  ],

  getDefaultProps() {
    return {
      animated: false,
      autoWidth: true,
      desktop: false,
      initiallyKeyboardFocused: false,
      maxHeight: null,
      multiple: false,
      onEscKeyDown: () => {},
      onItemTouchTap: () => {},
      onKeyDown: () => {},
      openDirection: 'bottom-left',
      zDepth: 1,
    };
  },

  getInitialState() {
    const filteredChildren = this._getFilteredChildren(this.props.children);
    let selectedIndex = this._getSelectedIndex(this.props, filteredChildren);

    return {
      focusIndex: selectedIndex >= 0 ? selectedIndex : 0,
      isKeyboardFocused: this.props.initiallyKeyboardFocused,
      keyWidth: this.props.desktop ? 64 : 56,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    if (this.props.autoWidth) this._setWidth();
    if (!this.props.animated) this._animateOpen();
    this._setScollPosition();
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const filteredChildren = this._getFilteredChildren(nextProps.children);
    let selectedIndex = this._getSelectedIndex(nextProps, filteredChildren);
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;

    this.setState({
      focusIndex: selectedIndex >= 0 ? selectedIndex : 0,
      keyWidth: nextProps.desktop ? 64 : 56,
      muiTheme: newMuiTheme,
    });
  },

  componentDidUpdate() {
    if (this.props.autoWidth) this._setWidth();
  },

  componentClickAway(e) {
    if (e.defaultPrevented)
      return;
    this._setFocusIndex(-1, false);
  },


  setKeyboardFocused(keyboardFocused) {
    this.setState({
      isKeyboardFocused: keyboardFocused,
    });
  },

  _getFilteredChildren(children) {
    const filteredChildren = [];
    React.Children.forEach(children, child => {
      if (child) {
        filteredChildren.push(child);
      }
    });
    return filteredChildren;
  },

  _animateOpen() {
    let rootStyle = ReactDOM.findDOMNode(this).style;
    let scrollContainerStyle = ReactDOM.findDOMNode(this.refs.scrollContainer).style;
    let menuContainers = ReactDOM.findDOMNode(this.refs.list).childNodes;

    autoPrefix.set(rootStyle, 'transform', 'scaleX(1)', this.state.muiTheme);
    autoPrefix.set(scrollContainerStyle, 'transform', 'scaleY(1)', this.state.muiTheme);
    scrollContainerStyle.opacity = 1;

    for (let i = 0; i < menuContainers.length; ++i) {
      menuContainers[i].style.opacity = 1;
    }
  },

  _cloneMenuItem(child, childIndex, styles) {
    let {
      desktop,
      selectedMenuItemStyle,
    } = this.props;

    let selected = this._isChildSelected(child, this.props);
    let selectedChildrenStyles = {};

    if (selected) {
      selectedChildrenStyles = this.mergeStyles(styles.selectedMenuItem, selectedMenuItemStyle);
    }

    let mergedChildrenStyles = this.mergeStyles(
      child.props.style || {},
      selectedChildrenStyles
    );

    let isFocused = childIndex === this.state.focusIndex;
    let focusState = 'none';
    if (isFocused) {
      focusState = this.state.isKeyboardFocused ?
        'keyboard-focused' : 'focused';
    }

    return React.cloneElement(child, {
      desktop: desktop,
      focusState: focusState,
      onTouchTap: (e) => {
        this._handleMenuItemTouchTap(e, child);
        if (child.props.onTouchTap) child.props.onTouchTap(e);
      },
      ref: isFocused ? 'focusedMenuItem' : null,
      style: mergedChildrenStyles,
    });
  },

  _decrementKeyboardFocusIndex() {
    let index = this.state.focusIndex;

    index--;
    if (index < 0) index = 0;

    this._setFocusIndex(index, true);
  },

  _getCascadeChildrenCount(filteredChildren) {
    let {
      desktop,
      maxHeight,
    } = this.props;
    let count = 1;
    let currentHeight = desktop ? 16 : 8;
    let menuItemHeight = desktop ? 32 : 48;

    //MaxHeight isn't set - cascade all of the children
    if (!maxHeight) return filteredChildren.length;

    //Count all the children that will fit inside the
    //max menu height
    filteredChildren.forEach(child => {
      if (currentHeight < maxHeight) {
        let childIsADivider = child.type && child.type.displayName === 'Divider';

        currentHeight += childIsADivider ? 16 : menuItemHeight;
        count++;
      }
    });

    return count;
  },

  _getMenuItemCount(filteredChildren) {
    let menuItemCount = 0;
    filteredChildren.forEach(child => {
      let childIsADivider = child.type && child.type.displayName === 'Divider';
      let childIsDisabled = child.props.disabled;
      if (!childIsADivider && !childIsDisabled) menuItemCount++;
    });
    return menuItemCount;
  },

  _getSelectedIndex(props, filteredChildren) {
    let selectedIndex = -1;
    let menuItemIndex = 0;

    filteredChildren.forEach(child => {
      let childIsADivider = child.type && child.type.displayName === 'Divider';

      if (this._isChildSelected(child, props)) selectedIndex = menuItemIndex;
      if (!childIsADivider) menuItemIndex++;
    });

    return selectedIndex;
  },

  _handleKeyDown(e) {
    const filteredChildren = this._getFilteredChildren(this.props.children);
    switch (e.keyCode) {
      case KeyCode.DOWN:
        e.preventDefault();
        this._incrementKeyboardFocusIndex(filteredChildren);
        break;
      case KeyCode.ESC:
        this.props.onEscKeyDown(e);
        break;
      case KeyCode.TAB:
        e.preventDefault();
        if (e.shiftKey) {
          this._decrementKeyboardFocusIndex();
        } else {
          this._incrementKeyboardFocusIndex(filteredChildren);
        }
        break;
      case KeyCode.UP:
        e.preventDefault();
        this._decrementKeyboardFocusIndex();
        break;
    }
    this.props.onKeyDown(e);
  },

  _handleMenuItemTouchTap(e, item) {
    let children = this.props.children;
    let multiple = this.props.multiple;
    let valueLink = this.getValueLink(this.props);
    let menuValue = valueLink.value;
    let itemValue = item.props.value;
    let focusIndex = React.isValidElement(children) ? 0 : children.indexOf(item);

    this._setFocusIndex(focusIndex, false);

    if (multiple) {
      let index = menuValue.indexOf(itemValue);
      let newMenuValue = index === -1 ?
        update(menuValue, {$push: [itemValue]}) :
        update(menuValue, {$splice: [[index, 1]]});

      valueLink.requestChange(e, newMenuValue);
    } else if (!multiple && itemValue !== menuValue) {
      valueLink.requestChange(e, itemValue);
    }

    this.props.onItemTouchTap(e, item);
  },

  _incrementKeyboardFocusIndex(filteredChildren) {
    let index = this.state.focusIndex;
    let maxIndex = this._getMenuItemCount(filteredChildren) - 1;

    index++;
    if (index > maxIndex) index = maxIndex;

    this._setFocusIndex(index, true);
  },

  _isChildSelected(child, props) {
    let multiple = props.multiple;
    let menuValue = this.getValueLink(props).value;
    let childValue = child.props.value;

    return (multiple && menuValue.length && menuValue.indexOf(childValue) !== -1) ||
      (!multiple && menuValue && menuValue === childValue);
  },

  _setFocusIndex(newIndex, isKeyboardFocused) {
    this.setState({
      focusIndex: newIndex,
      isKeyboardFocused: isKeyboardFocused,
    });
  },

  _setScollPosition() {
    let desktop = this.props.desktop;
    let focusedMenuItem = this.refs.focusedMenuItem;
    let menuItemHeight = desktop ? 32 : 48;

    if (focusedMenuItem) {
      let selectedOffSet = ReactDOM.findDOMNode(focusedMenuItem).offsetTop;

      //Make the focused item be the 2nd item in the list the
      //user sees
      let scrollTop = selectedOffSet - menuItemHeight;
      if (scrollTop < menuItemHeight) scrollTop = 0;

      ReactDOM.findDOMNode(this.refs.scrollContainer).scrollTop = scrollTop;
    }
  },

  _setWidth() {
    let el = ReactDOM.findDOMNode(this);
    let listEl = ReactDOM.findDOMNode(this.refs.list);
    let elWidth = el.offsetWidth;
    let keyWidth = this.state.keyWidth;
    let minWidth = keyWidth * 1.5;
    let keyIncrements = elWidth / keyWidth;
    let newWidth;

    keyIncrements = keyIncrements <= 1.5 ? 1.5 : Math.ceil(keyIncrements);
    newWidth = keyIncrements * keyWidth;

    if (newWidth < minWidth) newWidth = minWidth;

    el.style.width = newWidth + 'px';
    listEl.style.width = newWidth + 'px';
  },

  render() {
    let {
      animated,
      autoWidth,
      children,
      desktop,
      initiallyKeyboardFocused,
      listStyle,
      maxHeight,
      multiple,
      openDirection,
      selectedMenuItemStyle,
      style,
      value,
      valueLink,
      width,
      zDepth,
      ...other,
    } = this.props;

    let openDown = openDirection.split('-')[0] === 'bottom';
    let openLeft = openDirection.split('-')[1] === 'left';

    const muiTheme = this.state.muiTheme;
    const rawTheme = muiTheme.rawTheme;

    let styles = {
      root: {
        //Nested div bacause the List scales x faster than
        //it scales y
        transition: animated ? Transitions.easeOut('250ms', 'transform') : null,
        zIndex: muiTheme.zIndex.menu,
        top: openDown ? 0 : null,
        bottom: !openDown ? 0 : null,
        left: !openLeft ? 0 : null,
        right: openLeft ? 0 : null,
        transform: 'scaleX(0)',
        transformOrigin: openLeft ? 'right' : 'left',
      },

      divider: {
        marginTop: 7,
        marginBottom: 8,
      },

      list: {
        display: 'table-cell',
        paddingBottom: desktop ? 16 : 8,
        paddingTop: desktop ? 16 : 8,
        userSelect: 'none',
        width: width,
      },

      menuItemContainer: {
        transition: animated ? Transitions.easeOut(null, 'opacity') : null,
        opacity: 0,
      },

      paper: {
        transition: animated ? Transitions.easeOut('500ms', ['transform', 'opacity']) : null,
        transform: 'scaleY(0)',
        transformOrigin: openDown ? 'top' : 'bottom',
        opacity: 0,
        maxHeight: maxHeight,
        overflowY: maxHeight ? 'auto' : null,
      },

      selectedMenuItem: {
        color: rawTheme.palette.accent1Color,
      },
    };

    let mergedRootStyles = this.mergeStyles(styles.root, style);
    let mergedListStyles = this.mergeStyles(styles.list, listStyle);

    const filteredChildren = this._getFilteredChildren(children);

    //Cascade children opacity
    let cumulativeDelay = openDown ? 175 : 325;
    let cascadeChildrenCount = this._getCascadeChildrenCount(filteredChildren);
    let cumulativeDelayIncrement = Math.ceil(150 / cascadeChildrenCount);

    let menuItemIndex = 0;
    let newChildren = React.Children.map(filteredChildren, child => {
      let childIsADivider = child.type && child.type.displayName === 'Divider';
      let childIsDisabled = child.props.disabled;
      let childrenContainerStyles = {};

      if (animated) {
        let focusIndex = this.state.focusIndex;
        let transitionDelay = 0;

        //Only cascade the visible menu items
        if ((menuItemIndex >= focusIndex - 1) &&
          (menuItemIndex <= focusIndex + cascadeChildrenCount - 1)) {
          cumulativeDelay = openDown ?
            cumulativeDelay + cumulativeDelayIncrement :
            cumulativeDelay - cumulativeDelayIncrement;
          transitionDelay = cumulativeDelay;
        }

        childrenContainerStyles = this.mergeStyles(styles.menuItemContainer, {
          transitionDelay: transitionDelay + 'ms',
        });
      }

      let clonedChild = childIsADivider ? React.cloneElement(child, {style: styles.divider}) :
        childIsDisabled ? React.cloneElement(child, {desktop: desktop}) :
        this._cloneMenuItem(child, menuItemIndex, styles);

      if (!childIsADivider && !childIsDisabled) menuItemIndex++;

      return animated ? (
        <div style={this.prepareStyles(childrenContainerStyles)}>{clonedChild}</div>
      ) : clonedChild;

    });

    return (
      <div
        onKeyDown={this._handleKeyDown}
        style={this.prepareStyles(mergedRootStyles)}
      >
        <Paper
          ref="scrollContainer"
          style={styles.paper}
          zDepth={zDepth}
        >
          <List
            {...other}
            ref="list"
            style={mergedListStyles}
          >
            {newChildren}
          </List>
        </Paper>
      </div>
    );
  },

});

export default Menu;
