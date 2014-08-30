/**
 * @jsx React.DOM
 */
 
var React = require('react'),
  mui = require('mui'),

  menuItems = [
    { payload: '1', text: 'Never' },
    { payload: '2', text: 'Every Night' },
    { payload: '3', text: 'Weeknights' },
    { payload: '4', text: 'Weekends' },
    { payload: '5', text: 'Weekly' },
  ],

  attributeMenuItems = [
    { payload: '1', text: 'All', number: '22' },
    { payload: '3', text: 'Uncategorized', number: '6'},
    { payload: '4', text: 'Trash', number: '11' }
  ],

  iconMenuItems = [
    { payload: '1', text: 'Live Answer', icon: 'home', number: '10' },
    { payload: '2', text: 'Voicemail', icon: 'contacts',  number: '5' },
    { payload: '3', text: 'Starred', icon: 'mic', number: '3'},
    { payload: '4', text: 'Shared', icon: 'pie',  number: '12' }
  ],

  filterMenuItems = [
    { payload: '1', text: 'Text Opt-In', toggle: true},
    { payload: '2', text: 'Text Opt-Out', toggle: true},
    { payload: '3', text: 'Voice Opt-Out', toggle: true}
  ],

  nestedMenuItems = [
    { type: mui.MenuItem.Types.NESTED, text: 'Reports', items: [
      { payload: '1', text: 'Nested Item 1' },
      { type: mui.MenuItem.Types.NESTED, text: 'Nested Item 2', items: [
        { payload: '1', text: 'Nested Item 3' },
        { type: mui.MenuItem.Types.NESTED, text: 'Nested Item 4', items: [
          { payload: '1', text: 'Nested Item 5' },
          { payload: '3', text: 'Nested Item 6' }
        ] },
        { payload: '3', text: 'Nested Item 7' }
      ] },
      { payload: '3', text: 'Nested Item 9' },
      { type: mui.MenuItem.Types.NESTED, text: 'Nested Item 2', items: [
        { payload: '1', text: 'Nested Item 3' },
        { type: mui.MenuItem.Types.NESTED, text: 'Nested Item 4', items: [
          { payload: '1', text: 'Nested Item 5' },
          { payload: '3', text: 'Nested Item 6' }
        ] },
        { payload: '3', text: 'Nested Item 7' }
      ] },
      { payload: '4', text: 'Nested Item 10' }
    ] },
    { payload: '1', text: 'Audio Library'},
    { payload: '2', text: 'Settings'},
    { payload: '3', text: 'Logout'}
  ];


var MenusPage = React.createClass({

  render: function() {
    return (
    	<div>
    		<h2>Drop Down Menu</h2>
    		<mui.DropDownMenu menuItems={menuItems} onChange={this._onDropDownMenuChange} />
        <br />
        <h2>Nested Menu</h2>
        <div className="example-menu">
          <mui.Menu ref="nestedMenuParent" menuItems={nestedMenuItems} onItemClick={this._onItemClick} />
        </div>

        <br />
        <h2>Attribute Menu</h2>
        <div className="mui-menu-container">
          <mui.Menu menuItems={attributeMenuItems} onItemClick={this._onItemClick} />
        </div>
        <br />
        <h2>Icon Menu</h2>
        <div className="mui-menu-container">
          <mui.Menu menuItems={iconMenuItems} onItemClick={this._onItemClick} />
        </div>
        <br />
        <h2>Filter Menu</h2>
        <div className="mui-menu-container">
          <mui.Menu menuItems={filterMenuItems} onItemToggle={this._onFilterMenuToggle}  onItemClick={this._onItemClick} />
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
  }

});

module.exports = MenusPage;
