/**
 * @jsx React.DOM
 */

var Backbone = require('backbone'),
  React = require('react'),
  mui = require('mui'),
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
    this.listenTo(AppStateStore, 'change', this._onStoreChange);
  },

  componentWillUnMount: function() {
    this.stopListening();
  },

  render: function() {
    var page = Pages.getPage(this.state.currentUrl);
      title = page.title,
      currentMainComponent = page.mainContentComponent;

    return (
      <mui.AppCanvas predefinedLayout={1}>
        <mui.AppBar onMenuIconClick={this._onMenuIconClick} title={title} />
    		<AppLeftNav ref="leftNav" url={this.state.currentUrl} />
    		<div className="mui-app-content-canvas">
            {currentMainComponent}
        </div>
      </mui.AppCanvas>
    );
  },

  _onMenuIconClick: function() {
    this.refs.leftNav.toggleOpenState();
  },

  _onStoreChange: function() {
    this.setState({
      currentUrl: AppStateStore.get('currentUrl')
    });
  }
  
});

module.exports = Master;
