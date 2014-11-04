/**
 * @jsx React.DOM
 */

var React = require('react'),
  Router = require('react-router'),
  mui = require('mui');

var AppLeftNav = React.createClass({

  mixins: [Router.Navigation],

  getInitialState: function() {
    return {
      selectedIndex: null
    };
  },

  render: function() {
    var header = <div className="logo" onClick={this._onHeaderClick}>material ui</div>,
      menuItems = [
        { route: 'get-started', text: 'Get Started' },
        { route: 'css-framework', text: 'CSS Framework' },
        { route: 'components', text: 'Components' },
        { type: mui.MenuItem.Types.SUBHEADER, text: 'Resources' },
        { type: mui.MenuItem.Types.LINK, payload: 'https://github.com/callemall/material-ui', text: 'GitHub' },
        { type: mui.MenuItem.Types.LINK, payload: 'http://facebook.github.io/react', text: 'React' },
        { type: mui.MenuItem.Types.LINK, payload: 'https://www.google.com/design/spec/material-design/introduction.html', text: 'Material Design' }
      ];

    return (
      <mui.LeftNav 
        ref="leftNav"
        isInitiallyOpen={false}
        header={header}
        menuItems={menuItems}
        selectedIndex={this.state.selectedIndex}
        onChange={this._onLeftNavChange} />
    );
  },

  toggle: function() {
    this.refs.leftNav.toggle();
  },

  _onLeftNavChange: function(e, key, payload) {
    this.transitionTo(payload.route);
    this.setState({ selectedIndex: key });
  },

  _onHeaderClick: function() {
    this.setState({ selectedIndex: null });
    this.transitionTo('root');
    this.refs.leftNav.close();
  }

});

module.exports = AppLeftNav;
