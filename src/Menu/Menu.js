import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import shallowEqual from 'recompose/shallowEqual';
import ClickAwayListener from '../internal/ClickAwayListener';
import keycode from 'keycode';
import propTypes from '../utils/propTypes';
import List from '../List/List';
import {HotKeyHolder} from './menuUtils';

function getStyles(props, context) {
  const {
    desktop,
    maxHeight,
    width,
  } = props;

  const {muiTheme} = context;

  const styles = {
    root: {
      // Nested div because the List scales x faster than it scales y
      zIndex: muiTheme.zIndex.menu,
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
    selectedMenuItem: {
      color: muiTheme.menuItem.selectedTextColor,
    },
  };

  return styles;
}

class Menu extends Component {
  static propTypes = {
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
     * Override the inline-styles of menu items.
     */
    menuItemStyle: PropTypes.object,
    /**
     * If true, `value` must be an array and the menu will support
     * multiple selections.
     */
    multiple: PropTypes.bool,
    /**
     * Callback function fired when a menu item with `value` not
     * equal to the current `value` of the menu is clicked.
     *
     * @param {object} event Click event targeting the menu item.
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
     * Callback function fired when a menu item is clicked.
     *
     * @param {object} event Click event targeting the menu item.
     * @param {object} menuItem The menu item.
     * @param {number} index The index of the menu item.
     */
    onItemClick: PropTypes.func,
    /** @ignore */
    onKeyDown: PropTypes.func,
    /**
     * Callback function fired when the focus on a `MenuItem` is changed.
     * There will be some "duplicate" changes reported if two different
     * focusing event happen, for example if a `MenuItem` is focused via
     * the keyboard and then it is clicked on.
     *
     * @param {object} event The event that triggered the focus change.
     * The event can be null since the focus can be changed for non-event
     * reasons such as prop changes.
     * @param {number} newFocusIndex The index of the newly focused
     * `MenuItem` or `-1` if focus was lost.
     */
    onMenuItemFocusChange: PropTypes.func,
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
    onItemClick: () => {},
    onKeyDown: () => {},
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    const filteredChildren = this.getFilteredChildren(props.children);
    const selectedIndex = this.getLastSelectedIndex(props, filteredChildren);

    const newFocusIndex = props.disableAutoFocus ? -1 : selectedIndex >= 0 ? selectedIndex : 0;
    if (newFocusIndex !== -1 && props.onMenuItemFocusChange) {
      props.onMenuItemFocusChange(null, newFocusIndex);
    }
    this.state = {
      focusIndex: newFocusIndex,
      isKeyboardFocused: props.initiallyKeyboardFocused,
      keyWidth: props.desktop ? 64 : 56,
    };

    this.hotKeyHolder = new HotKeyHolder();
  }

  componentDidMount() {
    if (this.props.autoWidth) {
      this.setWidth();
    }
    this.setScollPosition();
  }

  componentWillReceiveProps(nextProps) {
    let selectedIndex;
    const filteredChildren = this.getFilteredChildren(nextProps.children);

    if (this.props.multiple !== true) {
      selectedIndex = this.getLastSelectedIndex(nextProps, filteredChildren);
    } else {
      selectedIndex = this.state.focusIndex;
    }

    const newFocusIndex = nextProps.disableAutoFocus ? -1 : selectedIndex >= 0 ? selectedIndex : 0;
    if (newFocusIndex !== this.state.focusIndex && this.props.onMenuItemFocusChange) {
      this.props.onMenuItemFocusChange(null, newFocusIndex);
    }
    this.setState({
      focusIndex: newFocusIndex,
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

    const {focusIndex} = this.state;
    if (focusIndex < 0) {
      return;
    }

    const filteredChildren = this.getFilteredChildren(this.props.children);
    const focusedItem = filteredChildren[focusIndex];
    if (!!focusedItem && focusedItem.props.menuItems && focusedItem.props.menuItems.length > 0) {
      return;
    }

    this.setFocusIndex(event, -1, false);
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

  cloneMenuItem(child, childIndex, styles, index) {
    const childIsDisabled = child.props.disabled;

    const selectedChildStyles = {};
    if (!childIsDisabled) {
      const selected = this.isChildSelected(child, this.props);

      if (selected) {
        Object.assign(selectedChildStyles, styles.selectedMenuItem, this.props.selectedMenuItemStyle);
      }
    }
    const mergedChildStyles = Object.assign({}, child.props.style, this.props.menuItemStyle, selectedChildStyles);

    const extraProps = {
      desktop: this.props.desktop,
      style: mergedChildStyles,
    };
    if (!childIsDisabled) {
      const isFocused = childIndex === this.state.focusIndex;
      let focusState = 'none';
      if (isFocused) {
        focusState = this.state.isKeyboardFocused ?
          'keyboard-focused' : 'focused';
      }

      Object.assign(extraProps, {
        focusState: focusState,
        onClick: (event) => {
          this.handleMenuItemClick(event, child, index);
          if (child.props.onClick) child.props.onClick(event);
        },
        ref: isFocused ? 'focusedMenuItem' : null,
      });
    }
    return React.cloneElement(child, extraProps);
  }

  decrementKeyboardFocusIndex(event) {
    let index = this.state.focusIndex;

    index--;
    if (index < 0) index = 0;

    this.setFocusIndex(event, index, true);
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

  getLastSelectedIndex(props, filteredChildren) {
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
        this.incrementKeyboardFocusIndex(event, filteredChildren);
        break;
      case 'esc':
        this.props.onEscKeyDown(event);
        break;
      case 'tab':
        event.preventDefault();
        if (event.shiftKey) {
          this.decrementKeyboardFocusIndex(event);
        } else {
          this.incrementKeyboardFocusIndex(event, filteredChildren);
        }
        break;
      case 'up':
        event.preventDefault();
        this.decrementKeyboardFocusIndex(event);
        break;
      default:
        if (key && key.length === 1) {
          const hotKeys = this.hotKeyHolder.append(key);
          if (this.setFocusIndexStartsWith(event, hotKeys, filteredChildren)) {
            event.preventDefault();
          }
        }
    }
    this.props.onKeyDown(event);
  };

  setFocusIndexStartsWith(event, keys, filteredChildren) {
    let foundIndex = -1;
    React.Children.forEach(filteredChildren, (child, index) => {
      if (foundIndex >= 0) {
        return;
      }
      const {primaryText} = child.props;
      if (typeof primaryText === 'string' && primaryText.substr(0, keys.length).toLowerCase() === keys.toLowerCase()) {
        foundIndex = index;
      }
    });
    if (foundIndex >= 0) {
      this.setFocusIndex(event, foundIndex, true);
      return true;
    }
    return false;
  }

  handleMenuItemClick(event, item, index) {
    const children = this.props.children;
    const multiple = this.props.multiple;
    const valueLink = this.getValueLink(this.props);
    let menuValue = valueLink.value;
    const itemValue = item.props.value;
    const focusIndex = React.isValidElement(children) ? 0 : children.indexOf(item);

    this.setFocusIndex(event, focusIndex, false);

    if (multiple) {
      menuValue = menuValue || [];

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

    this.props.onItemClick(event, item, index);
  }

  incrementKeyboardFocusIndex(event, filteredChildren) {
    let index = this.state.focusIndex;
    const maxIndex = this.getMenuItemCount(filteredChildren) - 1;

    index++;
    if (index > maxIndex) index = maxIndex;

    this.setFocusIndex(event, index, true);
  }

  isChildSelected(child, props) {
    const menuValue = this.getValueLink(props).value;
    const childValue = child.props.value;

    if (props.multiple) {
      return menuValue && menuValue.length && menuValue.indexOf(childValue) !== -1;
    } else {
      return child.props.hasOwnProperty('value') && menuValue === childValue;
    }
  }

  setFocusIndex(event, newIndex, isKeyboardFocused) {
    if (this.props.onMenuItemFocusChange) {
      // Do this even if `newIndex === this.state.focusIndex` to allow users
      // to detect up-arrow on the first MenuItem or down-arrow on the last.
      this.props.onMenuItemFocusChange(event, newIndex);
    }
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

  cancelScrollEvent(event) {
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  handleOnWheel = (event) => {
    const scrollContainer = this.refs.scrollContainer;
    // Only scroll lock if the the Menu is scrollable.
    if (scrollContainer.scrollHeight <= scrollContainer.clientHeight) return;

    const {scrollTop, scrollHeight, clientHeight} = scrollContainer;
    const wheelDelta = event.deltaY;
    const isDeltaPositive = wheelDelta > 0;

    if (isDeltaPositive && wheelDelta > scrollHeight - clientHeight - scrollTop) {
      scrollContainer.scrollTop = scrollHeight;
      return this.cancelScrollEvent(event);
    } else if (!isDeltaPositive && -wheelDelta > scrollTop) {
      scrollContainer.scrollTop = 0;
      return this.cancelScrollEvent(event);
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
      autoWidth, // eslint-disable-line no-unused-vars
      children,
      desktop, // eslint-disable-line no-unused-vars
      disableAutoFocus, // eslint-disable-line no-unused-vars
      initiallyKeyboardFocused, // eslint-disable-line no-unused-vars
      listStyle,
      maxHeight, // eslint-disable-line no-unused-vars
      multiple, // eslint-disable-line no-unused-vars
      onItemClick, // eslint-disable-line no-unused-vars
      onEscKeyDown, // eslint-disable-line no-unused-vars
      onMenuItemFocusChange, // eslint-disable-line no-unused-vars
      selectedMenuItemStyle, // eslint-disable-line no-unused-vars
      menuItemStyle, // eslint-disable-line no-unused-vars
      style,
      value, // eslint-disable-line no-unused-vars
      valueLink, // eslint-disable-line no-unused-vars
      width, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    const mergedRootStyles = Object.assign(styles.root, style);
    const mergedListStyles = Object.assign(styles.list, listStyle);

    const filteredChildren = this.getFilteredChildren(children);

    let menuItemIndex = 0;
    const newChildren = React.Children.map(filteredChildren, (child, index) => {
      const childIsDisabled = child.props.disabled;
      const childName = child.type ? child.type.muiName : '';
      let newChild = child;

      switch (childName) {
        case 'MenuItem':
          newChild = this.cloneMenuItem(child, menuItemIndex, styles, index);
          break;

        case 'Divider':
          newChild = React.cloneElement(child, {
            style: Object.assign({}, styles.divider, child.props.style),
          });
          break;
      }

      if (childName === 'MenuItem' && !childIsDisabled) {
        menuItemIndex++;
      }

      return newChild;
    });

    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div
          onKeyDown={this.handleKeyDown}
          onWheel={this.handleOnWheel}
          style={prepareStyles(mergedRootStyles)}
          ref="scrollContainer"
          role="presentation"
        >
          <List
            {...other}
            ref="list"
            style={mergedListStyles}
            role="menu"
          >
            {newChildren}
          </List>
        </div>
      </ClickAwayListener>
    );
  }
}

export default Menu;
