var React = require('react');
var CssEvent = require('../utils/css-event');
var Dom = require('../utils/dom');
var KeyLine = require('../utils/key-line');
var KeyCode = require('../utils/key-code');
var StylePropable = require('../mixins/style-propable');
var Transitions = require('../styles/transitions');
var ClickAwayable = require('../mixins/click-awayable');
var Paper = require('../paper');
var MenuItem = require('./menu-item');
var LinkMenuItem = require('./link-menu-item');
var SubheaderMenuItem = require('./subheader-menu-item');
var WindowListenable = require('../mixins/window-listenable');

/***********************
* Nested Menu Component
***********************/
var NestedMenuItem = React.createClass({

  mixins: [ClickAwayable, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
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
  },

  getDefaultProps: function() {
    return {
      disabled: false
    };
  },

  getInitialState: function() {
    return {
      open: false ,
      activeIndex:0
    }
  },

  componentClickAway: function() {
    this._closeNestedMenu();
  },

  componentDidMount: function() {
    this._positionNestedMenu();
    var el = this.getDOMNode();
    el.focus();
  },

  componentDidUpdate: function() {
    this._positionNestedMenu();
  },

  getSpacing: function() {
    return this.context.muiTheme.spacing;
  },

  getStyles: function() {
    var styles = {
      root: {
        userSelect: 'none',
        cursor: 'pointer',
        lineHeight: this.getTheme().height + 'px',
        color: this.context.muiTheme.palette.textColor
      },
      icon: {
        float: 'left',
        lineHeight: this.getTheme().height + 'px',
        marginRight: this.getSpacing().desktopGutter
      },
      toggle: {
        marginTop: ((this.getTheme().height - this.context.muiTheme.component.radioButton.size) / 2),
        float: 'right',
        width: 42
      },
      rootWhenHovered: {
        backgroundColor: this.getTheme().hoverColor
      },
      rootWhenSelected: {
        color: this.getTheme().selectedTextColor
      },
      rootWhenDisabled: {
        cursor: 'default',
        color: this.context.muiTheme.palette.disabledColor
      }
    };
    return styles;
  },

  getTheme: function() {
    return this.context.muiTheme.component.menuItem;
  },

  render: function() {

    var styles = this.getStyles();
    styles = this.mergeAndPrefix(styles.root,
      (this.props.active && !this.props.disabled) && styles.rootWhenHovered, {
      position: 'relative'
    }, this.props.style);

    var iconCustomArrowDropRight = {
      marginRight: this.getSpacing().desktopGutterMini * -1,
      color: this.context.muiTheme.component.dropDownMenu.accentColor
    };

    var {
      index,
      menuItemStyle,
      ...other
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

  toggleNestedMenu: function() {
    if (!this.props.disabled) this.setState({ open: !this.state.open });
  },

  isOpen: function() {
    return this.state.open;
  },

  _positionNestedMenu: function() {
    var el = React.findDOMNode(this);
    var nestedMenu = React.findDOMNode(this.refs.nestedMenu);
    nestedMenu.style.left = el.offsetWidth + 'px';
  },

  _openNestedMenu: function() {
    if (!this.props.disabled) this.setState({ open: true });
  },

  _closeNestedMenu: function() {
    this.setState({ open: false });
    React.findDOMNode(this).focus();
  },

  _onParentItemTap: function() {
    this.toggleNestedMenu();
  },

  _onMenuItemTap: function(e, index, menuItem) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
    this._closeNestedMenu();
  },
  _handleMouseOver: function(e) {
    if (!this.props.disabled && this.props.onMouseOver) this.props.onMouseOver(e, this.props.index);
  },

  _handleMouseOut: function(e) {
    if (!this.props.disabled && this.props.onMouseOut) this.props.onMouseOut(e,this.props.index);
  }

});


/****************
* Menu Component
****************/
var Menu = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    autoWidth: React.PropTypes.bool,
    onItemTap: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    onRequestClose: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
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

  getInitialState: function() {
    return {
      nestedMenuShown: false,
      activeIndex:0
    }
  },

  getDefaultProps: function() {
    return {
      autoWidth: true,
      hideable: false,
      visible: true,
      zDepth: 1,
      onRequestClose: function() {}
    };
  },

  componentDidMount: function() {
    var el = React.findDOMNode(this);

    //Set the menu width
    this._setKeyWidth(el);

    //Save the initial menu item height for later
    this._initialMenuItemHeight = el.offsetHeight / Math.max(1, this.props.menuItems.length);

    //Show or Hide the menu according to visibility
    this._renderVisibility();
  },

  componentDidUpdate: function(prevProps) {
    if (this.props.visible !== prevProps.visible) this._renderVisibility();
  },

  getTheme: function() {
    return this.context.muiTheme.component.menu
  },

  getSpacing: function() {
    return this.context.muiTheme.spacing;
  },

  getStyles: function() {
    var styles = {
      root: {
        backgroundColor: this.getTheme().containerBackgroundColor,
        paddingTop: this.getSpacing().desktopGutterMini,
        paddingBottom: this.getSpacing().desktopGutterMini,
        transition: Transitions.easeOut(null, 'height'),
        outline:'none !important'
      },
      subheader: {
        paddingLeft: this.context.muiTheme.component.menuSubheader.padding,
        paddingRight: this.context.muiTheme.component.menuSubheader.padding
      },
      hideable: {
        opacity: (this.props.visible) ? 1 : 0,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        zIndex: 1
      }
    };
    return styles;
  },

  render: function() {
    var styles = this.getStyles();
    return (
      <Paper
        ref="paperContainer"
        tabIndex='0'
        onKeyDown={this._onKeyDown}
        zDepth={this.props.zDepth}
        style={this.mergeAndPrefix(
          styles.root,
          this.props.hideable && styles.hideable,
          this.props.style)}>
        {this._getChildren()}
      </Paper>
    );
  },

  _getChildren: function() {
    var  menuItem,
      itemComponent,
      isSelected,
      isDisabled;

    var styles = this.getStyles();

    this._children = [];
    //This array is used to keep track of all nested menu refs
    this._nestedChildren = [];

    for (var i=0; i < this.props.menuItems.length; i++) {
      menuItem = this.props.menuItems[i];
      isSelected = i === this.props.selectedIndex;
      isDisabled = (menuItem.disabled === undefined) ? false : menuItem.disabled;

      let {
        icon,
        data,
        attribute,
        number,
        toggle,
        onTouchTap,
        ...other
      } = menuItem;

      switch (menuItem.type) {

        case MenuItem.Types.LINK:
          itemComponent = (
            <LinkMenuItem
              key={i}
              index={i}
              active={this.state.activeIndex == i}
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
              style={this.mergeAndPrefix(styles.subheader)}
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
            ...other
          } = this.props;

          itemComponent = (
            <NestedMenuItem
              {...other}
              ref={i}
              key={i}
              index={i}
              nested={true}
              active={this.state.activeIndex == i}
              text={menuItem.text}
              disabled={isDisabled}
              menuItems={menuItem.items}
              menuItemStyle={this.props.menuItemStyle}
              zDepth={this.props.zDepth}
              onMouseOver={this._onItemActivated}
              onMouseOut={this._onItemDeactivated}
              onItemTap={this._onNestedItemTap} />
          );
          this._nestedChildren.push(i);
          break;

        default:
          itemComponent = (
            <MenuItem
              {...other}
              selected={isSelected}
              key={i}
              index={i}
              active={this.state.activeIndex == i}
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
              onMouseOver={this._onItemActivated}
              onMouseOut={this._onItemDeactivated}
              >
              {menuItem.text}
            </MenuItem>
          );
      }
      this._children.push(itemComponent);
    }

    return this._children;
  },

  _setKeyWidth: function(el) {
    var menuWidth = this.props.autoWidth ?
      KeyLine.getIncrementalDim(el.offsetWidth) + 'px' :
      '100%';

    //Update the menu width
    Dom.withoutTransition(el, function() {
      el.style.width = menuWidth;
    });
  },

  _getCurrentHeight: function() {
    var totalItens = Math.max(1, this.props.menuItems.length);
    var newHeight = this._initialMenuItemHeight * totalItens;

    return newHeight;
  },

  _renderVisibility: function() {
    var el;

    if (this.props.hideable) {
      el = React.findDOMNode(this);
      var container = React.findDOMNode(this.refs.paperContainer);

      if (this.props.visible) {
        //Open the menu
        el.style.transition = Transitions.easeOut();
        el.style.height = this._getCurrentHeight() + 'px';

        //Set the overflow to visible after the animation is done so
        //that other nested menus can be shown
        CssEvent.onTransitionEnd(el, function() {
          //Make sure the menu is open before setting the overflow.
          //This is to accout for fast clicks
          if (this.props.visible) container.style.overflow = 'visible';
          el.focus();
        }.bind(this));

      } else {

        //Close the menu
        el.style.height = '0px';

        //Set the overflow to hidden so that animation works properly
        container.style.overflow = 'hidden';
      }
    }
  },

  _onNestedItemTap: function(e, index, menuItem) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
  },

  _onItemTap: function(e, index) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, this.props.menuItems[index]);
  },

  _onItemToggle: function(e, index, toggled) {
    if (this.props.onItemToggle) this.props.onItemToggle(e, index, this.props.menuItems[index], toggled);
  },
  _onItemActivated: function(e, index) {
    this.setState({activeIndex:index})
  },
  _onItemDeactivated: function(e, index) {
    if (this.state.activeKey == index)
      this.setState({activeIndex:0})
  },

  _onKeyDown: function(e) {
    if (!(this.state.open || this.props.visible))
      return;

    var nested = this._children[this.state.activeIndex];
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

  _activatePreviousItem:function() {
    var active = this.state.activeIndex || 0;
    active = Math.max(active - 1, 0);
    this.setState({activeIndex:active});
  },

  _activateNextItem: function() {
    var active = this.state.activeIndex || 0;
    active = Math.min(active+1, this._children.length -1);
    this.setState({activeIndex:active});
  },

  _triggerSelection: function(e) {
    var index = this.state.activeIndex || 0;
    this._onItemTap(e, index)
  },

  _close: function() {
    this.props.onRequestClose();
  },

  _tryToggleNested: function(index) {
    var item = this.refs[index];
    var toggleMenu = item.toggleNestedMenu;
    if (item && item.toggleNestedMenu)
      item.toggleNestedMenu();
  },

});

module.exports = Menu;
