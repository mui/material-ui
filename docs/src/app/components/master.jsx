/**
 * @jsx React.DOM
 */

var Backbone = require('backbone'),
  React = require('react'),
  Dispatcher = require('../app-dispatcher.js'),
  mui = require('mui'),
  Menu = mui.Menu,
  AppStateStore = require('../stores/app-state-store.js'),
  Pages = require('./pages.jsx'),
	AppLeftNav = require('./app-left-nav.jsx');

var Master = React.createClass({

  mixins: [Backbone.Events],

  getInitialState: function() {
    return {
      currentUrl: AppStateStore.get('currentUrl')
    }
  },

  componentDidMount: function() {
    this.listenTo(AppStateStore, 'change:currentUrl', this._onStoreChange);
  },

  componentWillUnMount: function() {
    this.stopListening();
  },

  render: function() {
    var page = Pages.getPage(this.state.currentUrl),
      title = page.title,
      currentMainComponent = page.mainContentComponent,
      subNav;

    if (page.subPages) {
      var menuItems = [],
        i = 0,
        selectedIndex,
        currentSubPage;

      for (prop in page.subPages) {
        currentSubPage = page.subPages[prop];

        if (this.state.currentUrl === currentSubPage.url) {
          selectedIndex = i;
          currentMainComponent = currentSubPage.mainContentComponent;
        }
        menuItems.push({ payload: currentSubPage.url, text: currentSubPage.title });
        i++;
      }

      subNav = (
        <div className="subNav">
          <Menu ref="menuItems" zDepth={0} menuItems={menuItems} selectedIndex={selectedIndex} onItemClick={this._onMenuItemClick} />
        </div>
      );
    }

    return (
      <mui.AppCanvas predefinedLayout={1}>
        <mui.AppBar onMenuIconClick={this._onMenuIconClick} title={title} />
    		<AppLeftNav ref="leftNav" url={this.state.currentUrl} />
    		<div className="mui-app-content-canvas">
          {subNav}
          <div className="subContent">
            {currentMainComponent}
          </div>
        </div>
      </mui.AppCanvas>
    );
  },

  _onMenuItemClick: function(e, key, item) {
    Dispatcher.dispatchAction(Dispatcher.ActionTypes.NAV_USER_CLICK, { url: item.payload } ); 
  },

  _onMenuIconClick: function() {
    this.refs.leftNav.toggle();
  },

  _onStoreChange: function() {
    this.setState({
      currentUrl: AppStateStore.get('currentUrl')
    });
  }
  
});

module.exports = Master;
