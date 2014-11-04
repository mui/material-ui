/**
 * @jsx React.DOM
 */

var React = require('react'),
  Router = require('react-router'),
  mui = require('mui'),
  Menu = mui.Menu;

var PageWithNav = React.createClass({

  mixins: [Router.Navigation],

  propTypes: {
    menuItems: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      selectedIndex: 0
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.menuItems !== this.props.menuItems) {
      this.setState({ selectedIndex: 0 });
    }
  },

  render: function() {
    return (
      <div className="mui-app-content-canvas with-nav">
        <div className="subNav">
          <Menu 
            ref="menuItems" 
            zDepth={0} 
            menuItems={this.props.menuItems} 
            selectedIndex={this.state.selectedIndex} 
            onItemClick={this._onMenuItemClick} />
        </div>
        <div className="subContent">
          <this.props.activeRouteHandler />
        </div>
      </div>
    );
  },

  _onMenuItemClick: function(e, index, item) {
    this.transitionTo(item.route);
    this.setState({ selectedIndex: index });
  }
  
});

module.exports = PageWithNav;
