var React = require('react');
var mui = require('mui');
var DropDownIcon = mui.DropDownIcon;
var DropDownMenu = mui.DropDownMenu;
var Icon = mui.Icon;
var RaisedButton = mui.RaisedButton;
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;

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
      { payload: '2', text: 'More Info' }
    ];
        
    return (
    	<div>
    		<h2 className="mui-font-style-headline">Toolbars</h2>
        <div className="toolbar-example">
          <Toolbar>
			      <ToolbarGroup key={0} float="left">
				      <DropDownMenu menuItems={filterOptions} />
			      </ToolbarGroup>
			      <ToolbarGroup key={1} float="right">
				      <Icon icon='mui-icon-pie' />
				      <Icon icon='mui-icon-sort' />
				      <DropDownIcon icon="navigation-expand-more" menuItems={iconMenuItems} 
				      	onChange={this._onDropDownMenuChange} />
              <span className="mui-toolbar-separator">&nbsp;</span>
				      <RaisedButton label="Create Broadcast" primary={true} />
			      </ToolbarGroup>
		      </Toolbar>
        </div>
    	</div>
    );
  }

});

module.exports = ToolbarPage;