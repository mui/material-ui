import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';
import ClickAwayListener from '../internal/ClickAwayListener';
import autoPrefix from '../utils/autoPrefix';
import transitions from '../styles/transitions';
import keycode from 'keycode';
import propTypes from '../utils/propTypes';
import List from '../List/List';
import getMuiTheme from '../styles/getMuiTheme';
import deprecated from '../utils/deprecatedPropType';
import warning from 'warning';

const Menu = React.createClass({

  propTypes: {
    /**
     * If true, the menu will apply transitions when added it
     * gets added to the DOM. In order for transitions to
     * work, wrap the menu inside a ReactTransitionGroup.
     */
    animated: deprecated(React.PropTypes.bool, 'Instead, use a [Popover](/#/components/popover).'),

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
     * Disable the auto focus feature.
     */
    disableAutoFocus: React.PropTypes.bool,

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
     * If true, the value can be an array and allow the menu to be a multi-select.
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
    openDirection: propTypes.corners,

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
    width: propTypes.stringOrNumber,

    /**
     * @ignore
     * Menu no longer supports `zDepth`. Instead, wrap it in `Paper`
     * or another component that provides zDepth.
     */
    zDepth: propTypes.zDepth,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      autoWidth: true,
      desktop: false,
      disableAutoFocus: false,
      initiallyKeyboardFocused: false,
      maxHeight: null,
      multiple: false,
      onChange: () => {},
      onEscKeyDown: () => {},
      onItemTouchTap: () => {},
      onKeyDown: () => {},
      openDirection: 'bottom-left',
    };
  },

  getInitialState() {
    const filteredChildren = this._getFilteredChildren(this.props.children);
    const selectedIndex = this._getSelectedIndex(this.props, filteredChildren);

    return {
      focusIndex: this.props.disableAutoFocus ? -1 : selectedIndex >= 0 ? selectedIndex : 0,
      isKeyboardFocused: this.props.initiallyKeyboardFocused,
      keyWidth: this.props.desktop ? 64 : 56,
      muiTheme: this.context.muiTheme || getMuiTheme(),
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
    const selectedIndex = this._getSelectedIndex(nextProps, filteredChildren);

    this.setState({
      focusIndex: nextProps.disableAutoFocus ? -1 : selectedIndex >= 0 ? selectedIndex : 0,
      keyWidth: nextProps.desktop ? 64 : 56,
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  componentDidUpdate() {
    if (this.props.autoWidth) this._setWidth();
  },

  componentClickAway(event) {
    if (event.defaultPrevented) {
      return;
    }

    this._setFocusIndex(-1, false);
  },

  // Do not use outside of this component, it will be removed once valueLink is deprecated
  getValueLink(props) {
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange,
    };
  },

  setKeyboardFocused(keyboardFocused) {
    this.setState({
      isKeyboardFocused: keyboardFocused,
    });
  },

  _getFilteredChildren(children) {
    const filteredChildren = [];
    React.Children.forEach(children, (child) => {
      if (child) {
        filteredChildren.push(child);
      }
    });
    return filteredChildren;
  },

  _animateOpen() {
    const rootStyle = ReactDOM.findDOMNode(this).style;
    const scrollContainerStyle = ReactDOM.findDOMNode(this.refs.scrollContainer).style;
    const menuContainers = ReactDOM.findDOMNode(this.refs.list).childNodes;

    autoPrefix.set(rootStyle, 'transform', 'scaleX(1)', this.state.muiTheme);
    autoPrefix.set(scrollContainerStyle, 'transform', 'scaleY(1)', this.state.muiTheme);
    scrollContainerStyle.opacity = 1;

    for (let i = 0; i < menuContainers.length; ++i) {
      menuContainers[i].style.opacity = 1;
    }
  },

  _cloneMenuItem(child, childIndex, styles, index) {
    const {
      desktop,
      selectedMenuItemStyle,
    } = this.props;

    const selected = this._isChildSelected(child, this.props);
    let selectedChildrenStyles = {};

    if (selected) {
      selectedChildrenStyles = Object.assign(styles.selectedMenuItem, selectedMenuItemStyle);
    }

    const mergedChildrenStyles = Object.assign({}, child.props.style, selectedChildrenStyles);

    const isFocused = childIndex === this.state.focusIndex;
    let focusState = 'none';
    if (isFocused) {
      focusState = this.state.isKeyboardFocused ?
        'keyboard-focused' : 'focused';
    }

    return React.cloneElement(child, {
      desktop: desktop,
      focusState: focusState,
      onTouchTap: (event) => {
        this._handleMenuItemTouchTap(event, child, index);
        if (child.props.onTouchTap) child.props.onTouchTap(event);
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
    const {
      desktop,
      maxHeight,
    } = this.props;
    let count = 1;
    let currentHeight = desktop ? 16 : 8;
    const menuItemHeight = desktop ? 32 : 48;

    //MaxHeight isn't set - cascade all of the children
    if (!maxHeight) return filteredChildren.length;

    //Count all the children that will fit inside the
    //max menu height
    filteredChildren.forEach((child) => {
      if (currentHeight < maxHeight) {
        const childIsADivider = child.type && child.type.displayName === 'Divider';

        currentHeight += childIsADivider ? 16 : menuItemHeight;
        count++;
      }
    });

    return count;
  },

  _getMenuItemCount(filteredChildren) {
    let menuItemCount = 0;
    filteredChildren.forEach((child) => {
      const childIsADivider = child.type && child.type.displayName === 'Divider';
      const childIsDisabled = child.props.disabled;
      if (!childIsADivider && !childIsDisabled) menuItemCount++;
    });
    return menuItemCount;
  },

  _getSelectedIndex(props, filteredChildren) {
    let selectedIndex = -1;
    let menuItemIndex = 0;

    filteredChildren.forEach((child) => {
      const childIsADivider = child.type && child.type.displayName === 'Divider';

      if (this._isChildSelected(child, props)) selectedIndex = menuItemIndex;
      if (!childIsADivider) menuItemIndex++;
    });

    return selectedIndex;
  },

  _handleKeyDown(event) {
    const filteredChildren = this._getFilteredChildren(this.props.children);
    switch (keycode(event)) {
      case 'down':
        event.preventDefault();
        this._incrementKeyboardFocusIndex(filteredChildren);
        break;
      case 'esc':
        this.props.onEscKeyDown(event);
        break;
      case 'tab':
        event.preventDefault();
        if (event.shiftKey) {
          this._decrementKeyboardFocusIndex();
        } else {
          this._incrementKeyboardFocusIndex(filteredChildren);
        }
        break;
      case 'up':
        event.preventDefault();
        this._decrementKeyboardFocusIndex();
        break;
    }
    this.props.onKeyDown(event);
  },

  _handleMenuItemTouchTap(event, item, index) {
    const children = this.props.children;
    const multiple = this.props.multiple;
    const valueLink = this.getValueLink(this.props);
    const menuValue = valueLink.value;
    const itemValue = item.props.value;
    const focusIndex = React.isValidElement(children) ? 0 : children.indexOf(item);

    this._setFocusIndex(focusIndex, false);

    if (multiple) {
      const itemIndex = menuValue.indexOf(itemValue);
      const newMenuValue = itemIndex === -1 ?
        update(menuValue, {$push: [itemValue]}) :
        update(menuValue, {$splice: [[itemIndex, 1]]});

      valueLink.requestChange(event, newMenuValue);
    } else if (!multiple && itemValue !== menuValue) {
      valueLink.requestChange(event, itemValue);
    }

    this.props.onItemTouchTap(event, item, index);
  },

  _incrementKeyboardFocusIndex(filteredChildren) {
    let index = this.state.focusIndex;
    const maxIndex = this._getMenuItemCount(filteredChildren) - 1;

    index++;
    if (index > maxIndex) index = maxIndex;

    this._setFocusIndex(index, true);
  },

  _isChildSelected(child, props) {
    const menuValue = this.getValueLink(props).value;
    const childValue = child.props.value;

    if (props.multiple) {
      return menuValue.length && menuValue.indexOf(childValue) !== -1;
    } else {
      return child.props.hasOwnProperty('value') && menuValue === childValue;
    }
  },

  _setFocusIndex(newIndex, isKeyboardFocused) {
    this.setState({
      focusIndex: newIndex,
      isKeyboardFocused: isKeyboardFocused,
    });
  },

  _setScollPosition() {
    const desktop = this.props.desktop;
    const focusedMenuItem = this.refs.focusedMenuItem;
    const menuItemHeight = desktop ? 32 : 48;

    if (focusedMenuItem) {
      const selectedOffSet = ReactDOM.findDOMNode(focusedMenuItem).offsetTop;

      //Make the focused item be the 2nd item in the list the
      //user sees
      let scrollTop = selectedOffSet - menuItemHeight;
      if (scrollTop < menuItemHeight) scrollTop = 0;

      ReactDOM.findDOMNode(this.refs.scrollContainer).scrollTop = scrollTop;
    }
  },

  _setWidth() {
    const el = ReactDOM.findDOMNode(this);
    const listEl = ReactDOM.findDOMNode(this.refs.list);
    const elWidth = el.offsetWidth;
    const keyWidth = this.state.keyWidth;
    const minWidth = keyWidth * 1.5;
    let keyIncrements = elWidth / keyWidth;
    let newWidth;

    keyIncrements = keyIncrements <= 1.5 ? 1.5 : Math.ceil(keyIncrements);
    newWidth = keyIncrements * keyWidth;

    if (newWidth < minWidth) newWidth = minWidth;

    el.style.width = `${newWidth}px`;
    listEl.style.width = `${newWidth}px`;
  },

  render() {
    const {
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

    warning((typeof zDepth === 'undefined'), 'Menu no longer supports `zDepth`. Instead, wrap it in `Paper` ' +
      'or another component that provides `zDepth`.');

    const {
      focusIndex,
      muiTheme,
    } = this.state;

    const {
      prepareStyles,
    } = muiTheme;

    const openDown = openDirection.split('-')[0] === 'bottom';
    const openLeft = openDirection.split('-')[1] === 'left';

    const rawTheme = muiTheme.rawTheme;

    const styles = {
      root: {
        //Nested div bacause the List scales x faster than
        //it scales y
        transition: animated ? transitions.easeOut('250ms', 'transform') : null,
        zIndex: muiTheme.zIndex.menu,
        top: openDown ? 0 : null,
        bottom: !openDown ? 0 : null,
        left: !openLeft ? 0 : null,
        right: openLeft ? 0 : null,
        transform: animated ? 'scaleX(0)' : null,
        transformOrigin: openLeft ? 'right' : 'left',
        opacity: 0,
        maxHeight: maxHeight,
        overflowY: maxHeight ? 'auto' : null,
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
        transition: animated ? transitions.easeOut(null, 'opacity') : null,
        opacity: 0,
      },

      selectedMenuItem: {
        color: rawTheme.palette.accent1Color,
      },
    };

    const mergedRootStyles = Object.assign(styles.root, style);
    const mergedListStyles = Object.assign(styles.list, listStyle);

    const filteredChildren = this._getFilteredChildren(children);

    //Cascade children opacity
    let cumulativeDelay = openDown ? 175 : 325;
    const cascadeChildrenCount = this._getCascadeChildrenCount(filteredChildren);
    const cumulativeDelayIncrement = Math.ceil(150 / cascadeChildrenCount);

    let menuItemIndex = 0;
    const newChildren = React.Children.map(filteredChildren, (child, index) => {
      const childIsADivider = child.type && child.type.displayName === 'Divider';
      const childIsDisabled = child.props.disabled;
      let childrenContainerStyles = {};

      if (animated) {
        let transitionDelay = 0;

        //Only cascade the visible menu items
        if ((menuItemIndex >= focusIndex - 1) &&
          (menuItemIndex <= focusIndex + cascadeChildrenCount - 1)) {
          cumulativeDelay = openDown ?
            cumulativeDelay + cumulativeDelayIncrement :
            cumulativeDelay - cumulativeDelayIncrement;
          transitionDelay = cumulativeDelay;
        }

        childrenContainerStyles = Object.assign({}, styles.menuItemContainer, {
          transitionDelay: `${transitionDelay}ms`,
        });
      }

      const clonedChild = childIsADivider ? React.cloneElement(child, {style: styles.divider}) :
        childIsDisabled ? React.cloneElement(child, {desktop: desktop}) :
        this._cloneMenuItem(child, menuItemIndex, styles, index);

      if (!childIsADivider && !childIsDisabled) menuItemIndex++;

      return animated ? (
        <div style={prepareStyles(childrenContainerStyles)}>{clonedChild}</div>
      ) : clonedChild;
    });

    return (
      <ClickAwayListener onClickAway={this.componentClickAway}>
        <div onKeyDown={this._handleKeyDown} style={prepareStyles(mergedRootStyles)} ref="scrollContainer">
          <List
            {...other}
            ref="list"
            style={mergedListStyles}
          >
            {newChildren}
          </List>
        </div>
      </ClickAwayListener>
    );
  },

});

export default Menu;
