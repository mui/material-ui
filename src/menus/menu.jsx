import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';
import Controllable from '../mixins/controllable';
import StylePropable from '../mixins/style-propable';
import ClickAwayable from '../mixins/click-awayable';
import AutoPrefix from '../styles/auto-prefix';
import Transitions from '../styles/transitions';
import KeyCode from '../utils/key-code';
import PropTypes from '../utils/prop-types';
import List from '../lists/list';
import Paper from '../paper';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const Menu = React.createClass({

  mixins: [
    StylePropable,
    Controllable,
    ClickAwayable,
  ],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    animated: React.PropTypes.bool,
    autoWidth: React.PropTypes.bool,
    children: React.PropTypes.node,
    desktop: React.PropTypes.bool,
    initiallyKeyboardFocused: React.PropTypes.bool,
    listStyle: React.PropTypes.object,
    maxHeight: React.PropTypes.number,
    multiple: React.PropTypes.bool,
    onEscKeyDown: React.PropTypes.func,
    onItemTouchTap: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    openDirection: PropTypes.corners,
    selectedMenuItemStyle: React.PropTypes.object,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    value: React.PropTypes.any,
    valueLink: React.PropTypes.object,
    width: PropTypes.stringOrNumber,
    zDepth: PropTypes.zDepth,
  },

  getDefaultProps() {
    return {
      animated: false,
      autoWidth: true,
      maxHeight: null,
      onEscKeyDown: () => {},
      onItemTouchTap: () => {},
      onKeyDown: () => {},
      openDirection: 'bottom-left',
      zDepth: 1,
    };
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
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

  componentDidEnter() {
    this._animateOpen();
  },

  componentDidMount() {
    if (this.props.autoWidth) this._setWidth();
    if (!this.props.animated) this._animateOpen();
    this._setScollPosition();
  },

  componentDidUpdate() {
    if (this.props.autoWidth) this._setWidth();
  },

  componentWillLeave(callback) {
    let rootStyle = ReactDOM.findDOMNode(this).style;
    rootStyle.transition = Transitions.easeOut('250ms', ['opacity', 'transform']);
    rootStyle.transform = 'translate3d(0,-8px,0)';
    rootStyle.opacity = 0;
    rootStyle = AutoPrefix.all(rootStyle);
    setTimeout(() => {
      if (this.isMounted()) callback();
    }, 250);
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

  componentClickAway(e) {
    if (e.defaultPrevented)
      return;
    this._setFocusIndex(-1, false);
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

    let mergedRootStyles = this.prepareStyles(styles.root, style);
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

        childrenContainerStyles = this.prepareStyles(styles.menuItemContainer, {
          transitionDelay: transitionDelay + 'ms',
        });
      }

      let clonedChild = childIsADivider ? React.cloneElement(child, {style: styles.divider}) :
        childIsDisabled ? React.cloneElement(child, {desktop: desktop}) :
        this._cloneMenuItem(child, menuItemIndex, styles);

      if (!childIsADivider && !childIsDisabled) menuItemIndex++;

      return animated ? (
        <div style={childrenContainerStyles}>{clonedChild}</div>
      ) : clonedChild;

    });

    return (
      <div
        onKeyDown={this._handleKeyDown}
        style={mergedRootStyles}>
        <Paper
          ref="scrollContainer"
          style={styles.paper}
          zDepth={zDepth}>
          <List
            {...other}
            ref="list"
            style={mergedListStyles}>
            {newChildren}
          </List>
        </Paper>
      </div>
    );
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

    AutoPrefix.set(rootStyle, 'transform', 'scaleX(1)');
    AutoPrefix.set(scrollContainerStyle, 'transform', 'scaleY(1)');
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
        }
        else {
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
    }
    else if (!multiple && itemValue !== menuValue) {
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

});

export default Menu;
