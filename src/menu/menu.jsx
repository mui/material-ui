const React = require('react');
const ReactDOM = require('react-dom');
const CssEvent = require('../utils/css-event');
const KeyLine = require('../utils/key-line');
const KeyCode = require('../utils/key-code');
const StylePropable = require('../mixins/style-propable');
const Transitions = require('../styles/transitions');
const ClickAwayable = require('../mixins/click-awayable');
const Paper = require('../paper');
const MenuItem = require('./menu-item');
const LinkMenuItem = require('./link-menu-item');
const SubheaderMenuItem = require('./subheader-menu-item');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

/***********************
* Nested Menu Component
***********************/
const NestedMenuItem = React.createClass({

  mixins: [ClickAwayable, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    index: React.PropTypes.number.isRequired,
    text: React.PropTypes.string,
    menuItems: React.PropTypes.array.isRequired,
    zDepth: React.PropTypes.number,
    disabled: React.PropTypes.bool,
    active: React.PropTypes.bool,
    onItemTap: React.PropTypes.func,
    menuItemStyle: React.PropTypes.object,
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      disabled: false,
    };
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      open: false,
      activeIndex: 0,
    };
  },

  componentClickAway() {
    this._closeNestedMenu();
  },

  componentDidMount() {
    this._positionNestedMenu();
    ReactDOM.findDOMNode(this).focus();
  },

  componentDidUpdate() {
    this._positionNestedMenu();
  },

  getSpacing() {
    return this.state.muiTheme.rawTheme.spacing;
  },

  getStyles() {
    let styles = {
      root: {
        userSelect: 'none',
        cursor: 'pointer',
        lineHeight: this.getTheme().height + 'px',
        color: this.state.muiTheme.rawTheme.palette.textColor,
      },
      icon: {
        float: 'left',
        lineHeight: this.getTheme().height + 'px',
        marginRight: this.getSpacing().desktopGutter,
      },
      toggle: {
        marginTop: ((this.getTheme().height - this.state.muiTheme.radioButton.size) / 2),
        float: 'right',
        width: 42,
      },
      rootWhenHovered: {
        backgroundColor: this.getTheme().hoverColor,
      },
      rootWhenSelected: {
        color: this.getTheme().selectedTextColor,
      },
      rootWhenDisabled: {
        cursor: 'default',
        color: this.state.muiTheme.rawTheme.palette.disabledColor,
      },
    };

    return styles;
  },

  getTheme() {
    return this.state.muiTheme.menuItem;
  },

  render() {
    let styles = this.getStyles();
    styles = this.prepareStyles(styles.root,
      (this.props.active && !this.props.disabled) && styles.rootWhenHovered, {
      position: 'relative',
    }, this.props.style);

    let iconCustomArrowDropRight = {
      marginRight: this.getSpacing().desktopGutterMini * -1,
      color: this.state.muiTheme.dropDownMenu.accentColor,
    };

    let {
      index,
      menuItemStyle,
      ...other,
    } = this.props;

    return (
      <div
          ref="root"
          style={styles}
          onMouseEnter={this._openNestedMenu}
          onMouseLeave={this._closeNestedMenu}
          onMouseOver={this._handleMouseOver}
          onMouseOut={this._handleMouseOut}>
        <MenuItem
          index={index}
          style={menuItemStyle}
          disabled={this.props.disabled}
          iconRightStyle={iconCustomArrowDropRight}
          iconRightClassName="muidocs-icon-custom-arrow-drop-right"
          onTouchTap={this._onParentItemTap}>
            {this.props.text}
        </MenuItem>
        <Menu {...other}
          ref="nestedMenu"
          menuItems={this.props.menuItems}
          menuItemStyle={menuItemStyle}
          onItemTap={this._onMenuItemTap}
          hideable={true}
          visible={this.state.open}
          onRequestClose={this._closeNestedMenu}
          zDepth={this.props.zDepth + 1} />
      </div>
    );
  },

  toggleNestedMenu() {
    if (!this.props.disabled) this.setState({ open: !this.state.open });
  },

  isOpen() {
    return this.state.open;
  },

  _positionNestedMenu() {
    let el = ReactDOM.findDOMNode(this);
    let nestedMenu = ReactDOM.findDOMNode(this.refs.nestedMenu);
    nestedMenu.style.left = el.offsetWidth + 'px';
  },

  _openNestedMenu() {
    if (!this.props.disabled) this.setState({ open: true });
  },

  _closeNestedMenu() {
    this.setState({ open: false });
    ReactDOM.findDOMNode(this).focus();
  },

  _onParentItemTap() {
    this.toggleNestedMenu();
  },

  _onMenuItemTap(e, index, menuItem) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
    this._closeNestedMenu();
  },
  _handleMouseOver(e) {
    if (!this.props.disabled && this.props.onMouseOver) this.props.onMouseOver(e, this.props.index);
  },

  _handleMouseOut(e) {
    if (!this.props.disabled && this.props.onMouseOut) this.props.onMouseOut(e, this.props.index);
  },

});


/****************
* Menu Component
****************/
const Menu = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    autoWidth: React.PropTypes.bool,
    onItemTap: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    onRequestClose: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    style: React.PropTypes.object,
    hideable: React.PropTypes.bool,
    visible: React.PropTypes.bool,
    zDepth: React.PropTypes.number,
    menuItemStyle: React.PropTypes.object,
    menuItemStyleSubheader: React.PropTypes.object,
    menuItemStyleLink: React.PropTypes.object,
    menuItemClassName: React.PropTypes.string,
    menuItemClassNameSubheader: React.PropTypes.string,
    menuItemClassNameLink: React.PropTypes.string,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      nestedMenuShown: false,
      activeIndex: 0,
    };
  },

  getDefaultProps() {
    return {
      autoWidth: true,
      hideable: false,
      visible: true,
      zDepth: 1,
      onRequestClose: () => {},
    };
  },

  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);

    //Set the menu width
    this._setKeyWidth(el);

    //Show or Hide the menu according to visibility
    this._renderVisibility();
  },

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible || this.props.menuItems.length !== prevProps.menuItems.length) {
      this._renderVisibility();
    }
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

    //Set the menu width
    this._setKeyWidth(ReactDOM.findDOMNode(this));
  },

  getTheme() {
    return this.state.muiTheme.menu;
  },

  getSpacing() {
    return this.state.muiTheme.rawTheme.spacing;
  },

  getStyles() {
    let styles = {
      root: {
        backgroundColor: this.getTheme().containerBackgroundColor,
        paddingTop: this.getSpacing().desktopGutterMini,
        paddingBottom: this.getSpacing().desktopGutterMini,
        transition: Transitions.easeOut(null, 'height'),
        outline:'none !important',
      },
      subheader: {
        paddingLeft: this.state.muiTheme.menuSubheader.padding,
        paddingRight: this.state.muiTheme.menuSubheader.padding,
      },
      hideable: {
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        zIndex: 1,
      },
      item: {
        height: 34,
      },
    };

    return styles;
  },

  render() {
    let styles = this.getStyles();
    return (
      <Paper
        ref="paperContainer"
        tabIndex="0"
        onKeyDown={this._onKeyDown}
        zDepth={this.props.zDepth}
        style={this.mergeStyles(
          styles.root,
          this.props.hideable && styles.hideable,
          this.props.style)}>
        {this._getChildren()}
      </Paper>
    );
  },

  _getChildren() {
    let menuItem,
      itemComponent,
      isDisabled;

    let styles = this.getStyles();

    this._children = [];
    //This array is used to keep track of all nested menu refs
    this._nestedChildren = [];

    for (let i=0; i < this.props.menuItems.length; i++) {
      menuItem = this.props.menuItems[i];
      isDisabled = (menuItem.disabled === undefined) ? false : menuItem.disabled;

      let {
        icon,
        data,
        attribute,
        number,
        toggle,
        onTouchTap,
        ...other,
      } = menuItem;

      switch (menuItem.type) {

        case MenuItem.Types.LINK:
          itemComponent = (
            <LinkMenuItem
              key={i}
              index={i}
              active={this.state.activeIndex === i}
              text={menuItem.text}
              disabled={isDisabled}
              className={this.props.menuItemClassNameLink}
              style={this.props.menuItemStyleLink}
              payload={menuItem.payload}
              target={menuItem.target}/>
          );
          break;

        case MenuItem.Types.SUBHEADER:
          itemComponent = (
            <SubheaderMenuItem
              key={i}
              index={i}
              className={this.props.menuItemClassNameSubheader}
              style={this.mergeStyles(styles.subheader, this.props.menuItemStyleSubheader)}
              firstChild={i === 0}
              text={menuItem.text} />
          );
          break;

        case MenuItem.Types.NESTED:
          let {
            ref,
            key,
            index,
            zDepth,
            ...other,
          } = this.props;

          itemComponent = (
            <NestedMenuItem
              {...other}
              ref={i}
              key={i}
              index={i}
              nested={true}
              active={this.state.activeIndex === i}
              text={menuItem.text}
              disabled={isDisabled}
              menuItems={menuItem.items}
              menuItemStyle={this.props.menuItemStyle}
              zDepth={this.props.zDepth}
              onMouseEnter={this._onItemActivated}
              onMouseLeave={this._onItemDeactivated}
              onItemTap={this._onNestedItemTap} />
          );
          this._nestedChildren.push(i);
          break;

        default:
          itemComponent = (
            <MenuItem
              {...other}
              selected={this.props.selectedIndex === i}
              key={i}
              index={i}
              active={this.state.activeIndex === i}
              icon={menuItem.icon}
              data={menuItem.data}
              className={this.props.menuItemClassName}
              style={this.props.menuItemStyle}
              attribute={menuItem.attribute}
              number={menuItem.number}
              toggle={menuItem.toggle}
              onToggle={this.props.onToggle}
              disabled={isDisabled}
              onTouchTap={this._onItemTap}
              onMouseEnter={this._onItemActivated}
              onMouseLeave={this._onItemDeactivated}
              >
              {menuItem.text}
            </MenuItem>
          );
      }
      this._children.push(itemComponent);
    }

    return this._children;
  },

  _setKeyWidth(el) {
    //Update the menu width
    let menuWidth = '100%';

    if (this.props.autoWidth) {
      el.style.width = 'auto';
      menuWidth = KeyLine.getIncrementalDim(el.offsetWidth) + 'px';
    }

    el.style.width = menuWidth;
  },

  _renderVisibility() {
    if (this.props.hideable) {
      if (this.props.visible) this._expandHideableMenu();
      else this._collapseHideableMenu();
    }
  },

  _expandHideableMenu() {
    let el = ReactDOM.findDOMNode(this);
    let container = ReactDOM.findDOMNode(this.refs.paperContainer);
    let padding = this.getSpacing().desktopGutterMini;
    let height = this._getHiddenMenuHeight(el, padding);

    //Add transition
    if (!el.style.transition) {
      el.style.transition = Transitions.easeOut();
    }

    this._nextAnimationFrame(() => {
      container.style.overflow = 'hidden';

      // Yeild to the DOM, then apply height and padding. This makes the transition smoother.
      el.style.paddingTop = padding + 'px';
      el.style.paddingBottom = padding + 'px';
      el.style.height = height + 'px';
      el.style.opacity = 1;

      //Set the overflow to visible after the animation is done so
      //that other nested menus can be shown
      CssEvent.onTransitionEnd(el, () => {
        //Make sure the menu is open before setting the overflow.
        //This is to accout for fast clicks
        if (this.props.visible) container.style.overflow = 'visible';
        el.style.transition = null;
        el.focus();
      });
    });
  },

  _getHiddenMenuHeight(el, padding) {
    //Add padding to the offset height, because it is not yet set in the style.
    let height = padding * 2;

    //Hide the element and allow the browser to automatically resize it.
    el.style.visibility = 'hidden';
    el.style.height = 'auto';

    //Determine the height of the menu.
    height += el.offsetHeight;

    //Unhide the menu with the height set back to zero.
    el.style.height = '0px';
    el.style.visibility = 'visible';

    return height;
  },

  _collapseHideableMenu() {
    let el = ReactDOM.findDOMNode(this);
    let container = ReactDOM.findDOMNode(this.refs.paperContainer);
    let originalOpacity = el.style.opacity;

    //Add transition
    if (!el.style.transition && originalOpacity !== '') {
      el.style.transition = Transitions.easeOut();
    }

    this._nextAnimationFrame(function () {
      //Set the overflow to hidden so that animation works properly
      container.style.overflow = 'hidden';

      //Close the menu
      el.style.opacity = 0;
      el.style.height = '0px';
      el.style.paddingTop = '0px';
      el.style.paddingBottom = '0px';

      let end = () => {
        el.style.transition = null;
      };

      if (originalOpacity === '') end();
      else CssEvent.onTransitionEnd(el, end);
    });
  },

  _nextAnimationFrame(func) {
    if (window.requestAnimationFrame) {
      return window.requestAnimationFrame(func);
    }
    return setTimeout(func, 16);
  },

  _onNestedItemTap(e, index, menuItem) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
  },

  _onItemTap(e, index) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, this.props.menuItems[index]);
  },

  _onItemToggle(e, index, toggled) {
    if (this.props.onItemToggle) this.props.onItemToggle(e, index, this.props.menuItems[index], toggled);
  },
  _onItemActivated(e, index) {
    this.setState({activeIndex: index});
  },
  _onItemDeactivated(e, index) {
    if (this.state.activeKey === index)
      this.setState({activeIndex: 0});
  },

  _onKeyDown(e) {
    if (!(this.state.open || this.props.visible))
      return;

    let nested = this._children[this.state.activeIndex];
    if (nested && nested.props.nested && this.refs[this.state.activeIndex].isOpen())
      return;

    switch(e.which) {
      case KeyCode.UP:
        this._activatePreviousItem();
        break;
      case KeyCode.DOWN:
        this._activateNextItem();
        break;
      case KeyCode.RIGHT:
        this._tryToggleNested(this.state.activeIndex);
        break;
      case KeyCode.LEFT:
        this._close();
        break;
      case KeyCode.ESC:
        this._close();
        break;
      case KeyCode.TAB:
        this._close();
        return; // so the tab key can propagate
      case KeyCode.ENTER:
      case KeyCode.SPACE:
        e.stopPropagation(); // needs called before the close
        this._triggerSelection(e);
        break;
      default:
        return; //important
    }
    e.preventDefault();
    e.stopPropagation();
  },

  _activatePreviousItem() {
    let active = this.state.activeIndex || 0;
    active = Math.max(active - 1, 0);
    this.setState({activeIndex:active});
  },

  _activateNextItem() {
    let active = this.state.activeIndex || 0;
    active = Math.min(active+1, this._children.length -1);
    this.setState({activeIndex:active});
  },

  _triggerSelection(e) {
    let index = this.state.activeIndex || 0;
    this._onItemTap(e, index);
  },

  _close() {
    this.props.onRequestClose();
  },

  _tryToggleNested(index) {
    let item = this.refs[index];
    if (item && item.toggleNestedMenu)
      item.toggleNestedMenu();
  },

});

module.exports = Menu;
