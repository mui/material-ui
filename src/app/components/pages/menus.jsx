/**
 * @jsx React.DOM
 */
 
var React = require('react'),
	DropDownMenu = require('../../../../dist/js/drop-down-menu.jsx'),
  Paper = require('../../../../dist/js/paper.jsx'),
  PaperConstants = require('../../../../dist/js/utils/constants.js'),
  Menu = require('../../../../dist/js/menu.jsx');


var MenusPage = React.createClass({

	getInitialState: function() {
  	return {
      menuItems: [
      	{ payload: '1', text: 'Never' },
      	{ payload: '2', text: 'Every Night' },
      	{ payload: '3', text: 'Weeknights' },
        { payload: '4', text: 'Weekends' },
        { payload: '5', text: 'Weekly' },
    	],

      attributeMenuItems: [
        { payload: '1', text: 'All', number: '22' },
        { payload: '3', text: 'Uncategorized', number: '6'},
        { payload: '4', text: 'Trash', number: '11' }
      ],

      iconMenuItems: [
        { payload: '1', text: 'Live Answer', icon: 'arrow-drop-down', number: '10' },
        { payload: '2', text: 'Voicemail', icon: 'arrow-drop-down',  number: '5' },
        { payload: '3', text: 'Starred', icon: 'arrow-drop-down', number: '3'},
        { payload: '4', text: 'Shared', icon: 'arrow-drop-down',  number: '12' }
      ],

      filterMenuItems: [
        { payload: '1', text: 'Text Opt-In', toggle: true},
        { payload: '2', text: 'Text Opt-Out', toggle: true},
        { payload: '3', text: 'Voice Opt-Out', toggle: true}
      ],

      subMenuItems: [
        { type: PaperConstants.MenuItemTypes.NESTED, text: 'Reports', items: [ { payload: '1', text: 'Nested Item 1' },
                                                                               { type: PaperConstants.MenuItemTypes.NESTED, text: 'Nested Item 2', items: [ { payload: '1', text: 'Nested Item 1' },
                                                                                                                                                            { type: PaperConstants.MenuItemTypes.NESTED, text: 'Nested Item 2', items: [ { payload: '1', text: 'Nested Item 1' },
                                                                                                                                                                                                                                        { payload: '2', text: 'Nested Item 2' },
                                                                                                                                                                                                                                        { payload: '3', text: 'Nested Item 3' }
                                                                                                                                                                                                                                      ] },
                                                                                                                                                            { payload: '3', text: 'Nested Item 3' }
                                                                                                                                                          ] },
                                                                               { payload: '2', text: 'Nested Item 3' },
                                                                               { payload: '3', text: 'Nested Item 4' },
                                                                               { payload: '4', text: 'Nested Item 5' }
                                                                             ] },
        { payload: '1', text: 'Audio Library'},
        { payload: '2', text: 'Settings'},
        { payload: '3', text: 'Logout'}
      ]
  	}
  },

  render: function() {
    return (
    	<div>
    		<h2>Drop Down Menu</h2>
    		<DropDownMenu menuItems={this.state.menuItems} onChange={this._onDropDownMenuChange} />
        <br />
        <h2>Sub-Menu</h2>
        <div className="mui-menu-container fixed-size">
          <Menu ref="nestedMenuParent" menuItems={this.state.subMenuItems} zDepth={1} nested={true} onItemClick={this._onItemClick} onNestedItemClick={this._onNestedItemClick} />
        </div>
        <br />
        <h2>Attribute Menu</h2>
        <div className="mui-menu-container">
          <Menu menuItems={this.state.attributeMenuItems} zDepth={1} onItemClick={this._onItemClick} />
        </div>
        <br />
        <h2>Icon Menu</h2>
        <div className="mui-menu-container">
          <Menu menuItems={this.state.iconMenuItems} zDepth={1}  onItemClick={this._onItemClick} />
        </div>
        <br />
        <h2>Filter Menu</h2>
        <div className="mui-menu-container">
          <Menu menuItems={this.state.filterMenuItems} zDepth={1} onItemToggle={this._onFilterMenuToggle}  onItemClick={this._onItemClick} />
        </div>
    	</div>
    );
  },

  _onDropDownMenuChange: function(e, key, menuItem) {
  	console.log('Menu Clicked: ', menuItem);
  },

  _onFilterMenuToggle: function(e, key, menuItem, toggled) {
    console.log('Filter Menu Toggled: ', key, menuItem, toggled)
  },

  _onItemClick: function(e, key, menuItem) {
    console.log("Menu Item Click: ", menuItem);
  },

  _onNestedItemClick: function(e, sNM) {
    console.log('Nested Menu Index: ', sNM)
  }
});

module.exports = MenusPage;