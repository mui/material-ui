/**
 * @jsx React.DOM
 */

var React = require('react'),
  mui = require('mui'),
  Menu = mui.Menu;

var Components = React.createClass({

  render: function() {
    
    var menuItems = [
      { payload: '', text: 'Buttons'},
      { payload: '', text: 'Dialog'},
      { payload: '', text: 'Icons'},
      { payload: '', text: 'Inputs'},
      { payload: '', text: 'Menus'},
      { payload: '', text: 'Switches'},
      //{ payload: '', text: 'Toasts'},
      { payload: '', text: 'Toolbars'},
    ];

    return (
      <div className="mui-app-content-canvas with-nav">
        <div className="subNav">
          <Menu 
            ref="menuItems" 
            zDepth={0} 
            menuItems={menuItems} 
            selectedIndex={0} 
            onItemClick={this._onMenuItemClick} />
        </div>
        <div className="subContent">
          <this.props.activeRouteHandler />
        </div>
      </div>
    );
  },

  _onMenuItemClick: function() {

  }

  
});

module.exports = Components;
