/**
 * @jsx React.DOM
 */

var $ = require('jquery'),
  React = require('react'),
	Classable = require('./mixins/classable.js'),
  ClickAwayable = require('./mixins/click-awayable'),
  KeyLine = require('./utils/key-line.js'),
  Paper = require('./paper.jsx'),
  Icon = require('./icon.jsx'),
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
    onItemClick: React.PropTypes.func,
    onMenuToggle: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      open: false
    }
  },

  componentDidMount: function() {
    var _this = this;

    this._positionNestedMenu();

    this.listenToClickAway(this, function() {
      _this._closeMenu();
    });
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (this.props.onMenuToggle && this.state.open !== nextState.open) this.props.onMenuToggle(this.props.key, nextState.open);
  },

  componentDidUpdate: function() {
    this._positionNestedMenu();
  },

  componentWillUnmount: function() {
    this.stopListeningToClickAway(this);
  },

  render: function() {
    var classes = this.getClasses('mui-nested-menu-item');

    return (
      <div className={classes}>
        <MenuItem key={this.props.key} iconRight="arrow-drop-right" onClick={this._onParentItemClick}>{this.props.text}</MenuItem>
        <Menu ref="nestedMenu" menuItems={this.props.menuItems} onItemClick={this._onMenuItemClick} hideable={true} visible={this.state.open} />
      </div>
    );
  },

  isOpen: function() {
    return this.state.open;
  },

  _positionNestedMenu: function() {
    var $el = $(this.getDOMNode()),
      $nestedMenu = $(this.refs.nestedMenu.getDOMNode());

    $nestedMenu.css({
      left: $el.outerWidth()
    });
  },

  _onParentItemClick: function() {
    this.setState({ open: !this.state.open });
  },

  _onMenuItemClick: function(e, key, menuItem) {
    var _this = this;

    this._closeMenu(function() {
      if (_this.props.onItemClick) _this.props.onItemClick(e, key, menuItem);
    });
  },

  _closeMenu: function(callback) {
    this.setState({ open: false }, callback);
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
    return {
      nestedMenuShown: false
    }
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

  componentDidUpdate: function() {
    this._renderVisibility();
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
    this._nestedMenuItems = [];

    for (var i=0; i < this.props.menuItems.length; i++) {
      menuItem = this.props.menuItems[i];
      isSelected = i === this.props.selectedIndex;

      switch (menuItem.type) {

        case MenuItem.Types.SUBHEADER:
          itemComponent = (
            <div key={i} className="mui-subheader">{menuItem.text}</div>
          );
          break;

        case MenuItem.Types.NESTED:
          itemComponent = (
            <NestedMenuItem ref={'nestedMenuItem' + i} key={i} text={menuItem.text} menuItems={menuItem.items} onMenuToggle={this._onNestedMenuToggle} onItemClick={this._onNestedItemClick} />
          );
          this._nestedMenuItems.push('nestedMenuItem' + i);
          break;

        default:
          itemComponent = (
            <MenuItem selected={isSelected} key={i} icon={menuItem.icon} number={menuItem.number} toggle={menuItem.toggle} onClick={this._onItemClick} onToggle={this._onItemToggle}>{menuItem.text}</MenuItem>
          );
      }
      children.push(itemComponent);
    }

    return children;
  },

  _renderVisibility: function() {
    var _this = this,
      $el = $(this.getDOMNode()),
      $innerContainer = $el.children('.mui-paper-container').first();

    if (this.props.hideable) {
      $el.css({
        height: this.props.visible ? this._initialMenuHeight : 0
      });

      //Set the overflow the of menu 
      //This is needed in order to show the nested menus
      if (this.state.nestedMenuShown) {
        $innerContainer.css('overflow', 'visible');
      } else {
        setTimeout(function() {
          $innerContainer.css('overflow', 'hidden');
        }, 450);
      }
    }
  },

  _onNestedMenuToggle: function(key, menuShown) {
    var hasOpenMenu = false;

    this._nestedMenuItems.forEach(function(refKey) {
      //Check all other nested menus to see if they're open
      if (refKey !== 'nestedMenuItem' + key && this.refs[refKey].isOpen()) hasOpenMenu = true;
    }, this);

    if (this.state.nestedMenuShown !== menuShown) {
      if (menuShown) {
        this.setState({ nestedMenuShown: true });
      } else {
        if (!hasOpenMenu) {
          this.setState({ nestedMenuShown: false });
        }
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
