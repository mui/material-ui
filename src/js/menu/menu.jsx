var React = require('react');
var CssEvent = require('../utils/css-event');
var Dom = require('../utils/dom');
var KeyLine = require('../utils/key-line');
var Classable = require('../mixins/classable');
var StylePropable = require('../mixins/style-propable');
var Transitions = require('../styles/mixins/transitions');
var CustomVariables = require('../styles/variables/custom-variables');
var ClickAwayable = require('../mixins/click-awayable');
var Paper = require('../paper');
var MenuItem = require('./menu-item');
var LinkMenuItem = require('./link-menu-item');
var SubheaderMenuItem = require('./subheader-menu-item');

/***********************
* Nested Menu Component
***********************/
var NestedMenuItem = React.createClass({

  mixins: [Classable, ClickAwayable, StylePropable],

  propTypes: {
    index: React.PropTypes.number.isRequired,
    text: React.PropTypes.string,
    menuItems: React.PropTypes.array.isRequired,
    zDepth: React.PropTypes.number,
    disabled: React.PropTypes.bool,
    onItemClick: React.PropTypes.func,
    onItemTap: React.PropTypes.func,
    menuItemStyle: React.PropTypes.object,
  },
  
  getDefaultProps: function() {
    return {
      disabled: false
    };
  },

  getInitialState: function() {
    return { open: false }
  },

  componentClickAway: function() {
    this.setState({ open: false });
  },

  componentDidMount: function() {
    this._positionNestedMenu();
  },

  componentDidUpdate: function(prevProps, prevState) {
    this._positionNestedMenu();
  },

  render: function() {
    var styles = this.mergeStyles({
      position: 'relative',
    });

    var iconCustomArrowDropRight = {
      marginRight: CustomVariables.spacing.desktopGutterMini * -1,
      color: CustomVariables.dropDownMenuIconColor
    }

    var {
      index,
      menuItemStyle,
      ...other,
    } = this.props;

    return (
      <div style={styles}>
        <MenuItem 
          index={index}
          style={menuItemStyle}
          iconRightStyle={iconCustomArrowDropRight} 
          iconRightClassName="muidocs-icon-custom-arrow-drop-right" 
          onClick={this._onParentItemClick}>
            {this.props.text}
        </MenuItem>
        <Menu {...other}
          ref="nestedMenu"
          menuItems={this.props.menuItems}
          onItemClick={this._onMenuItemClick}
          onItemTap={this._onMenuItemTap}
          hideable={true}
          visible={this.state.open}
          zDepth={this.props.zDepth + 1} />
      </div>
    );
  },

  _positionNestedMenu: function() {
    var el = this.getDOMNode();
    var nestedMenu = this.refs.nestedMenu.getDOMNode();
    nestedMenu.style.left = el.offsetWidth + 'px';
  },

  _onParentItemClick: function() {
    if (!this.props.disabled) this.setState({ open: !this.state.open });
  },

  _onMenuItemClick: function(e, index, menuItem) {
    if (this.props.onItemClick) this.props.onItemClick(e, index, menuItem);
    this.setState({ open: false });
  },
  
  _onMenuItemTap: function(e, index, menuItem) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
    this.setState({ open: false });
  }

});


/****************
* Menu Component
****************/
var Menu = React.createClass({

  mixins: [Classable, StylePropable],

  propTypes: {
    autoWidth: React.PropTypes.bool,
    onItemTap: React.PropTypes.func,
    onItemClick: React.PropTypes.func,
    onToggleClick: React.PropTypes.func,
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
    return { nestedMenuShown: false }
  },

  getDefaultProps: function() {
    return {
      autoWidth: true,
      hideable: false,
      visible: true,
      zDepth: 1,
    };
  },

  componentDidMount: function() {
    var el = this.getDOMNode();

    //Set the menu with
    this._setKeyWidth(el);

    //Save the initial menu height for later
    this._initialMenuHeight = el.offsetHeight + KeyLine.Desktop.GUTTER_LESS;

    //Show or Hide the menu according to visibility
    this._renderVisibility();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.visible !== prevProps.visible) this._renderVisibility();
  },


  /** Styles */
  _hideable: function() {
    return {
      opacity: (this.props.visible) ? 1 : 0,
      position: 'absolute',
      top: 0,
      zIndex: 1,
    }
  },

  // Main Style
  _paperContainer: function() {
    var styles = {
      paddingTop: CustomVariables.spacing.desktopGutterMini,
      paddingBottom: CustomVariables.spacing.desktopGutterMini,
      backgroundColor: CustomVariables.menuBackgroundColor,
      transition: Transitions.easeOut(null, 'height'),
    };

    if (this.props.hideable) {
     this.mergeStyles(styles, {
      overflow: 'hidden',
      padding: 0,
      });
    }

    return this.mergeAndPrefix(styles);
  },

  _subheader: function() {
    return this.mergeAndPrefix({
      paddingLeft: CustomVariables.menuSubheaderPadding,
      paddingRight: CustomVariables.menuSubheaderPadding,
    }, this.props.menuItemStyleSubheader);
  },

  render: function() {
    var styles = this._paperContainer();
    if (this.props.hideable) styles = this.mergeStyles(styles, this._hideable());

    return (
      <Paper ref="paperContainer" zDepth={this.props.zDepth} style={styles}>
        {this._getChildren()}
      </Paper>
    );
  },

  _getChildren: function() {
    var children = [],
      menuItem,
      itemComponent,
      isSelected,
      isDisabled;

    //This array is used to keep track of all nested menu refs
    this._nestedChildren = [];

    for (var i=0; i < this.props.menuItems.length; i++) {
      menuItem = this.props.menuItems[i];
      isSelected = i === this.props.selectedIndex;
      isDisabled = (menuItem.disabled === undefined) ? false : menuItem.disabled;

      var {
        icon,
        data,
        attribute,
        number,
        toggle,
        onClick,
        ...other
      } = menuItem;

      switch (menuItem.type) {

        case MenuItem.Types.LINK:
          itemComponent = (
            <LinkMenuItem 
              key={i}
              index={i}
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
              style={this._subheader()}
              firstChild={i == 0}
              text={menuItem.text} />
          );
          break;

        case MenuItem.Types.NESTED:
          var {
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
              text={menuItem.text}
              disabled={isDisabled}
              menuItems={menuItem.items}
              menuItemStyle={this.props.menuItemStyle}
              zDepth={this.props.zDepth}
              onItemClick={this._onNestedItemClick}
              onItemTap={this._onNestedItemClick} />
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
              icon={menuItem.icon}
              data={menuItem.data}
              className={this.props.menuItemClassName}
              style={this.props.menuItemStyle}
              attribute={menuItem.attribute}
              number={menuItem.number}
              toggle={menuItem.toggle}
              disabled={isDisabled}
              onClick={this._onItemClick}
              onTouchTap={this._onItemTap}>
              {menuItem.text}
            </MenuItem>
          );
      }
      children.push(itemComponent);
    }

    return children;
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

  _renderVisibility: function() {
    var el;

    if (this.props.hideable) {    
      el = this.getDOMNode();
      var innerContainer = this.refs.paperContainer.getInnerContainer().getDOMNode();
      
      if (this.props.visible) {
        //Open the menu
        el.style.transition = Transitions.easeOut();
        el.style.height = this._initialMenuHeight + 'px';

        //Set the overflow to visible after the animation is done so
        //that other nested menus can be shown
        CssEvent.onTransitionEnd(el, function() {
          //Make sure the menu is open before setting the overflow.
          //This is to accout for fast clicks
          if (this.props.visible) innerContainer.style.overflow = 'visible';
        }.bind(this));

      } else {

        //Close the menu
        el.style.height = '0px';

        //Set the overflow to hidden so that animation works properly
        innerContainer.style.overflow = 'hidden';
      }
    }
  },

  _onNestedItemClick: function(e, index, menuItem) {
    if (this.props.onItemClick) this.props.onItemClick(e, index, menuItem);
  },

  _onNestedItemTap: function(e, index, menuItem) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
  },

  _onItemClick: function(e, index) {
    if (this.props.onItemClick) this.props.onItemClick(e, index, this.props.menuItems[index]);
  },

  _onItemTap: function(e, index) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, this.props.menuItems[index]);
  },

  _onItemToggle: function(e, index, toggled) {
    if (this.props.onItemToggle) this.props.onItemToggle(e, index, this.props.menuItems[index], toggled);
  }

});

module.exports = Menu;
