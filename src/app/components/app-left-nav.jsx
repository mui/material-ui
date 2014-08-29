/**
 * @jsx React.DOM
 */

var React = require('react'),
  Dispatcher = require('../app-dispatcher.js'),
  Pages = require('./pages.jsx'),
  PaperConstants = require('../../../dist/js/utils/constants.js'),
	LeftNav = require('../../../dist/js/left-nav.jsx');

var AppLeftNav = React.createClass({

  propTypes: {
    url: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      menuItems: [
        { type: PaperConstants.MenuItemTypes.SUBHEADER, text: 'CSS Framework' },
        { payload: Pages.colors, text: Pages.colors.title },
        { payload: Pages.typography, text: Pages.typography.title },
        { payload: Pages.icons, text: Pages.icons.title },
        { type: PaperConstants.MenuItemTypes.SUBHEADER, text: 'Components' },
        { payload: Pages.buttons, text: Pages.buttons.title },
        { payload: Pages.inputs, text: Pages.inputs.title },
        { payload: Pages.menus, text: Pages.menus.title },
        { payload: Pages.radiobuttons, text: Pages.radiobuttons.title },
        { payload: Pages.tables, text: Pages.tables.title },
        { payload: Pages.toggles, text: Pages.toggles.title }
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
      <LeftNav 
        header={header}
        menuItems={this.state.menuItems}
        selectedIndex={this.state.selectedIndex}
        onChange={this._onLeftNavChange} />
    );
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
      Dispatcher.dispatchAction(Dispatcher.ActionTypes.NAV_USER_CLICK, { url: Pages.home.url } ); 
    }
  },

  _onLeftNavChange: function(e, key, item) {
    Dispatcher.dispatchAction(Dispatcher.ActionTypes.NAV_USER_CLICK, { url: item.payload.url } ); 
  }

});

module.exports = AppLeftNav;
