import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import shallowEqual from 'recompose/shallowEqual';
import ClickAwayListener from '../internal/ClickAwayListener';
import autoPrefix from '../utils/autoPrefix';
import transitions from '../styles/transitions';
import keycode from 'keycode';
import propTypes from '../utils/propTypes';
import List from '../List/List';
import deprecated from '../utils/deprecatedPropType';
import warning from 'warning';
import {HotKeyHolder} from './menuUtils';

function getStyles(props, context) {
  const {
    animated,
    desktop,
    maxHeight,
    openDirection = 'bottom-left',
    width,
  } = props;

  const openDown = openDirection.split('-')[0] === 'bottom';
  const openLeft = openDirection.split('-')[1] === 'left';

  const {muiTheme} = context;

  const styles = {
    root: {
      // Nested div bacause the List scales x faster than it scales y
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
      color: muiTheme.baseTheme.palette.accent1Color,
    },
  };

  return styles;
}

class Menu extends Component {
  static propTypes = {
    /**
     * If true, the menu will apply transitions when it
     * is added to the DOM. In order for transitions to
     * work, wrap the menu inside a `ReactTransitionGroup`.
     */
    animated: deprecated(PropTypes.bool, `Instead, use a [Popover](/#/components/popover).
      It will be removed with v0.16.0.`),
    /**
     * If true, the width of the menu will be set automatically
     * according to the widths of its children,
     * using proper keyline increments (64px for desktop,
     * 56px otherwise).
     */
    autoWidth: PropTypes.bool,
    /**
     * The content of the menu. This is usually used to pass `MenuItem`
     * elements.
     */
    children: PropTypes.node,
    /**
     * If true, the menu item will render with compact desktop styles.
     */
    desktop: PropTypes.bool,
    /**
     * If true, the menu will not be auto-focused.
     */
    disableAutoFocus: PropTypes.bool,
    /**
     * If true, the menu will be keyboard-focused initially.
     */
    initiallyKeyboardFocused: PropTypes.bool,
    /**
     * Override the inline-styles of the underlying `List` element.
     */
    listStyle: PropTypes.object,
    /**
     * The maximum height of the menu in pixels. If specified,
     * the menu will be scrollable if it is taller than the provided
     * height.
     */
    maxHeight: PropTypes.number,
    /**
     * If true, `value` must be an array and the menu will support
     * multiple selections.
     */
    multiple: PropTypes.bool,
    /**
     * Callback function fired when a menu item with `value` not
     * equal to the current `value` of the menu is touch-tapped.
     *
     * @param {object} event TouchTap event targeting the menu item.
     * @param {any}  value If `multiple` is true, the menu's `value`
     * array with either the menu item's `value` added (if
     * it wasn't already selected) or omitted (if it was already selected).
     * Otherwise, the `value` of the menu item.
     */
    onChange: PropTypes.func,
    /**
     * Callback function fired when the menu is focused and the *Esc* key
     * is pressed.
     *
     * @param {object} event `keydown` event targeting the menu.
     */
    onEscKeyDown: PropTypes.func,
    /**
     * Callback function fired when a menu item is touch-tapped.
     *
     * @param {object} event TouchTap event targeting the menu item.
     * @param {object} menuItem The menu item.
     * @param {number} index The index of the menu item.
     */
    onItemTouchTap: PropTypes.func,
    /** @ignore */
    onKeyDown: PropTypes.func,
    /**
     * This is the placement of the menu relative to the `IconButton`.
     */
    openDirection: deprecated(propTypes.corners, `Instead, use a [Popover](/#/components/popover).
      It will be removed with v0.16.0.`),
    /**
     * Override the inline-styles of selected menu items.
     */
    selectedMenuItemStyle: PropTypes.object,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * If `multiple` is true, an array of the `value`s of the selected
     * menu items. Otherwise, the `value` of the selected menu item.
     * If provided, the menu will be a controlled component.
     * This component also supports valueLink.
     */
    value: PropTypes.any,
    /**
     * ValueLink for the menu's `value`.
     */
    valueLink: PropTypes.object,
    /**
     * The width of the menu. If not specified, the menu's width
     * will be set according to the widths of its children, using
     * proper keyline increments (64px for desktop, 56px otherwise).
     */
    width: propTypes.stringOrNumber,
    /**
     * @ignore
     * Menu no longer supports `zDepth`. Instead, wrap it in `Paper`
     * or another component that provides zDepth.
     */
    zDepth: propTypes.zDepth,
  };

  static defaultProps = {
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
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    const filteredChildren = this.getFilteredChildren(props.children);
    const selectedIndex = this.getSelectedIndex(props, filteredChildren);

    this.state = {
      focusIndex: props.disableAutoFocus ? -1 : selectedIndex >= 0 ? selectedIndex : 0,
      isKeyboardFocused: props.initiallyKeyboardFocused,
      keyWidth: props.desktop ? 64 : 56,
    };

    this.hotKeyHolder = new HotKeyHolder();
  }

  componentDidMount() {
    if (this.props.autoWidth) {
      this.setWidth();
    }
    if (!this.props.animated) {
      this.animateOpen();
    }
    this.setScollPosition();
  }

  componentWillReceiveProps(nextProps) {
    const filteredChildren = this.getFilteredChildren(nextProps.children);
    const selectedIndex = this.getSelectedIndex(nextProps, filteredChildren);

    this.setState({
      focusIndex: nextProps.disableAutoFocus ? -1 : selectedIndex >= 0 ? selectedIndex : 0,
      keyWidth: nextProps.desktop ? 64 : 56,
    });
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(this.context, nextContext)
    );
  }

  componentDidUpdate() {
    if (this.props.autoWidth) this.setWidth();
  }

  handleClickAway = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    this.setFocusIndex(-1, false);
  };

  // Do not use outside of this component, it will be removed once valueLink is deprecated
  getValueLink(props) {
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange,
    };
  }

  setKeyboardFocused(keyboardFocused) {
    this.setState({
      isKeyboardFocused: keyboardFocused,
    });
  }

  getFilteredChildren(children) {
    const filteredChildren = [];
    React.Children.forEach(children, (child) => {
      if (child) {
        filteredChildren.push(child);
      }
    });
    return filteredChildren;
  }

  animateOpen() {
    const rootStyle = ReactDOM.findDOMNode(this).style;
    const scrollContainerStyle = ReactDOM.findDOMNode(this.refs.scrollContainer).style;
    const menuContainers = ReactDOM.findDOMNode(this.refs.list).childNodes;

    autoPrefix.set(rootStyle, 'transform', 'scaleX(1)');
    autoPrefix.set(scrollContainerStyle, 'transform', 'scaleY(1)');
    scrollContainerStyle.opacity = 1;

    for (let i = 0; i < menuContainers.length; ++i) {
      menuContainers[i].style.opacity = 1;
    }
  }

  cloneMenuItem(child, childIndex, styles, index) {
    const {
      desktop,
      selectedMenuItemStyle,
    } = this.props;

    const selected = this.isChildSelected(child, this.props);
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
        this.handleMenuItemTouchTap(event, child, index);
        if (child.props.onTouchTap) child.props.onTouchTap(event);
      },
      ref: isFocused ? 'focusedMenuItem' : null,
      style: mergedChildrenStyles,
    });
  }

  decrementKeyboardFocusIndex() {
    let index = this.state.focusIndex;

    index--;
    if (index < 0) index = 0;

    this.setFocusIndex(index, true);
  }

  getCascadeChildrenCount(filteredChildren) {
    const {
      desktop,
      maxHeight,
    } = this.props;
    let count = 1;
    let currentHeight = desktop ? 16 : 8;
    const menuItemHeight = desktop ? 32 : 48;

    // MaxHeight isn't set - cascade all of the children
    if (!maxHeight) return filteredChildren.length;

    // Count all the children that will fit inside the max menu height
    filteredChildren.forEach((child) => {
      if (currentHeight < maxHeight) {
        const childIsADivider = child.type && child.type.muiName === 'Divider';

        currentHeight += childIsADivider ? 16 : menuItemHeight;
        count++;
      }
    });

    return count;
  }

  getMenuItemCount(filteredChildren) {
    let menuItemCount = 0;
    filteredChildren.forEach((child) => {
      const childIsADivider = child.type && child.type.muiName === 'Divider';
      const childIsDisabled = child.props.disabled;
      if (!childIsADivider && !childIsDisabled) menuItemCount++;
    });
    return menuItemCount;
  }

  getSelectedIndex(props, filteredChildren) {
    let selectedIndex = -1;
    let menuItemIndex = 0;

    filteredChildren.forEach((child) => {
      const childIsADivider = child.type && child.type.muiName === 'Divider';

      if (this.isChildSelected(child, props)) selectedIndex = menuItemIndex;
      if (!childIsADivider) menuItemIndex++;
    });

    return selectedIndex;
  }

  handleKeyDown = (event) => {
    const filteredChildren = this.getFilteredChildren(this.props.children);
    const key = keycode(event);
    switch (key) {
      case 'down':
        event.preventDefault();
        this.incrementKeyboardFocusIndex(filteredChildren);
        break;
      case 'esc':
        this.props.onEscKeyDown(event);
        break;
      case 'tab':
        event.preventDefault();
        if (event.shiftKey) {
          this.decrementKeyboardFocusIndex();
        } else {
          this.incrementKeyboardFocusIndex(filteredChildren);
        }
        break;
      case 'up':
        event.preventDefault();
        this.decrementKeyboardFocusIndex();
        break;
      default:
        if (key && key.length === 1) {
          const hotKeys = this.hotKeyHolder.append(key);
          if (this.setFocusIndexStartsWith(hotKeys)) {
            event.preventDefault();
          }
        }
    }
    this.props.onKeyDown(event);
  };

  setFocusIndexStartsWith(keys) {
    let foundIndex = -1;
    React.Children.forEach(this.props.children, (child, index) => {
      if (foundIndex >= 0) {
        return;
      }
      const {primaryText} = child.props;
      if (typeof primaryText === 'string' && new RegExp(`^${keys}`, 'i').test(primaryText)) {
        foundIndex = index;
      }
    });
    if (foundIndex >= 0) {
      this.setFocusIndex(foundIndex, true);
      return true;
    }
    return false;
  }

  handleMenuItemTouchTap(event, item, index) {
    const children = this.props.children;
    const multiple = this.props.multiple;
    const valueLink = this.getValueLink(this.props);
    const menuValue = valueLink.value;
    const itemValue = item.props.value;
    const focusIndex = React.isValidElement(children) ? 0 : children.indexOf(item);

    this.setFocusIndex(focusIndex, false);

    if (multiple) {
      const itemIndex = menuValue.indexOf(itemValue);
      const [...newMenuValue] = menuValue;
      if (itemIndex === -1) {
        newMenuValue.push(itemValue);
      } else {
        newMenuValue.splice(itemIndex, 1);
      }

      valueLink.requestChange(event, newMenuValue);
    } else if (!multiple && itemValue !== menuValue) {
      valueLink.requestChange(event, itemValue);
    }

    this.props.onItemTouchTap(event, item, index);
  }

  incrementKeyboardFocusIndex(filteredChildren) {
    let index = this.state.focusIndex;
    const maxIndex = this.getMenuItemCount(filteredChildren) - 1;

    index++;
    if (index > maxIndex) index = maxIndex;

    this.setFocusIndex(index, true);
  }

  isChildSelected(child, props) {
    const menuValue = this.getValueLink(props).value;
    const childValue = child.props.value;

    if (props.multiple) {
      return menuValue.length && menuValue.indexOf(childValue) !== -1;
    } else {
      return child.props.hasOwnProperty('value') && menuValue === childValue;
    }
  }

  setFocusIndex(newIndex, isKeyboardFocused) {
    this.setState({
      focusIndex: newIndex,
      isKeyboardFocused: isKeyboardFocused,
    });
  }

  setScollPosition() {
    const desktop = this.props.desktop;
    const focusedMenuItem = this.refs.focusedMenuItem;
    const menuItemHeight = desktop ? 32 : 48;

    if (focusedMenuItem) {
      const selectedOffSet = ReactDOM.findDOMNode(focusedMenuItem).offsetTop;

      // Make the focused item be the 2nd item in the list the user sees
      let scrollTop = selectedOffSet - menuItemHeight;
      if (scrollTop < menuItemHeight) scrollTop = 0;

      ReactDOM.findDOMNode(this.refs.scrollContainer).scrollTop = scrollTop;
    }
  }

  setWidth() {
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
  }

  render() {
    const {
      animated,
      autoWidth, // eslint-disable-line no-unused-vars
      children,
      desktop,
      disableAutoFocus, // eslint-disable-line no-unused-vars
      initiallyKeyboardFocused, // eslint-disable-line no-unused-vars
      listStyle,
      maxHeight, // eslint-disable-line no-unused-vars
      multiple, // eslint-disable-line no-unused-vars
      openDirection = 'bottom-left',
      onItemTouchTap, // eslint-disable-line no-unused-vars
      onEscKeyDown, // eslint-disable-line no-unused-vars
      selectedMenuItemStyle, // eslint-disable-line no-unused-vars
      style,
      value, // eslint-disable-line no-unused-vars
      valueLink, // eslint-disable-line no-unused-vars
      width, // eslint-disable-line no-unused-vars
      zDepth,
      ...other,
    } = this.props;

    warning((typeof zDepth === 'undefined'), 'Menu no longer supports `zDepth`. Instead, wrap it in `Paper` ' +
      'or another component that provides `zDepth`. It will be removed with v0.16.0.');

    const {focusIndex} = this.state;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    const mergedRootStyles = Object.assign(styles.root, style);
    const mergedListStyles = Object.assign(styles.list, listStyle);

    const openDown = openDirection.split('-')[0] === 'bottom';
    const filteredChildren = this.getFilteredChildren(children);

    // Cascade children opacity
    let cumulativeDelay = openDown ? 175 : 325;
    const cascadeChildrenCount = this.getCascadeChildrenCount(filteredChildren);
    const cumulativeDelayIncrement = Math.ceil(150 / cascadeChildrenCount);

    let menuItemIndex = 0;
    const newChildren = React.Children.map(filteredChildren, (child, index) => {
      const childIsADivider = child.type && child.type.muiName === 'Divider';
      const childIsDisabled = child.props.disabled;
      let childrenContainerStyles = {};

      if (animated) {
        let transitionDelay = 0;

        // Only cascade the visible menu items
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
        this.cloneMenuItem(child, menuItemIndex, styles, index);

      if (!childIsADivider && !childIsDisabled) menuItemIndex++;

      return animated ? (
        <div style={prepareStyles(childrenContainerStyles)}>{clonedChild}</div>
      ) : clonedChild;
    });

    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div
          onKeyDown={this.handleKeyDown}
          style={prepareStyles(mergedRootStyles)}
          ref="scrollContainer"
        >
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
  }
}

export default Menu;
