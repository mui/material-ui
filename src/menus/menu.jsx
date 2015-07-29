let React = require('react/addons');
let update = React.addons.update;
let Controllable = require('../mixins/controllable');
let StylePropable = require('../mixins/style-propable');
let AutoPrefix = require('../styles/auto-prefix');
let Transitions = require('../styles/transitions');
let KeyCode = require('../utils/key-code');
let PropTypes = require('../utils/prop-types');
let List = require('../lists/list');
let Paper = require('../paper');


let Menu = React.createClass({

  mixins: [StylePropable, Controllable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    animated: React.PropTypes.bool,
    autoWidth: React.PropTypes.bool,
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

  getInitialState() {
    let selectedIndex = this._getSelectedIndex(this.props);

    return {
      focusIndex: selectedIndex >= 0 ? selectedIndex : 0,
      isKeyboardFocused: this.props.initiallyKeyboardFocused,
      keyWidth: this.props.desktop ? 64 : 56,
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
    let rootStyle = React.findDOMNode(this).style;

    AutoPrefix.set(rootStyle, 'transition', Transitions.easeOut('250ms', ['opacity', 'transform']));
    AutoPrefix.set(rootStyle, 'transform', 'translate3d(0,-8px,0)');
    rootStyle.opacity = 0;

    setTimeout(callback, 250);
  },

  componentWillReceiveProps(nextProps) {
    let selectedIndex = this._getSelectedIndex(nextProps);

    this.setState({
      focusIndex: selectedIndex >= 0 ? selectedIndex : 0,
      keyWidth: nextProps.desktop ? 64 : 56,
    });
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

    let styles = {
      root: {
        //Nested div bacause the List scales x faster than
        //it scales y
        transition: animated ? Transitions.easeOut('250ms', 'transform') : null,
        position: 'absolute',
        zIndex: 10,
        top: openDown ? 0 : null,
        bottom: !openDown ? 0 : null,
        left: !openLeft ? 0 : null,
        right: openLeft ? 0 : null,
        transform: 'scaleX(0)',
        transformOrigin: openLeft ? 'right' : 'left',
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
        overflowY: maxHeight ? 'scroll' : null,
      },

      selectedMenuItem: {
        color: this.context.muiTheme.palette.accent1Color,
      },
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

        childrenContainerStyles = this.mergeAndPrefix(styles.menuItemContainer, {
          transitionDelay: transitionDelay + 'ms',
        });
      }

      let clonedChild = childIsADivider ? child :
        childIsDisabled ? React.cloneElement(child, {desktop: desktop}) :
        this._cloneMenuItem(child, menuItemIndex, styles);

      if (!childIsADivider && !childIsDisabled) menuItemIndex++;

      return animated ? (
        <div style={childrenContainerStyles}>{clonedChild}</div>
      ) : clonedChild;

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
      isKeyboardFocused: keyboardFocused,
    });
  },

  _animateOpen() {
    let rootStyle = React.findDOMNode(this).style;
    let scrollContainerStyle = React.findDOMNode(this.refs.scrollContainer).style;
    let menuContainers = React.findDOMNode(this.refs.list).childNodes;

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
      selectedChildrenStyles,
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

  _getCascadeChildrenCount() {
    let {
      children,
      desktop,
      maxHeight,
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
    let menuItemCount = 0;
    React.Children.forEach(this.props.children, (child) => {
      let childIsADivider = child.type.displayName === 'MenuDivider';
      let childIsDisabled = child.props.disabled;
      if (!childIsADivider && !childIsDisabled) menuItemCount++;
    });
    return menuItemCount;
  },

  _getSelectedIndex(props) {
    let {
      children,
    } = props;
    let selectedIndex = -1;
    let menuItemIndex = 0;

    React.Children.forEach(children, (child) => {
      let childIsADivider = child.type.displayName === 'MenuDivider';

      if (this._isChildSelected(child, props)) selectedIndex = menuItemIndex;
      if (!childIsADivider) menuItemIndex++;
    }.bind(this));

    return selectedIndex;
  },

  _handleKeyDown(e) {
    switch (e.keyCode) {
      case KeyCode.DOWN:
        e.preventDefault();
        this._incrementKeyboardFocusIndex();
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
          this._incrementKeyboardFocusIndex();
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
    }
    else if (!multiple && itemValue !== menuValue) {
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
  },

});

module.exports = Menu;
