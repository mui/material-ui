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
        { type: mui.MenuItem.Types.SUBHEADER, text: 'CSS Framework' },
        { payload: Pages.colors, text: Pages.colors.title },
        { payload: Pages.typography, text: Pages.typography.title },
        { payload: Pages.icons, text: Pages.icons.title },
        { type: mui.MenuItem.Types.SUBHEADER, text: 'Components' },
        { payload: Pages.buttons, text: Pages.buttons.title },
        { payload: Pages.inputs, text: Pages.inputs.title },
        { payload: Pages.menus, text: Pages.menus.title },
        { payload: Pages.switches, text: Pages.switches.title },
        //{ payload: Pages.toasts, text: Pages.toasts.title },
        { payload: Pages.toolbars, text: Pages.toolbars.title },
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

      if (item.payload && item.payload.url === url) {
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
