/**
 * @jsx React.DOM
 */

var Backbone = require('backbone'),
  React = require('react'),
  AppCanvas = require('../../material-ui/js/app-canvas.jsx'),
  AppBar = require('../../material-ui/js/app-bar.jsx'),
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
      <AppCanvas predefinedLayout={1}>
        <AppBar title={title} />
    		<AppLeftNav url={this.state.currentUrl} />
    		<div className="mui-app-content-canvas">
            {currentMainComponent}
        </div>
      </AppCanvas>
    );
  },

  _onStoreChange: function() {
    this.setState({
      currentUrl: AppStateStore.get('currentUrl')
    });
  }
  
});

module.exports = Master;
