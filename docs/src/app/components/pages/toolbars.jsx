/**
 * @jsx React.DOM
 */

var React = require('react'),
    mui = require('mui')
    PaperButton = mui.PaperButton;


var ToolbarPage = React.createClass({

  render: function() {

    var filterOptions = [
      { payload: '1', text: 'All Broadcasts' },
      { payload: '2', text: 'All Voice' },
      { payload: '3', text: 'All Text' },
      { payload: '4', text: 'Complete Voice' },
      { payload: '5', text: 'Complete Text' },
      { payload: '6', text: 'Active Voice' },
      { payload: '7', text: 'Active Text' },
    ],

    iconMenuItems = [
      { payload: '1', text: 'Download' },
      { payload: '2', text: 'Blah' }
    ];

    leftItems = [
      //{ type: "title", title: "Broadcasts"},
      <mui.PaperButton type={PaperButton.Types.RAISED} label="Create Broadcast" primary={true} />
    ],
        
    rightItems = [
      { type: "separator"},
      <mui.DropDownMenu menuItems={filterOptions} />,
      { type: "separator"},
      <mui.Icon icon='sort' />,
      <mui.Icon icon='filter' />,
      <mui.Icon icon='search' />,
      <mui.DropDownIcon icon="chevron-down" menuItems={iconMenuItems} onChange={this._onDropDownMenuChange} />
    ];

    groups = [ 
      <mui.ToolbarGroup key={0} float="left" groupItems={leftItems} />,
      <mui.ToolbarGroup key={1} float="right" groupItems={rightItems} />
    ];

    return (
    	<div>
    		<h2 className="mui-font-style-headline">Toolbars</h2>
        <div className="mui-toolbar-container">
          <mui.Toolbar groups={groups} />
        </div>
    	</div>
    );
  },

  _onDropDownMenuChange: function(e, key, menuItem) {
    console.log('Menu Clicked: ', menuItem);
  },

});

module.exports = ToolbarPage;