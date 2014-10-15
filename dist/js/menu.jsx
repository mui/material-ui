/**
 * @jsx React.DOM
 */

var $ = require('jquery'),
  React = require('react'),
  CssEvent = require('./utils/css-event.js'),
  KeyLine = require('./utils/key-line.js'),
	Classable = require('./mixins/classable.js'),
  ClickAwayable = require('./mixins/click-awayable'),
  Paper = require('./paper.jsx'),
  MenuItem = require('./menu-item.jsx');

/***********************
 * Nested Menu Component
 ***********************/
var NestedMenuItem = React.createClass({

  mixins: [Classable, ClickAwayable],

  propTypes: {
    key: React.PropTypes.number.isRequired,
    text: React.PropTypes.string,
    menuItems: React.PropTypes.array.isRequired,
    zDepth: React.PropTypes.number,
    onItemClick: React.PropTypes.func
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
    var classes = this.getClasses('mui-nested-menu-item', {
      'mui-open': this.state.open
    });

    return (
      <div className={classes}>
        <MenuItem key={this.props.key} iconRight="arrow-drop-right" onClick={this._onParentItemClick}>
          {this.props.text}
        </MenuItem>
        <Menu
          ref="nestedMenu"
          menuItems={this.props.menuItems}
          onItemClick={this._onMenuItemClick}
          hideable={true}
          visible={this.state.open}
          zDepth={this.props.zDepth + 1} />
      </div>
    );
  },

  _positionNestedMenu: function() {
    var $el = $(this.getDOMNode()),
      $nestedMenu = $(this.refs.nestedMenu.getDOMNode());
    $nestedMenu.css('left', $el.outerWidth());
  },

  _onParentItemClick: function() {
    this.setState({ open: !this.state.open });
  },

  _onMenuItemClick: function(e, key, menuItem) {
    this.setState({ open: false });
    if (this.props.onItemClick) this.props.onItemClick(e, key, menuItem);
  }

});

/****************
 * Menu Component
 ****************/
var Menu = React.createClass({

	mixins: [Classable],

	propTypes: {
    onItemClick: React.PropTypes.func,
    onToggleClick: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    hideable: React.PropTypes.bool,
    visible: React.PropTypes.bool,
    zDepth: React.PropTypes.number
  },

  getInitialState: function() {
    return { nestedMenuShown: false }
  },

  getDefaultProps: function() {
    return { 
      hideable: false,
      visible: true,
      zDepth: 1
    };
  },
  
  componentDidMount: function() {
    var $el = $(this.getDOMNode()),
      menuWidth = $el.width();

    //Make sure the width is an increment of the keylines
    menuWidth = KeyLine.getIncrementalDim(menuWidth);
    $el.css('width', menuWidth);

    //Save the initial menu height for later
    this._initialMenuHeight = $(this.getDOMNode()).height() + KeyLine.Desktop.GUTTER_LESS;

    //Show or Hide the menu according to visibility
    this._renderVisibility();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.visible !== prevProps.visible) this._renderVisibility();
  },

	render: function() {
    var classes = this.getClasses('mui-menu', {
      'mui-menu-hideable': this.props.hideable,
      'mui-visible': this.props.visible
    });

    return (
			<Paper zDepth={this.props.zDepth} className={classes}>
        {this._getChildren()}
      </Paper>
		);
	},

  _getChildren: function() {
    var children = [],
      menuItem,
      itemComponent,
      isSelected;

    //This array is used to keep track of all nested menu refs
    this._nestedChildren = [];

    for (var i=0; i < this.props.menuItems.length; i++) {
      menuItem = this.props.menuItems[i];
      isSelected = i === this.props.selectedIndex;

      switch (menuItem.type) {

        case MenuItem.Types.LINK:
          itemComponent = (
            <a key={i} className="mui-menu-item" href={menuItem.payload}>{menuItem.text}</a>
          );
        break;

        case MenuItem.Types.SUBHEADER:
          itemComponent = (
            <div key={i} className="mui-subheader">{menuItem.text}</div>
          );
          break;

        case MenuItem.Types.NESTED:
          itemComponent = (
            <NestedMenuItem 
              ref={i} 
              key={i} 
              text={menuItem.text} 
              menuItems={menuItem.items} 
              zDepth={this.props.zDepth} 
              onItemClick={this._onNestedItemClick} />
          );
          this._nestedChildren.push(i);
          break;

        default:
          itemComponent = (
            <MenuItem 
              selected={isSelected} 
              key={i} 
              icon={menuItem.icon} 
              data={menuItem.data} 
              number={menuItem.number} 
              toggle={menuItem.toggle} 
              onClick={this._onItemClick} 
              onToggle={this._onItemToggle}>
              {menuItem.text}
            </MenuItem>
          );
      }
      children.push(itemComponent);
    }

    return children;
  },

  _renderVisibility: function() {
    var $el,
      $innerContainer;

    if (this.props.hideable) {
      $el = $(this.getDOMNode());
      $innerContainer = $el.children('.mui-paper-container').first();

      if (this.props.visible) {

        //Open the menu
        $el.css('height', this._initialMenuHeight);

        //Set the overflow to visible after the animation is done so
        //that other nested menus can be shown
        CssEvent.onTransitionEnd($el, function() {
          $innerContainer.css('overflow', 'visible');
        });

      } else {

        //Close the menu
        $el.css('height', 0);

        //Set the overflow to hidden so that animation works properly
        $innerContainer.css('overflow', 'hidden');
      }
    }
  },

  _onNestedItemClick: function(e, key, menuItem) {
    if (this.props.onItemClick) this.props.onItemClick(e, key, menuItem);
  },

  _onItemClick: function(e, key) {
    if (this.props.onItemClick) this.props.onItemClick(e, key, this.props.menuItems[key]);
  },

  _onItemToggle: function(e, key, toggled) {
    if (this.props.onItemToggle) this.props.onItemToggle(e, key, this.props.menuItems[key], toggled);
  }

});

module.exports = Menu;
