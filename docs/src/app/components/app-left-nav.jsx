/**
 * @jsx React.DOM
 */

var React = require('react'),
  mui = require('mui'),
  Dispatcher = require('../app-dispatcher.js'),
  Pages = require('./pages.jsx');

var AppLeftNav = React.createClass({

  propTypes: {
    url: React.PropTypes.string,
    toggle: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      menuItems: [

        { payload: Pages.getStarted, text: Pages.getStarted.title },
        { payload: Pages.cssFramework, text: Pages.cssFramework.title },
        { payload: Pages.components, text: Pages.components.title },
        { type: mui.MenuItem.Types.SUBHEADER, text: 'Resources' },
        { type: mui.MenuItem.Types.LINK, payload: 'https://github.com/callemall/material-ui', text: 'GitHub' },
        { type: mui.MenuItem.Types.LINK, payload: 'http://facebook.github.io/react', text: 'React' },
        { type: mui.MenuItem.Types.LINK, payload: 'https://www.google.com/design/spec/material-design/introduction.html', text: 'Material Design' }
      ]
    }
  },

  componentWillMount: function() {
    this._setSelectedIndex(this.props.url);
  },

  componentWillReceiveProps: function(newProps) {
    this._setSelectedIndex(newProps.url);
  },

  render: function() {
    var header = <div className="logo" onClick={this._onHeaderClick}>material ui</div>;

    return (
      <mui.LeftNav 
        ref="leftNav"
        isInitiallyOpen={false}
        header={header}
        menuItems={this.state.menuItems}
        selectedIndex={this.state.selectedIndex}
        onChange={this._onLeftNavChange} />
    );
  },

  toggle: function() {
    this.refs.leftNav.toggle();
  },

  _setSelectedIndex: function(url) {
    var item;

    for (var i = 0; i < this.state.menuItems.length; i++) {
      item = this.state.menuItems[i];

      //only match the root part of the url
      if (url && item.payload && item.payload.url.split('/')[0] === url.split('/')[0]) {
        if (i !== this.state.selectedIndex) this.setState({ selectedIndex: i});
        return;
      }
    };

    this.setState({ selectedIndex: null});
  },

  _onHeaderClick: function() {
    if (this.props.url !== Pages.home.url) {
      this.refs.leftNav.close();
      Dispatcher.dispatchAction(Dispatcher.ActionTypes.NAV_USER_CLICK, { url: Pages.home.url } ); 
    }
  },

  _onLeftNavChange: function(e, key, item) {
    Dispatcher.dispatchAction(Dispatcher.ActionTypes.NAV_USER_CLICK, { url: item.payload.url } ); 
  }

});

module.exports = AppLeftNav;
