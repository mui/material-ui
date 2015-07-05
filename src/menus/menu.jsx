let React = require('react/addons');
let update = React.addons.update;
let Controllable = require('../mixins/controllable');
let StylePropable = require('../mixins/style-propable');
let Transitions = require('../styles/transitions');
let KeyCode = require('../utils/key-code');
let List = require('../lists/list');
let Paper = require('../paper');


let Menu = React.createClass({

  mixins: [StylePropable, Controllable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    autoWidth: React.PropTypes.bool,
    desktop: React.PropTypes.bool,
    listStyle: React.PropTypes.object,
    maxHeight: React.PropTypes.number,
    multiple: React.PropTypes.bool,
    onItemKeyboardActivate: React.PropTypes.func,
    onItemTouchTap: React.PropTypes.func,
    open: React.PropTypes.bool,
    openDirection: React.PropTypes.oneOf([
      'bottom-left',
      'bottom-right',
      'top-left',
      'top-right'
    ]),
    selectedMenuItemStyle: React.PropTypes.object,
    width: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    zDepth: React.PropTypes.oneOf([0,1,2,3,4,5])
  },

  getDefaultProps() {
    return {
      autoWidth: true,
      maxHeight: null,
      onItemKeyboardActivate: () => {},
      onItemTouchTap: () => {},
      open: true,
      openDirection: 'bottom-left',
      zDepth: 1
    };
  },

  getInitialState() {
    return {
      focusIndex: 0,
      isKeyboardFocused: false,
      keyWidth: this.props.desktop ? 64 : 56
    };
  },

  componentDidMount() {
    if (this.props.autoWidth) this._setWidth();
  },

  componentDidUpdate(prevProps) {
    let openChanged = prevProps.open !== this.props.open;
    let justOpened = openChanged && this.props.open;

    if (this.props.autoWidth) this._setWidth();
    if (justOpened) this._setScollPosition();
  },

  componentWillReceiveProps(nextProps) {
    let openChanged = nextProps.open !== this.props.open;
    let isOpening = openChanged && nextProps.open;
    let isClosing = openChanged && !nextProps.open;

    if (isClosing) {
      this.setState({
        focusIndex: 0,
        isKeyboardFocused: false
      });
    } else if (isOpening) {
      let selectedIndex = this._getSelectedIndex();
      this.setState({
        focusIndex: selectedIndex >= 0 ? selectedIndex : 0
      });
    }
  },

  render() {

    let {
      autoWidth,
      children,
      desktop,
      listStyle,
      maxHeight,
      multiple,
      open,
      openDirection,
      selectedMenuItemStyle,
      style,
      value,
      valueLink,
      width,
      zDepth,
      ...other
    } = this.props;

    let openDown = openDirection.split('-')[0] === 'bottom';
    let openLeft = openDirection.split('-')[1] === 'left';

    let styles = {
      root: {
        //Nested div bacause the List scales x faster than
        //it scales y
        transition: Transitions.easeOut('250ms', 'transform'),
        transitionDelay: open ? '0ms' : '250ms',
        position: 'absolute',
        zIndex: 10,
        top: openDown ? 0 : null,
        bottom: !openDown ? 0 : null,
        left: !openLeft ? 0 : null,
        right: openLeft ? 0 : null,
        transform: open ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: openLeft ? 'right' : 'left'
      },

      list: {
        display: 'table-cell',
        paddingBottom: desktop ? 16 : 8,
        paddingTop: desktop ? 16 : 8,
        userSelect: 'none',
        width: width
      },

      menuItem: {
        transition: Transitions.easeOut(null, 'opacity'),
        transitionDelay: open ? '400ms' : '0ms',
        opacity: open ? 1 : 0
      },

      paper: {
        transition: Transitions.easeOut(null, ['transform', 'opacity']),
        transitionDuration: open ? '500ms' : '200ms',
        transform: open ? 'scaleY(1) translate3d(0,0,0)' : 'scaleY(0) translate3d(0,-8px,0)',
        transformOrigin: openDown ? 'top' : 'bottom',
        opacity: open ? 1 : 0,
        maxHeight: maxHeight,
        overflowY: maxHeight ? 'scroll' : null
      },

      selectedMenuItem: {
        color: this.context.muiTheme.palette.accent1Color
      }
    };

    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    let mergedListStyles = this.mergeStyles(styles.list, listStyle);

    //Cascade children opacity
    let cumulativeDelay = openDown ? 175 : 325;
    let cascadeChildrenCount = this._getCascadeChildrenCount();
    let cumulativeDelayIncrement = Math.ceil(150/cascadeChildrenCount);

    let menuItemIndex = 0;
    let newChildren = React.Children.map(children, (child) => {

      let childIsADivider = child.type.displayName === 'MenuDivider';
      let focusIndex = this.state.focusIndex;
      let transitionDelay = 0;

      //Only cascade the visible menu items
      if (open && (menuItemIndex >= focusIndex - 1) &&
        (menuItemIndex <= focusIndex + cascadeChildrenCount - 1)) {
        cumulativeDelay = openDown ?
          cumulativeDelay + cumulativeDelayIncrement :
          cumulativeDelay - cumulativeDelayIncrement;
        transitionDelay = cumulativeDelay;
      }

      let childrenContainerStyles = this.mergeStyles(styles.menuItem, {
        transitionDelay: transitionDelay + 'ms'
      });

      let clonedChild = childIsADivider ? child :
        this._cloneMenuItem(child, menuItemIndex, styles);

      if (!childIsADivider) menuItemIndex++;

      return <div style={childrenContainerStyles}>{clonedChild}</div>;

    }.bind(this));

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
      isKeyboardFocused: keyboardFocused
    });
  },

  _cloneMenuItem(child, childIndex, styles) {

    let {
      desktop,
      multiple,
      open,
      selectedMenuItemStyle
    } = this.props;

    let selected = this._isChildSelected(child);
    let selectedChildrenStyles = {};

    if (selected) {
      selectedChildrenStyles = this.mergeStyles(styles.selectedMenuItem, selectedMenuItemStyle);
    }

    let mergedChildrenStyles = this.mergeStyles(
      child.props.style || {},
      selectedChildrenStyles
    );

    let isFocused = open && childIndex === this.state.focusIndex;
    let focusState = 'none';
    if (isFocused) {
      focusState = this.state.isKeyboardFocused ?
        'keyboard-focused' : 'focused';
    }

    return React.cloneElement(child, {
      desktop: desktop,
      focusState: focusState,
      onKeyboardActivate: (e) => {
        this.props.onItemKeyboardActivate(e, child);
        if (child.props.onKeyboardActivate) child.props.onKeyboardActivate(e);
      },
      onTouchTap: (e) => {
        this._handleMenuItemTouchTap(e, child);
        if (child.props.onTouchTap) child.props.onTouchTap(e);
      },
      ref: isFocused ? 'focusedMenuItem' : null,
      style: mergedChildrenStyles,
      tabIndex: open ? child.props.tabIndex : -1
    });
  },

  _decrementKeyboardFocusIndex() {
    let index = this.state.focusIndex;

    index--;
    if (index < 0) index = 0;

    this._setFocusIndex(index, true);
  },

  _getCascadeChildrenCount() {
    let {
      children,
      desktop,
      maxHeight
    } = this.props;
    let count = 1;
    let currentHeight = desktop ? 16 : 8;
    let menuItemHeight = desktop ? 32 : 48;

    //MaxHeight isn't set - cascade all of the children
    if (!maxHeight) return React.Children.count(children);

    //Count all the children that will fit inside the
    //max menu height
    React.Children.forEach(children, (child) => {
      if (currentHeight < maxHeight) {
        let childIsADivider = child.type.displayName === 'MenuDivider';

        currentHeight += childIsADivider ? 16 : menuItemHeight;
        count++;
      }
    });

    return count;

  },

  _getMenuItemCount() {
    let dividerCount = 0;
    React.Children.forEach(this.props.children, (child) => {
      if (child.type.displayName === 'MenuDivider') {
        dividerCount++;
      }
    });
    return React.Children.count(this.props.children) - dividerCount;
  },

  _getSelectedIndex() {
    let {
      children
    } = this.props;
    let selectedIndex = -1;
    let menuItemIndex = 0;

    React.Children.forEach(children, (child, index) => {
      let childIsADivider = child.type.displayName === 'MenuDivider';

      if (this._isChildSelected(child)) selectedIndex = menuItemIndex;
      if (!childIsADivider) menuItemIndex++;
    }.bind(this));

    return selectedIndex;
  },

  _handleKeyDown(e) {
    if (this.props.open) {
      switch (e.keyCode) {
        case KeyCode.UP:
          this._decrementKeyboardFocusIndex();
          break;
        case KeyCode.DOWN:
          this._incrementKeyboardFocusIndex();
          break;
        case KeyCode.TAB:
          if (e.shiftKey) {
            this._decrementKeyboardFocusIndex();
          } else {
            this._incrementKeyboardFocusIndex();
          }
          break;
      }
      e.preventDefault();
    }
  },

  _handleMenuItemTouchTap(e, item) {
    let multiple = this.props.multiple;
    let valueLink = this.getValueLink(this.props);
    let menuValue = valueLink.value;
    let itemValue = item.props.value;

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

  _incrementKeyboardFocusIndex() {
    let index = this.state.focusIndex;
    let maxIndex = this._getMenuItemCount() - 1;

    index++;
    if (index > maxIndex) index = maxIndex;

    this._setFocusIndex(index, true);
  },

  _isChildSelected(child) {
    let multiple = this.props.multiple;
    let menuValue = this.getValueLink(this.props).value;
    let childValue = child.props.value;

    return (multiple && menuValue.length && menuValue.indexOf(childValue) !== -1) ||
      (!multiple && menuValue && menuValue === childValue);
  },

  _setFocusIndex(newIndex, isKeyboardFocused) {
    this.setState({
      focusIndex: newIndex,
      isKeyboardFocused: isKeyboardFocused
    });
  },

  _setScollPosition() {
    let desktop = this.props.desktop;
    let focusedMenuItem = this.refs.focusedMenuItem;
    let menuItemHeight = desktop ? 32 : 48;

    if (focusedMenuItem) {
      let selectedOffSet = React.findDOMNode(focusedMenuItem).offsetTop;

      //Make the focused item be the 2nd item in the list the
      //user sees
      let scrollTop = selectedOffSet - menuItemHeight;
      if (scrollTop < menuItemHeight) scrollTop = 0;

      React.findDOMNode(this.refs.scrollContainer).scrollTop = scrollTop;
    }
  },

  _setWidth() {
    let el = React.findDOMNode(this);
    let listEl = React.findDOMNode(this.refs.list);
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
  }

});

module.exports = Menu;
