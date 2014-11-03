/**
 * @jsx React.DOM
 */

var React = require('react'),
  mui = require('mui'),
  Menu = mui.Menu;

var CssFramework = React.createClass({

  render: function() {

    var menuItems = [
      { payload: '', text: 'Colors'},
      { payload: '', text: 'Typography'}
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

module.exports = CssFramework;
