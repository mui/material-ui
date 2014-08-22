/**
 * @jsx React.DOM
 */

var $ = require('jquery'),
  React = require('react'),
  Constants = require('./utils/constants.js'),
	Classable = require('./mixins/classable.js'),
  KeyLine = require('./utils/key-line.js'),
  Paper = require('./paper.jsx'),
  MenuItem = require('./menu-item.jsx');

var Menu = React.createClass({

	mixins: [Classable],

	propTypes: {
    onItemClick: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    visible: React.PropTypes.bool,
    setHeightWidth: React.PropTypes.bool,
    zDepth: React.PropTypes.number
  },

  getDefaultProps: function() {
    return { 
      visible: true,
      setHeightWidth: false
    };
  },
  
  componentDidMount: function() {
    this._setHeightAndWidth();
  },

  componentDidUpdate: function() {
    this._setHeightAndWidth();
  },

	render: function() {
    var classes = this.getClasses('mui-menu');

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

    for (var i=0; i < this.props.menuItems.length; i++) {
      menuItem = this.props.menuItems[i];
      isSelected = i === this.props.selectedIndex;

      switch (menuItem.type) {

        case Constants.MenuItemTypes.SUBHEADER:
          itemComponent = (
            <div key={i} className="mui-subheader">{menuItem.text}</div>
          );
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

  _setHeightAndWidth: function() {
    if(this.props.setHeightWidth) {
      var $el = $(this.getDOMNode()),
        menuHeight = (Constants.KeyLines.Desktop.MENU_ITEM_HEIGHT * this.props.menuItems.length) + (Constants.KeyLines.Desktop.GUTTER_LESS * 2),
        menuWidth = $el.width();

      //Make sure the width is an increment of the keylines
      menuWidth = KeyLine.getIncrementalDim(menuWidth);
      $el
        .css({
          width: menuWidth,
          height: this.props.visible ? menuHeight : 0
        });
    }
  },

  _onItemClick: function(e, key) {
    if (this.props.onItemClick) this.props.onItemClick(e, key, this.props.menuItems[key]);
  },

  _onItemToggle: function(e) {
    if (this.props.onToggle) this.props.onToggle(e);
      console.log("menu component heard toggle");
  }

});

module.exports = Menu;