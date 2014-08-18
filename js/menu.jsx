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
    items: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    visible: React.PropTypes.bool,
    zDepth: React.PropTypes.number
  },

  getDefaultProps: function() {
    return { 
      visible: true
    };
  },

  getInitialState: function() {
  	return {
  		classes: 'menu'
  	};
  },

  componentDidMount: function() {
    this._setHeightAndWidth();
  },

  componentDidUpdate: function() {
    this._setHeightAndWidth();
  },

	render: function() {
    return (
			<Paper zDepth={this.props.zDepth} className={this.state.mergedClasses}>
        {this._getChildren()}
      </Paper>
		);
	},

  _getChildren: function() {
    var children = [],
      item,
      itemComponent,
      isSelected;

    for (var i=0; i < this.props.items.length; i++) {
      item = this.props.items[i];
      isSelected = i === this.props.selectedIndex;

      switch (item.type) {

        case Constants.MenuItemTypes.SUBHEADER:
          itemComponent = (
            <div key={i} className="subheader">{item.text}</div>
          );
          break;

        default:
          itemComponent = (
            <MenuItem selected={isSelected} key={i} onClick={this._onItemClick}>
              {item.text}
            </MenuItem>
          );
      }
      children.push(itemComponent);
    }

    return children;
  },

  _setHeightAndWidth: function() {
    var $el = $(this.getDOMNode()),
      menuHeight = (Constants.KeyLines.Desktop.MENU_ITEM_HEIGHT * this.props.items.length) + (Constants.KeyLines.Desktop.GUTTER_LESS * 2),
      menuWidth = $el.width();

    //Make sure the width is an increment of the keylines
    menuWidth = KeyLine.getIncrementalDim(menuWidth);
    $el
      .css('width', menuWidth)
      .css(this.props.visible ? {
        'height': menuHeight
      } : {
        'height': 0
      });
  },

  _onItemClick: function(e, key) {
    if (this.props.onItemClick) this.props.onItemClick(e, key, this.props.items[key]);
  }

});

module.exports = Menu;