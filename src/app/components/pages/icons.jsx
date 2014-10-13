/**
 * @jsx React.DOM
 */

var React = require('react'),
  	mui = require('mui'),
  	CodeExample = require('../code-example/code-example.jsx'),

  	menuItems = [
	    { payload: '1', text: 'Never' },
	    { payload: '2', text: 'Every Night' },
	    { payload: '3', text: 'Weeknights' },
	    { payload: '4', text: 'Weekends' },
	    { payload: '5', text: 'Weekly' },
  	];

var IconsPage = React.createClass({

  render: function() {
    return (
    	<div>
			<h2 className="mui-font-style-headline">Icons</h2>
			{this._getIconExample()}
		</div>
    );
  },

  _getIconExample: function() {
    var code = 
      "<Icon className='mui-menu-item-icon' icon='home' />";

    return (
      {/*
      <CodeExample code={code}>
      	<mui.DropDownIcon icon="chevron-down" menuItems={menuItems} onChange={this._onDropDownMenuChange} />
      </CodeExample>
      */}
    );
  },

  _onDropDownMenuChange: function(e, key, menuItem) {
  	console.log('Menu Clicked: ', menuItem);
  },

});

module.exports = IconsPage;
